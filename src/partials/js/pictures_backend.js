import axios from 'axios';
import { toggleFavorite } from './favorites';
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
fetchImages();
export function getRecipeMarkup(recipe, favorites = []) {
  const { _id, preview, title, category, description, area, rating } = recipe;
  const isFavorite = favorites.some(fav => fav._id === _id);

  let s1;
  let s2;
  let s3;
  let s4;
  let s5;

  let roundedRating = Math.round(rating);
  if (roundedRating === 1) {
    s1 = 'filled';
    s2 = '';
    s3 = '';
    s4 = '';
    s5 = '';
  } else if (roundedRating === 2) {
    s1 = 'filled';
    s2 = 'filled';
    s3 = '';
    s4 = '';
    s5 = '';
  } else if (roundedRating === 3) {
    s1 = 'filled';
    s2 = 'filled';
    s3 = 'filled';
    s4 = '';
    s5 = '';
  } else if (roundedRating === 4) {
    s1 = 'filled';
    s2 = 'filled';
    s3 = 'filled';
    s4 = 'filled';
    s5 = '';
  } else if (roundedRating === 5) {
    s1 = 'filled';
    s2 = 'filled';
    s3 = 'filled';
    s4 = 'filled';
    s5 = 'filled';
  }

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
         <button class="heart-wrapper ${
           isFavorite && 'is-active'
         }" data-heart="${isFavorite}" data-id="${_id}" data-recipe="${encodeURIComponent(
    JSON.stringify(recipe)
  )}">
         <svg class="heart-icon" width="22" height="22" viewBox="0 0 32 32">
          <path opacity="0.5" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.9091" d="M15.991 6.848c-2.666-3.117-7.113-3.956-10.451-1.101-3.341 2.854-3.811 7.625-1.188 11.001 2.182 2.806 8.781 8.724 10.944 10.64 0.241 0.214 0.364 0.321 0.505 0.364 0.057 0.017 0.123 0.027 0.191 0.027s0.133-0.010 0.195-0.029l-0.005 0.001c0.141-0.042 0.262-0.15 0.503-0.364 2.164-1.916 8.764-7.834 10.944-10.64 2.624-3.375 2.211-8.177-1.187-11.001-3.398-2.825-7.785-2.016-10.451 1.101z"></path>
         </svg>
        </button>
        <div class="wrapper-bottom">
        <div class="rating-wrapper">
        <p class="rating">${rating.toFixed(1)}</p>

         <div class="rating-container">      
      <svg class="star ${s1}" width="14" height="14" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" data-rating="1">
        <path
          d="M13.826 3.262c0.684-2.106 3.663-2.106 4.348 0l1.932 5.945c0.306 0.942 1.184 1.579 2.174 1.579h6.251c2.214 0 3.135 2.833 1.344 4.135l-5.057 3.674c-0.801 0.582-1.136 1.614-0.83 2.556l1.931 5.945c0.684 2.106-1.726 3.857-3.517 2.555l-5.057-3.674c-0.801-0.582-1.886-0.582-2.687 0l-5.057 3.674c-1.791 1.302-4.202-0.45-3.517-2.555l1.932-5.945c0.306-0.942-0.029-1.973-0.83-2.556l-5.057-3.674c-1.791-1.302-0.871-4.135 1.344-4.135h6.251c0.99 0 1.868-0.638 2.174-1.579l1.932-5.945z"
        ></path>
      </svg>

      <svg class="star ${s2}" width="14" height="14" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" data-rating="2">
        <path
          d="M13.826 3.262c0.684-2.106 3.663-2.106 4.348 0l1.932 5.945c0.306 0.942 1.184 1.579 2.174 1.579h6.251c2.214 0 3.135 2.833 1.344 4.135l-5.057 3.674c-0.801 0.582-1.136 1.614-0.83 2.556l1.931 5.945c0.684 2.106-1.726 3.857-3.517 2.555l-5.057-3.674c-0.801-0.582-1.886-0.582-2.687 0l-5.057 3.674c-1.791 1.302-4.202-0.45-3.517-2.555l1.932-5.945c0.306-0.942-0.029-1.973-0.83-2.556l-5.057-3.674c-1.791-1.302-0.871-4.135 1.344-4.135h6.251c0.99 0 1.868-0.638 2.174-1.579l1.932-5.945z"
        ></path>
      </svg>

      <svg class="star ${s3}" width="14" height="14" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" data-rating="3">
        <path
          d="M13.826 3.262c0.684-2.106 3.663-2.106 4.348 0l1.932 5.945c0.306 0.942 1.184 1.579 2.174 1.579h6.251c2.214 0 3.135 2.833 1.344 4.135l-5.057 3.674c-0.801 0.582-1.136 1.614-0.83 2.556l1.931 5.945c0.684 2.106-1.726 3.857-3.517 2.555l-5.057-3.674c-0.801-0.582-1.886-0.582-2.687 0l-5.057 3.674c-1.791 1.302-4.202-0.45-3.517-2.555l1.932-5.945c0.306-0.942-0.029-1.973-0.83-2.556l-5.057-3.674c-1.791-1.302-0.871-4.135 1.344-4.135h6.251c0.99 0 1.868-0.638 2.174-1.579l1.932-5.945z"
        ></path>
      </svg>

      <svg class="star ${s4}" width="14" height="14" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" data-rating="4">
        <path
          d="M13.826 3.262c0.684-2.106 3.663-2.106 4.348 0l1.932 5.945c0.306 0.942 1.184 1.579 2.174 1.579h6.251c2.214 0 3.135 2.833 1.344 4.135l-5.057 3.674c-0.801 0.582-1.136 1.614-0.83 2.556l1.931 5.945c0.684 2.106-1.726 3.857-3.517 2.555l-5.057-3.674c-0.801-0.582-1.886-0.582-2.687 0l-5.057 3.674c-1.791 1.302-4.202-0.45-3.517-2.555l1.932-5.945c0.306-0.942-0.029-1.973-0.83-2.556l-5.057-3.674c-1.791-1.302-0.871-4.135 1.344-4.135h6.251c0.99 0 1.868-0.638 2.174-1.579l1.932-5.945z"
        ></path>
      </svg>
      
      <svg class="star ${s5}" width="14" height="14" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" data-rating="5">
        <path
          d="M13.826 3.262c0.684-2.106 3.663-2.106 4.348 0l1.932 5.945c0.306 0.942 1.184 1.579 2.174 1.579h6.251c2.214 0 3.135 2.833 1.344 4.135l-5.057 3.674c-0.801 0.582-1.136 1.614-0.83 2.556l1.931 5.945c0.684 2.106-1.726 3.857-3.517 2.555l-5.057-3.674c-0.801-0.582-1.886-0.582-2.687 0l-5.057 3.674c-1.791 1.302-4.202-0.45-3.517-2.555l1.932-5.945c0.306-0.942-0.029-1.973-0.83-2.556l-5.057-3.674c-1.791-1.302-0.871-4.135 1.344-4.135h6.251c0.99 0 1.868-0.638 2.174-1.579l1.932-5.945z"
        ></path>
      </svg>
      
     </div>

        </div>
                <div class="card-btn-wrapper">

        
          <button class="card-btn">See recipe</button>
        </div>
        </div>
      </div>
    </div>`;
}
const fetchData = async () => {
  try {
    const response = await axios.get(BASE_URL);
    console.log(response.data.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
export async function fetchImages() {
  try {
    let response = await axios.get(BASE_URL, {
      params: {
        page: pageCounter,
        limit: perPage,
      },
    });
    console.log(response.data.results);
    return renderImgCard(response.data.results);
  } catch (error) {
    // console.error(error);
    console.log(`Failed to fetch images: ${error}`);
  }
}

export function renderImgCard(response) {
  const storage = localStorage.getItem('favorites');
  const favorites = JSON.parse(storage) || [];
  let listArr = response.map(resp => {
    return getRecipeMarkup(resp, favorites);
    // return getRecipeMarkup(resp);
  });
  // galleryEl.insertAdjacentHTML('beforeend', listArr.join(''));
  galleryEl.innerHTML = listArr;
}
// Вызываем функцию fetchImages() при загрузке страницы
// document.addEventListener('DOMContentLoaded', () => {
//   galleryEl && fetchImages();
// });

// galleryEl &&
// galleryEl.addEventListener('click', toggleFavorite);
