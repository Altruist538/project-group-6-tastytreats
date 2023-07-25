import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const galleryEl = document.querySelector('.gallery');
// const myApiKey = '38289805-c9ad3276c7a7da4bbf01374d5';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
let perPage = 0;
if (windowWidth < 768) {
 perPage= 6;
} else if (windowWidth > 768 && windowWidth < 1280) {
  perPage = 8;
} else if (windowWidth > 1280) {
  perPage= 9;
}
let pageCounter = 1;
export function fetchImages() {
  try {
    let response = await axios.get(BASE_URL, {
      params: {
        // key: myApiKey,
        q: '', // Пустой запрос, чтобы получить все картинки при загрузке страницы
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: pageCounter,
        per_page: perPage,
      },
    });
      console.log(response.data.results);

      export renderImgCard(response.data.results);
    // const totalHits = response.data.totalHits;
    // const pagesCount = Math.ceil(totalHits / perPage);
    // if (response.data.hits.length === 0) {
    //   console.log('Sorry, there are no images matching your search query. Please try again.');
    // } else {
    //   renderImgCard(response.data.hits);
    //   if (pagesCount > 1) {
    //     buttonLoadMoreEl.style.visibility = 'visible';
    //   }
    // }
  } catch (error) {
    console.log(`Failed to fetch images: ${error}`);
  }
}

async function renderImgCard(response) {
  let listArr = response.map((resp) => {
    return `<a href="${resp.largeImageURL}" class="gallery__link">
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
  galleryEl.insertAdjacentHTML('beforeend', listArr.join(''));
  lightbox.refresh();
}
// Вызываем функцию fetchImages() при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  fetchImages();
});
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 100,
  captionsData: 'alt',
});
