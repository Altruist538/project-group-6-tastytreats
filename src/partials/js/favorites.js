import { getRecipeMarkup } from './pictures_backend';

const favoritesSection = document.querySelector('#favorites_section');
const notFound = document.querySelector('.not-found-wrapper');
const recipes = document.querySelector('.favorites-list');
const categoriesEl = document.querySelector('.btn-wrapper');
const allBtn = document.querySelector('.all-btn');
const dishImg = document.querySelector('.dish-img');

let currentBtn = '';
let hasStoredRecipes = false;

const categoryRecipes = [];

function resizeImg() {
  if (window.innerWidth < 768 && !hasStoredRecipes) {
    dishImg.classList.add('is-hidden');
  } else {
    dishImg.classList.remove('is-hidden');
  }
}

if (favoritesSection) {
  window.addEventListener('resize', resizeImg);
  resizeImg();
  categoriesEl.addEventListener('click', filterByCategory);
  onFavoritesReload();
  recipes.addEventListener('click', e => {
    toggleFavorite(e);
    onFavoritesReload();
  });
  document.addEventListener('DOMContentLoaded', generateFavoritesList);
}

function calcPages() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    return 9;
  }

  if (screenWidth >= 768) {
    return 12;
  }
}

function groupObjects(array, groupSize) {
  const result = {};
  for (let i = 0; i < array.length; i += groupSize) {
    const groupName = Math.floor(i / groupSize) + 1;
    result[groupName] = array.slice(i, i + groupSize);
  }
  return result;
}

function onFavoritesReload() {
  const categoryMarkup = generateCategoryList();

  const allCatBtn = `<button class="btn-category all-btn is-active" name="all">All categories</button>`;

  const data = JSON.parse(localStorage.getItem('favorites'));

  categoriesEl.innerHTML = '';

  if (data && data.length) {
    categoriesEl.innerHTML = `${allCatBtn}${categoryMarkup}`;
  } else {
    allBtn.style.display = 'none';
  }

  generateStorageList();
}

function generateStorageList() {
  const favorites = getFavoritesFromLocalStorage();

  if (favorites.length) {
    const listMarkup = favorites.reduce(
      (markup, recipe) => markup + getRecipeMarkup(recipe, favorites),
      ''
    );

    recipes.innerHTML = listMarkup;
    notFound.classList.add('is-hidden');
    hasStoredRecipes = true;
    resizeImg();
  } else {
    notFound.classList.remove('is-hidden');
    allBtn.classList.add('is-hidden');
    hasStoredRecipes = false;
    resizeImg();
  }
}

function generateCategoryList() {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage);
  if (storage) {
    return data
      .flatMap(recipe => recipe.category)
      .filter((category, index, array) => array.indexOf(category) === index)
      .reduce(
        (categoryMarkup, category) => categoryMarkup + renderCategory(category),
        ''
      );
  }
  return '';
}

function renderCategory(category) {
  return `<button class="btn-category">${category}</button>`;
}

function getFavoritesFromLocalStorage() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function generateFavoritesList() {
  const favorites = getFavoritesFromLocalStorage();
  const favoritesMarkup = favorites
    .map(recipe => getRecipeMarkup(recipe, favorites))
    .join('');

  recipes.innerHTML = favoritesMarkup;

  if (favorites.length === 0) {
    notFound.classList.remove('is-hidden');
  } else {
    notFound.classList.add('is-hidden');
  }
}

function filterByCategory(evt) {
  if (evt.target.classList.contains('is-active')) return;

  // let data = [];
  // let categoryRecipes;

  // const storage = localStorage.getItem('favorites');
  // data = JSON.parse(storage);

  // if (!data.length) {
  //   return;
  // }

  // categoryRecipes = [...data.filter(recipe => recipe.category === currentBtn)];

  // let pageSet = 1;

  // if (Number(evt) === evt) pageSet = evt;

  // const perPage = calcPages();
  // const objData = groupObjects(categoryRecipes, perPage);

  Array.from(categoriesEl.children).forEach(el =>
    el.classList.remove('is-active')
  );
  evt.target.classList.add('is-active');

  const favorites = getFavoritesFromLocalStorage();

  const categoryRecipes = evt.target.classList.contains('all-btn')
    ? favorites
    : [
        ...favorites.filter(
          recipe => recipe.category === evt.target.textContent
        ),
      ];

  const listMarkup = categoryRecipes.reduce(
    (markup, recipe) => markup + getRecipeMarkup(recipe, favorites),
    ''
  );

  recipes.innerHTML = listMarkup;
}

export function toggleFavorite(e) {
  if (e.target.dataset.heart) {
    let favorites = getFavoritesFromLocalStorage();
    if (e.target.dataset.heart === 'true') {
      e.target.classList.remove('is-active');
      e.target.dataset.heart = false;

      favorites = favorites.filter(({ _id }) => _id !== e.target.dataset.id);
    } else {
      e.target.classList.add('is-active');
      e.target.dataset.heart = true;
      favorites.push(JSON.parse(decodeURIComponent(e.target.dataset.recipe)));
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
