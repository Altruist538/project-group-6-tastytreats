// import { RecipesApi } from "./RecipesAPI-js";

// const api = new RecipesApi();

// const listCategories = document.getElementById('categories-list')

// async function getCategories() {
//     try {
//         const data = await api.getAllRecipies()
//         console.log(data)
//     createRecipes(data)
//     }
//     catch (error) {
//         console.log(error)
//     }
// }
// getCategories();
// function createRecipes(data) {
//     const markup = data.map((value) =>
//         `<li> ${value.category} </li>`).join('');
//     listCategories.insertAdjacentHTML('afterbegin', markup)
// }



// import axios from 'axios';

// // Функція для здійснення запиту до API
// export const getRecipes = async (category, page, limit, time, area, ingredient) => {
//   try {
//     const apiUrl = `https://tasty-treats-backend.p.goit.global/api/recipes?category=${category}&page=${page}&limit=${limit}&time=${time}&area=${area}&ingredient=${ingredient}`;
//     const response = await axios.get(apiUrl);
//     return response.data;
//   } catch (error) {
//     console.error('Помилка при отриманні даних:', error.message);
//     throw error;
//   }
// };



import { getRecipes } from './api';

const category = 'Beef';
const page = 1;
const limit = 6;
const time = 160;
const area = 'Irish';
const ingredient = '640c2dd963a319ea671e3796';

const recipesList = document.getElementById('categories-list');

getRecipes(category, page, limit, time, area, ingredient)
  .then(data => {
    data.results.forEach(recipe => {
    
      const listItem = document.createElement('li');

     
      const img = document.createElement('img');
      img.src = recipe.thumb;
      img.alt = recipe.title;
      listItem.appendChild(img);

      const title = document.createElement('h2');
      title.textContent = recipe.title;
      listItem.appendChild(title);

    
      const description = document.createElement('p');
      description.textContent = recipe.description;
      listItem.appendChild(description);

      recipesList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error(error);
  });
