// import { renderImgCard } from "./pictures_backend";

// const recipiesEl = document.querySelector('.popular-list');
// const BASE_URL =
//   'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

// console.log(recipiesEl);
// console.log(BASE_URL);

// async function getRecipies() {
//   try {
//     let response = await fetch(BASE_URL);
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     let recipesArr = await response.json();
//     return recipesArr;
//   } catch (error) {
//     console.log(`Failed to fetch recipes: ${error}`);
//   }
// }

// export async function fetchImages() {
//   try {
//     fetch(`${BASE_URL}&page-${pageCounter}&limit-${perPage}`)
//       .then(res => res.json())
//       .then(data => renderImgCard(data.results));
//   } catch (error) {
//     console.error(error);
//     console.log(`failed to fetch images: ${error}`);
//   }
// }

// function renderCart(recipesArr) {
//   const markUp = recipesArr
//     .map(({ title, description, preview, _id }) => {
//       return `
//       <li class="popular-item" data-id="${_id}">
//         <div class="popular-wraper">
//           <img
//             class="popular-img"
//             src="${preview}"
//             alt="${title}"
//             loading="lazy"
//             height="64"
//             width="64"
//           />
//         </div>
//         <div class="popular-containet-description">
//           <h3 class="popular-title">${title}</h3>
//           <p class="popular-description">${description}</p>
//         </div>
//       </li>
//     `;
//     })
//     .join('');

//   recipiesEl.insertAdjacentHTML('beforeend', markUp);
// }

// if (recipiesEl) {
//   getRecipies().then(renderCart);
// }

import { renderImgCard } from "./pictures_backend";

const recipiesEl = document.querySelector('.popular-list');
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

async function getRecipeDetails(recipeId) {
  const recipeDetailsUrl = `https://tasty-treats-backend.p.goit.global/api/recipes/${recipeId}`;
  try {
    const response = await fetch(recipeDetailsUrl);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const recipeDetails = await response.json();
    return recipeDetails;
  } catch (error) {
    console.error('Failed to fetch recipe details:', error);
    throw error;
  }
}

function openModal(recipe) {
  // Display the modal with the recipe details
  // You can use the 'recipe' object to populate the modal with recipe information
  console.log('Recipe details:', recipe);
  // Add code to display the modal with the recipe details
}

async function fetchAndOpenModal(recipeId) {
  try {
    const recipeDetails = await getRecipeDetails(recipeId);
    openModal(recipeDetails);
  } catch (error) {
    console.error('Failed to fetch and open modal:', error);
  }
}

export async function fetchImages() {
  try {
    const response = await fetch(`${BASE_URL}&page-${pageCounter}&limit-${perPage}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    renderImgCard(data.results);

    const popularItems = recipiesEl.querySelectorAll('.popular-item');
    popularItems.forEach((item) => {
      item.addEventListener('click', () => {
        const recipeId = item.dataset.id;
        fetchAndOpenModal(recipeId);
      });
    });
  } catch (error) {
    console.error('Failed to fetch images:', error);
  }
}

function renderCart(recipesArr) {
  const markUp = recipesArr
    .map(({ title, description, preview, _id }) => {
      return `
      <li class="popular-item" data-id="${_id}">
        <div class="popular-wraper">
          <img
            class="popular-img"
            src="${preview}"
            alt="${title}"
            loading="lazy"
            height="64"
            width="64"
          />
        </div>
        <div class="popular-containet-description">
          <h3 class="popular-title">${title}</h3>
          <p class="popular-description">${description}</p>
        </div>
      </li>
    `;
    })
    .join('');

  recipiesEl.insertAdjacentHTML('beforeend', markUp);
}

fetchImages();