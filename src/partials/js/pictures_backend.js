import axios from 'axios';
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
export async function fetchImages() {
  try {
    let response = await axios.get(BASE_URL, {
      params: {
        q: '', // Пустой запрос, чтобы получить все картинки при загрузке страницы
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: pageCounter,
        per_page: perPage,
      },
    });
    // console.log(response.data.results);

    renderImgCard(response.data.results);
  } catch (error) {
    console.log(`Failed to fetch images: ${error}`);
  }
}

export const getRecipeMarkup = ({
  preview,
  title,
  category,
  description,
  area,
}) => {
  return `<div class="gallery__link">
      <img src="${preview}" class="gallery-img" alt="${title}" loading="lazy" />
      <div class="info">
        <p class="info-item-title">
          <b>${title}</b>
        </p>
        <p class="is-hidden">
          <b>${category}</b>
        </p>
        <p class="info-item-description">
          <b>${description}</b>
        </p>
        <p class="is-hidden">
          <b> ${area}</b>
        </p>
        <button class="heart-wrapper">
         <svg class="heart-icon" width="22" height="22" viewBox="0 0 32 32">
          <path opacity="0.5" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.9091" d="M15.991 6.848c-2.666-3.117-7.113-3.956-10.451-1.101-3.341 2.854-3.811 7.625-1.188 11.001 2.182 2.806 8.781 8.724 10.944 10.64 0.241 0.214 0.364 0.321 0.505 0.364 0.057 0.017 0.123 0.027 0.191 0.027s0.133-0.010 0.195-0.029l-0.005 0.001c0.141-0.042 0.262-0.15 0.503-0.364 2.164-1.916 8.764-7.834 10.944-10.64 2.624-3.375 2.211-8.177-1.187-11.001-3.398-2.825-7.785-2.016-10.451 1.101z"></path>
         </svg>
        </button>
        <div class="wrapper-bottom">
        <div class="rating-wrapper">
        <p class="rating">4.5</p>
        </div>
        <div class="card-btn-wrapper">
          <button class="card-btn">See recipe</button>
        </div>
        </div>
      </div>
    </div>`;
};

export function renderImgCard(response) {
  let listArr = response.map(resp => {
    return getRecipeMarkup(resp);
  });
  galleryEl.insertAdjacentHTML('beforeend', listArr.join(''));
}
// Вызываем функцию fetchImages() при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  fetchImages();
});
