import { fetchImages } from './pictures_backend';

const url = 'https://tasty-treats-backend.p.goit.global/api/categories';

const btnEl = document.querySelector('.js-all-categories-button');
btnEl.classList.add('is-active');
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

categoriesList.addEventListener('click', getRecipesByCategory);

async function getRecipesByCategory(event) {
  const buttons = document.querySelectorAll('.categories-list-element');
  buttons.forEach(button => {
    button.classList.remove('is-active');
  });
  event.target.classList.add('is-active');

  const checkedCategory = event.target.textContent;

  fetchImages(checkedCategory);
}

btnEl.addEventListener('click', handleAllCategoriesBtnClick);

function handleAllCategoriesBtnClick() {
  const buttons = document.querySelectorAll('.categories-list-element');
  buttons.forEach(button => {
    button.classList.remove('is-active');
  });
  btnEl.classList.add('is-active');
  fetchImages();
}
