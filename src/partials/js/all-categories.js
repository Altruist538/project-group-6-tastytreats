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
  const buttons = document.querySelectorAll('.all-categories-button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });

  const checkedCategory = event.target.textContent;

  // try {
  //   const { data } = await axios.get(
  //     `https://tasty-treats-backend.p.goit.global/api/recipes?category=${checkedCategory}`
  //   );
  //   return data;
  // } catch (error) {
  //   throw new Error('An error occurred while fetching receipes.');
  // }

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

  try {
    let response = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes?category=${checkedCategory}`,
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
