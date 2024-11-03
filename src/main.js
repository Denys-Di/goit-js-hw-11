import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById("search-form");
const gallery = document.getElementById("gallery");
const loader = document.getElementById("loader");
let lightbox;

form.addEventListener("submit", onSearch);

function onSearch(event) {
  event.preventDefault();
  const query = form.query.value.trim();

  if (!query) {
    iziToast.error({
      title: "Error",
      message: "Please enter a search query.",
    });
    return;
  }

  gallery.innerHTML = "";
  fetchImages(query);
}

async function fetchImages(query) {
  loader.style.display = "block";
  const API_KEY = "4687124146871241-4d6b3672e38c39f9ae37ca0de"; // Замініть на ваш реальний API ключ
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits.length === 0) {
      iziToast.info({
        title: "No results",
        message: "Sorry, there are no images matching your search query. Please try again!",
      });
      loader.style.display = "none";
      return;
    }

    renderGallery(data.hits);
    if (!lightbox) {
      lightbox = new SimpleLightbox(".gallery a", { captionsData: "alt", captionDelay: 250 });
    } else {
      lightbox.refresh();
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Failed to fetch images. Please try again later.",
    });
  } finally {
    loader.style.display = "none";
  }
}

function renderGallery(images) {
  const markup = images
    .map(
      (image) => `
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        <div class="info">
          <p><b>Likes:</b> ${image.likes}</p>
          <p><b>Views:</b> ${image.views}</p>
          <p><b>Comments:</b> ${image.comments}</p>
          <p><b>Downloads:</b> ${image.downloads}</p>
        </div>
      </a>`
    )
    .join("");

  gallery.insertAdjacentHTML("beforeend", markup);
}
