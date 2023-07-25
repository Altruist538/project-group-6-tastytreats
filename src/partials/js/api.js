// import axios from "axios";
// export class RecipesApi{
//    async getAllRecipies() {
//        const url = 'https://tasty-treats-backend.p.goit.global/api/recipes?category=Beef&page=1&limit=6&time=160&area=Irish&ingredient=640c2dd963a319ea671e3796';
//        try {
//            const {data} = await axios(url);
//            return data.results
//        } catch (error) {
//            console.log(error)
//        }
//     }
//     async getRecipesByCategory(category) {
//         const url = 'https://tasty-treats-backend.p.goit.global/api/categories';
//          try {
//            const {data} = await axios(url);
//            return data.results
//        } catch (error) {
//            console.log(error)
//        }
//     }
// }




// import { getRecipes } from './api';

// const category = 'Beef';
// const page = 1;
// const limit = 6;
// const time = 160;
// const area = 'Irish';
// const ingredient = '640c2dd963a319ea671e3796';

// // Виклик функції для здійснення запиту до API та виведення результатів на сторінку
// getRecipes(category, page, limit, time, area, ingredient)
//   .then(data => {
//     data.results.forEach(recipe => {
//       // Виведення даних про кожен рецепт на сторінку
//       console.log('Назва рецепту:', recipe.title);
//       console.log('Опис:', recipe.description);
//       console.log('Категорія:', recipe.category);
//       console.log('Кухня:', recipe.area);
//       console.log('Час приготування:', recipe.time);
//       console.log('Посилання на зображення:', recipe.thumb);
//       console.log('Посилання на попереднє зображення:', recipe.preview);
//       console.log('Інгредієнти:', recipe.ingredients);
//       console.log('Інструкції:', recipe.instructions);
//       console.log('Теги:', recipe.tags);
//     });
//   })
//   .catch(error => {
//     console.error('Помилка:', error.message);
//   });





import axios from 'axios';

const apiUrl = 'https://tasty-treats-backend.p.goit.global/api';

export const getCategories = () => {
  return axios.get(`${apiUrl}/categories`)
    .then(response => response.data)
    .catch(error => {
      console.error( error);
      throw error;
    });
};

export const getRecipes = (category, page, limit, time, area, ingredient) => {
  const queryParams = new URLSearchParams({
    category,
    page,
    limit,
    time,
    area,
    ingredient,
  }).toString();

  return axios.get(`${apiUrl}/recipes?${queryParams}`)
    .then(response => response.data)
    .catch(error => {
      console.log( error);
      throw error;
    });
};
