// // scripts.js

// const apiUrl = 'https://tasty-treats-backend.p.goit.global/api/recipes';
// const params = {
//   category: 'Beef',
//   page: 1,
//   limit: 6,
//   time: 160,
//   area: 'Irish',
//   ingredient: '640c2dd963a319ea671e3796'
// };

// const recipesList = document.getElementById('recipes-list');

// axios.get(apiUrl, { params })
//   .then(response => {
//     const recipe = response.data; // Отримуємо об'єкт з даними одного рецепту
//     const listItem = document.createElement('li');
//     listItem.textContent = recipe.title;
//     recipesList.appendChild(listItem);
//   })
//   .catch(error => {
//     console.error('Помилка при отриманні даних:', error);
//   });
