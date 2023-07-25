import axios from 'axios';

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

categoriesList.addEventListener('click', getRecipesByCategory);

async function getRecipesByCategory(event) {
  const checkedCategory = event.target.textContent;
  try {
    const { data } = await axios.get(
      `https://tasty-treats-backend.p.goit.global/api/recipes?category=${checkedCategory}`
    );
    return data;
    console.log(data);
  } catch (error) {
    throw new Error('An error occurred while fetching receipes.');
  }
  // Додати функцію рендера карток з секції Олександра
}
