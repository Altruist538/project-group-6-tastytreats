const modalBackdrop = document.querySelector('.recipe-modal-backdrop');
const modal = document.querySelector('.recipe-modal');
const closeButton = document.querySelector('.recipe-modal-close-button');
const recipeContainer = document.querySelector('.recipe-modal-content');

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

// Часть кода, чтобы модалка открывалась при клике по кнопке See More НАЧАЛО//
closeButton.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', event => {
  if (event.target === modalBackdrop) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function openModal() {
  modalBackdrop.classList.add('isOpen');
  modal.classList.add('isOpen');
}

function closeModal() {
  modalBackdrop.classList.remove('isOpen');
  modal.classList.remove('isOpen');
}

document.addEventListener('DOMContentLoaded', () => {
  const parentElement = document.body;
  parentElement.addEventListener('click', event => {
    if (event.target.classList.contains('card-btn')) {
      openModal();
      const recipeId = event.target.getAttribute('data-id');
      fetchAndRenderRecipe(recipeId);
    }
  });
});

// Часть кода, чтобы модалка открывалась при клике по кнопке See More КОНЕЦ//

// Часть кода, чтобы в модалке отрисовывалась информация по рецепту НАЧАЛО//
async function fetchAndRenderRecipe(recipeId) {
  try {
    const response = await fetch(`${BASE_URL}/recipes/${recipeId}`);

    if (!response.ok) {
      throw new Error(response.status);
    }
    const recipeData = await response.json();

    // Обработка ютуба
    const src = !recipeData.youtube
      ? recipeData.thumb
      : recipeData.youtube.replace('watch?v=', 'embed/');

    // Обработка тегов
    const tags = recipeData.tags;
    let tagslist = '';
    if (!tags[0]) {
    } else {
      for (let i = 0; i < tags.length; i += 1) {
        tagslist += `<li class="recipe-modal-tags-item">#${tags[i]}</li>`;
      }
    }

    //Обработка рейтинга
    const rate =
      recipeData.rating > 5
        ? Number(5).toFixed(1)
        : recipeData.rating.toFixed(1);

    // Обработка ингридиентов
    let ingredients = recipeData.ingredients;
    let ingredientsList = '';
    for (let i = 0; i < ingredients.length; i += 1) {
      ingredientsList += `<li class="recipe-modal-ingredients"> <span class="recipe-modal-ingredients-name">${ingredients[i].name} </span><span class="recipe-modal-ingredients-measure">${ingredients[i].measure}</span></li>`;
    }

    // Разметка модалки
    recipeContainer.innerHTML = `
    <h2 class="recipe-modal-title">${recipeData.title}</h2>

    <iframe class="recipe-modal-youtube-iframe" frameborder="0"       width="467px" height="250px" src="${src}"></iframe>

    <div class="recipe-modal-tags-and-rate-container">
    <ul class="recipe-modal-tags-wrapper">${tagslist}</ul>
    <p class="recipe-modal-rate">${rate}</p>
    <p class="recipe-modal-time">${recipeData.time} min</p>
    </div>

    <div class="recipe-modal-ingredients-wrapper">
    <ul class="recipe-modal-ingredients-list">
    ${ingredientsList}
    </ul>
    </div>
    
    <p class="recipe-modal-instructions">${recipeData.instructions}</p>
`;
  } catch (error) {
    console.error('Failed to fetch recipe:', error);
  }
}

// Часть кода, чтобы в модалке отрисовывалась информация по рецепту КОНЕЦ//
