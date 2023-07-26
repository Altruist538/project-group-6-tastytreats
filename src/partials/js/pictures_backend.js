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
      <img src="${preview}" alt="${title}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Title: ${title}</b>
        </p>
        <p class="info-item">
          <b>Category: ${category}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${description}</b>
        </p>
        <p class="info-item">
          <b>Area: ${area}</b>
        </p>
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
