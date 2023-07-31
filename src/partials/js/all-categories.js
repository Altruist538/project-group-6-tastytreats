import axios from 'axios';
import { renderImgCard, fetchImages } from './pictures_backend';
const galleryEl = document.querySelector('.gallery');

const url = 'https://tasty-treats-backend.p.goit.global/api/categories';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

const btnEl = document.querySelector('.js-all-categories-button');
const categoriesList = document.querySelector('.categories-list');

if (categoriesList) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const categoriesList = document.querySelector('.categories-list');

      data.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.classList.add('categories-list-element');
        categoriesList.appendChild(button);
      });
    })
    .catch(error => {
      console.error(error);
    });

  categoriesList.addEventListener('click', getRecipesByCategory);
  btnEl.addEventListener('click', handleAllCategoriesBtnClick);
}

export async function getRecipesByCategory(event) {
  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    if (button.id === 'desired-button') {
      button.classList.add('is-active');
    } else {
      button.classList.remove('is-active');
    }
  });

  const checkedCategory = event.target.textContent;

  let cardsPperPage = 0;
  let pageCounter = 1;

  // const windowWidth = document.documentElement.clientWidth;
  if (window.innerWidth < 768) {
    cardsPperPage = 6;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
    cardsPperPage = 8;
  } else {
    cardsPperPage = 9;
  }

  try {
    let response = await axios.get(BASE_URL, {
      params: {
        // category: checkedCategory,
        page: pageCounter,
        limit: cardsPperPage,
      },
    });

    galleryEl.innerHTML = '';

    renderImgCard(response.data.results);
  } catch (error) {
    console.log(`Failed to fetch images: ${error}`);
  }
}

export function handleAllCategoriesBtnClick() {
  const buttons = document.querySelectorAll('.all-categories-button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('is-active'));
    });
  });

  galleryEl.innerHTML = '';
  fetchImages();
}
