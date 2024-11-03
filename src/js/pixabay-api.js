const API_KEY = "46871241-4d6b3672e38c39f9ae37ca0de";
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1,) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 30,
  });
 
  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    const data = await response.json();
   
    return data;


  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}





 


    