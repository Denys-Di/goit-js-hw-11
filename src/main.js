import { fetchImages } from './js/pixabay-api';
import { renderImages } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query' });
    return;
  }

  console.log('Show loader');
  loader.style.display = 'block';
  gallery.innerHTML = ''; 

  try {
    const data = await fetchImages(query);
    console.log('Hide loader');
    loader.style.display = 'none'; 

    if (data.hits.length === 0) {
      iziToast.info({ message: 'Sorry, there are no images matching your search query. Please try again!' });
    } else {
      renderImages(data.hits);
    }
  } catch (error) {
    console.log('Hide loader on error');
    loader.style.display = 'none';
    iziToast.error({ title: 'Error', message: error.message });
  }
});