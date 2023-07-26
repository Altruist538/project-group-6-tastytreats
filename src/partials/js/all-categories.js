import axios from 'axios';
import { fetchImages, renderImgCard } from './pictures_backend';

const url = 'https://tasty-treats-backend.p.goit.global/api/categories';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

const btnEl = document.querySelector('.js-all-categories-button');
const categoriesList = document.querySelector('.categories-list');

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

async function getRecipesByCategory(event) {
  const buttons = document.querySelectorAll('.button');

  buttons.forEach(button => {
    if (button.id === 'desired-button') {
      button.classList.add('is-active');
    } else {
      button.classList.remove('is-active');
    }
  });

  const checkedCategory = event.target.textContent;

  try {
    const { data } = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes?category=${checkedCategory}`
    );
    return data;
  } catch (error) {
    throw new Error('An error occurred while fetching receipes.');
  }

  // Додати функцію рендера карток з секції Олександра
}

categoriesList.addEventListener('click', getRecipesByCategory);

function handleAllCategoriesBtnClick() {
  const buttons = document.querySelectorAll('.all-categories-button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('is-active'));
    });
  });

  // Додати Сашині функцію запиту всіх категорій та рендеру розмітки
}

btnEl.addEventListener('click', handleAllCategoriesBtnClick);
