import axios from 'axios';

const url = 'https://tasty-treats-backend.p.goit.global/api/categories';

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

categoriesList.addEventListener('click', onClick);

function onClick(event) {
  const checkedCategory = event.target.textContent;
  const filteredRecipes = fetch(
    'https://tasty-treats-backend.p.goit.global/api/recipes?category=${checkedCategory}&page=1&limit=48'
  )
    .then(response => response.json())
    .then(data => console.log(data));
}

onClick();
