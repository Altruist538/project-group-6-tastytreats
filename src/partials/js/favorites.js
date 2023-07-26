import { getRecipeMarkup } from './pictures_backend';

const notFound = document.querySelector('.not-found-wrapper');
const recipes = document.querySelector('.favorites-list');
const categoriesEl = document.querySelector('.btn-wrapper');
const allBtn = document.querySelector('.all-btn');
const heroImg = document.querySelector('.img-hero');

let currentBtn = '';

const categoryRecipes = [];

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

  const allCatBtn = `<button class="button-fav all-btn onActive" name="all">All categories</button>`;

  const data = JSON.parse(localStorage.getItem('favorites'));

  recipes.innerHTML = '';
  categoriesEl.innerHTML = '';

  if (data && data.length) {
    categoriesEl.innerHTML = `${allCatBtn}${categoryMarkup}`;
  } else {
    allBtn.style.display = 'none';
  }

  generateStorageList();
}

function generateStorageList(pageSet = 1) {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage);

  allBtn.style.display = 'none';

  if (data && data.length) {
    allBtn.style.display = 'block';

    const perPage = calcPages();
    const objData = groupObjects(data, perPage);

    const listMarkup = objData[pageSet].reduce(
      (markup, recipe) => markup + getRecipeMarkup(recipe),
      ''
    );

    categoriesEl.innerHTML = listMarkup;
    notFound.classList.add('is-hidden');
  } else {
    notFound.classList.remove('is-hidden');
    allBtn.classList.add('is-hidden');

    if (window.innerWidth < 768) {
      heroImg.classList.add('is-hidden');
    }
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

categoriesEl.addEventListener('click', filterByCategory);

function filterByCategory(evt) {
  if (evt.target.classList.contains('onActive')) return;

  let data = [];
  let categoryRecipes;
  recipes.innerHTML = '';

  if (evt !== Number(evt) && evt.target.nodeName === 'BUTTON') {
    setActiveClass(evt);
    if (evt.target.name === 'all') return generateStorageList();
    else currentBtn = evt.target.textContent;
  }

  const storage = localStorage.getItem('favorites');
  data = JSON.parse(storage);

  if (!data.length) {
    categoriesEl.style.display = 'none';

    return;
  }

  categoryRecipes = [...data.filter(recipe => recipe.category === currentBtn)];

  let pageSet = 1;

  if (Number(evt) === evt) pageSet = evt;

  const perPage = calcPages();
  const objData = groupObjects(categoryRecipes, perPage);

  const listMarkup = objData[pageSet].reduce(
    (markup, recipe) => markup + getRecipeMarkup(recipe),
    ''
  );

  recipes.innerHTML = listMarkup;
}

function setActiveClass({ target }) {
  const btn = document.querySelector('.onActive');
  if (!btn) return allBtn.classList.add('onActive');
  btn.classList.remove('onActive');
  target.classList.add('onActive');
}

function removeFavoriteRecipe(currentBtn) {
  const recipeInfo = JSON.parse(currentBtn.dataset.info);

  const storage = JSON.parse(localStorage.getItem('favorites'));
  localStorage.setItem(
    'favorites',
    JSON.stringify([...storage.filter(el => el.id !== recipeInfo.id)])
  );
  onFavoritesReload();
}

function checkCategory(target) {
  const currentRec = target.closest('div.recipe-item').dataset.category;
  const storageItems = JSON.parse(localStorage.getItem('favorites'));
  const isCategoryLocal = storageItems.find(el => el.category === currentRec);
  const isCategoryRendered = [...categoriesEl.children].find(
    el => el.textContent === currentRec
  );
  if (!isCategoryLocal && isCategoryRendered) {
    isCategoryRendered.remove();
  } else if (isCategoryLocal && !isCategoryRendered) {
    categoriesEl.insertAdjacentHTML('beforeend', renderCategory(currentRec));
  }

  if (!storageItems.length) allBtn.style.display = 'none';
  else allBtn.style.display = 'block';
}

recipes.addEventListener('click', handleClickOnRecipes);
document.addEventListener('DOMContentLoaded', onFavoritesReload);
