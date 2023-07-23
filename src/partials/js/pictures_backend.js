import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const galleryEl = document.querySelector('.gallery');
const myApiKey = '38289805-c9ad3276c7a7da4bbf01374d5';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 40;
let pageCounter = 1;
async function fetchImages() {
  try {
    let response = await axios.get(BASE_URL, {
      params: {
        key: myApiKey,
        q: '', // Пустой запрос, чтобы получить все картинки при загрузке страницы
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: pageCounter,
        per_page: perPage,
      },
    });
    const totalHits = response.data.totalHits;
    const pagesCount = Math.ceil(totalHits / perPage);
    if (response.data.hits.length === 0) {
      console.log('Sorry, there are no images matching your search query. Please try again.');
    } else {
      renderImgCard(response.data.hits);
      if (pagesCount > 1) {
        buttonLoadMoreEl.style.visibility = 'visible';
      }
    }
  } catch (error) {
    console.log(`Failed to fetch images: ${error}`);
  }
}
function renderImgCard(response) {
  let listArr = response.map((resp) => {
    return `<a href="${resp.largeImageURL}" class="gallery__link">
      <img src="${resp.webformatURL}" alt="${resp.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${resp.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${resp.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${resp.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${resp.downloads}</b>
        </p>
      </div>
    </a>`;
  });
  galleryEl.insertAdjacentHTML('beforeend', listArr.join(''));
  lightbox.refresh();
}
document.addEventListener('DOMContentLoaded', () => {
  fetchImages();
});
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 100,
  captionsData: 'alt',
});
