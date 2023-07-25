import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const galleryEl = document.querySelector('.gallery');
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
const windowWidth = document.documentElement.clientWidth;
let perPage = 0;
if (windowWidth < 768) {
  perPage = 6;
} else if (windowWidth > 768 && windowWidth < 1280) {
  perPage = 8;
} else if (windowWidth > 1280) {
  perPage = 9;
}
let pageCounter = 1;
export async function fetchImages(category) {
  try {
    let response = await axios.get(
      BASE_URL + (category ? `?category=${category}` : ''),
      {
        params: {
          q: '', // Пустой запрос, чтобы получить все картинки при загрузке страницы
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: pageCounter,
          per_page: perPage,
        },
      }
    );

    renderImgCard(response.data.results);
  } catch (error) {
    console.log(`Failed to fetch images: ${error}`);
  }
}

export function renderImgCard(response) {
  let listArr = response.map(resp => {
    return `<a href="${resp.thumb}" class="gallery__link">
      <img src="${resp.preview}" alt="${resp.title}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Title: ${resp.title}</b>
        </p>
        <p class="info-item">
          <b>Category: ${resp.category}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${resp.description}</b>
        </p>
                <p class="info-item">
          <b>Area: ${resp.area}</b>
        </p>
      </div>
    </a>`;
  });
  galleryEl.innerHTML = listArr.join('');
}
// Вызываем функцию fetchImages() при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  fetchImages();
});
