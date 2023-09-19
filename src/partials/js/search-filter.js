import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages, renderImgCard } from './pictures_backend';
import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

const wordSearchEl = document.querySelector('.inp-search-form');
const timeSearchEl = document.querySelector('.inp-time-form');
const areaSearchEl = document.querySelector('.inp-area-form');
const ingredientsSearchEl = document.querySelector('.inp-ingredients-form');
const searchIcon = document.querySelector('.form-icon-search');
const galleryEl = document.querySelector('.gallery');
const resetFilterBtnEl = document.querySelector('.svg-modal-reset-btn');

const DEBOUNCE_DELAY = 300;

if (wordSearchEl) {
  // Очищення фільтрів через reset btn
  resetFilterBtnEl.addEventListener('click', handleOnResetFilterBtnClick);
  // Зміна кольору іконки
  wordSearchEl.addEventListener('focus', () => {
    searchIcon.classList.add('is-active');
  });
  wordSearchEl.addEventListener('blur', () => {
    searchIcon.classList.remove('is-active');
  });

  // Запит на бек по данним з search
  wordSearchEl.addEventListener('input', debounce(searchRecipesByQuery), 300);
}

function handleOnResetFilterBtnClick() {
  const buttons = document.querySelectorAll('.all-categories-button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('is-active'));
    });
  });

  wordSearchEl.value = '';
  timeSearchEl.value = '';
  areaSearchEl.value = '';
  ingredientsSearchEl.value = '';

  galleryEl.innerHTML = '';
  fetchImages();
}

async function searchRecipesByQuery() {
  const searchQuery = wordSearchEl.value.trim();

  let cardsPperPage = 0;
  let pageCounter = 1;

  const windowWidth = document.documentElement.clientWidth;
  if (window.innerWidth < 768) {
    cardsPperPage = 6;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
    cardsPperPage = 8;
  } else {
    cardsPperPage = 9;
  }

  // try {
  //   let response = await axios.get(BASE_URL, {
  //     params: {
  //       title: searchQuery,
  //       page: pageCounter,
  //       limit: cardsPperPage,
  //     },
  //   });

  galleryEl.innerHTML = '';
  const url = new URL(BASE_URL);
  url.searchParams.append('page', pageCounter);
  url.searchParams.append('limit', limitPage);
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    let recipesArr = await response.json();
    console.log(recipesArr.results);
    renderImgCard(recipesArr.results);
    // renderImgCard(response.data.results);

    // if (response.data.results.length === 0) {
    if (recipesArr.results === 0) {
      Notify.warning(
        'Sorry, we could not find any relevant receipes. Please, try again!'
      );
      fetchImages();
    }
    // if () { }
  } catch (error) {
    console.log(`Failed to fetch images: ${error}`);
  }
}
