
import { findRecipes, patchRating } from '../service/API';
import { measureRating } from '../renders/renders';
import { ratingScale } from '../renders/renders';
import SmoothScrollbar from 'smooth-scrollbar';
import Notiflix from 'notiflix';

const url = 'https://tasty-treats-backend.p.goit.global/api/recipes/';

const refs = {
  closeModalBtn: document.querySelector('.close-modal'),
  backdropModal: document.querySelector('.backdrop-recipes'),
  mainModalRecipes: document.querySelector('.modal-recipes'),
  modalRecipes: document.querySelector('#scroll-rec'), 
  saveRecipeBtn: document.querySelector('.save-recipes-btn'),
};

export function OpenModal(currentBtn) {
  refs.closeModalBtn.addEventListener('click', CloseModal);
  refs.backdropModal.addEventListener('click', CloseOnClick);
  window.addEventListener('keydown', CloseOnBtnClick);

  refs.modalRecipes.classList.add('is-hidden-modal');

  refs.rateForm.dataset.id = currentBtn.dataset.id;
  genereteRecipe(currentBtn.dataset.id);
  ToggleScroll();

  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage);

  if (storage) {
    if (data.find(el => el.id === currentBtn.dataset.id)) {
      refs.saveRecipeBtn.textContent = 'Remove favorite';
    } else {
      refs.saveRecipeBtn.textContent = 'Add to favorite';
    }
  }

  refs.saveRecipeBtn.addEventListener('click', AddToFav);
}

// Додати функцію для закриття модального вікна
function CloseModal() {
  removeListeners();
  restoreForm();
  refs.backdropModal.classList.add('is-hidden-modal');
  refs.mainModalRecipes.classList.add('is-hidden-modal');
  refs.rateModal.classList.add('is-hidden-modal');
  refs.modalRecipes.innerHTML = '';
  ToggleScroll();
}

// Додати функцію для закриття модального вікна при кліку на backdrop
function CloseOnClick({ currentTarget, target }) {
  if (currentTarget === target) CloseModal();
}

// Додати функцію для закриття модального вікна при натисканні клавіші "Escape"
function CloseOnBtnClick(e) {
  if (e.key === 'Escape') CloseModal();
}




function CreateMarkup(data) {
  const ingr = data.ingredients;
  const src = !data.youtube
    ? data.thumb
    : data.youtube.replace('watch?v=', 'embed/');
  const tags = data.tags;
  let tagslist = '';
  if (!tags[0]) {
    // document.querySelector(".recipe-tags").classList.add("is-hidden-modal");
    // console.log('Zero');
  } else {
    for (let k = 0; k < tags.length; k++) {
      tagslist += `<li class="recipe-tag">#${tags[k]}</li>`;
    }
  }
  let ingrList = '';
  for (let i = 0; i < ingr.length; i++) {
    ingrList += `<li class="recipe-ingridient">${ingr[i].name} <span class="recipe-ps">${ingr[i].measure}</span></li>`;
  }
  const fixRating =
    data.rating > 5 ? Number(5).toFixed(1) : data.rating.toFixed(1);
  const markup = `<div class="recipe-parts">
    ${checkSrc(src, data.description)}
    <div class="recipe-title">
      <h2 class="recipe-title-txt">${data.title}</h2>
      <div class="rating-part">
        <p class='rate'>${fixRating}</p>
      ${ratingScale(fixRating)}
        <p class="recipe-time">${data.time} min</p>
      </div>
      <ul class="ingridients">
        ${ingrList}
      </ul>
    </div>
  </div>
  <ul class="recipe-tags">
    ${tagslist}
  </ul>
  <p class="recipe-instr">${data.instructions}</p>
  </div>
`;
  return markup;
}

function addScrollbarText() {
  const scrollbarBox = document.querySelector('.recipe-instr');
  const instructions = scrollbarBox.textContent; 
  const scrollbar = SmoothScrollbar.init(scrollbarBox, {
    alwaysShowTracks: true,
  });
  // scrollbarBox.appendChild(`<p class="recipe-instr">${instructions}</p>`);

  const scrollbarIngs = document.querySelector('.ingridients');
  const scrollbarSec = SmoothScrollbar.init(scrollbarIngs, {
    alwaysShowTracks: true,
  });
}
function addData(markup) {
  refs.modalRecipes.insertAdjacentHTML('afterbegin', markup);
}
function ToggleScroll() {
  const body = document.querySelector('body');
  body.classList.toggle('overflow-hidden');
}

function checkSrc(url, description) {
  if (url.endsWith('.jpg')) {
    return `<img class="modal-img" src="${url}" alt="${description}">`;
  } else {
    return `<iframe
      class="recipe-frame"
      src="${url}"
      frameborder="0"
      alt="${description}"
    ></iframe>`;
  }
}

export function AddToFav({ target }) {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage);
  const currentRec = JSON.parse(refs.modalRecipes.dataset.info);
  if (storage) {
    if (data.find(el => el.id === currentRec.id)) {
      localStorage.setItem(
        'favorites',
        JSON.stringify([...data.filter(el => el.id !== currentRec.id)])
      );
      target.textContent = 'Add to favorite';
    } else {
      localStorage.setItem('favorites', JSON.stringify([...data, currentRec]));
      target.textContent = 'Remove favorite';
    }
  } else {
    localStorage.setItem('favorites', JSON.stringify([currentRec]));
    target.textContent = 'Remove favorite';
  }
}
async function genereteRecipe(id) {
  try {
    const recipe = await findRecipes(id);

    const { title, description, preview, rating, _id, category } = recipe;

    const recipeObj = {
      title,
      description,
      preview,
      rating,
      id: _id,
      category,
    };

    refs.modalRecipes.dataset.info = JSON.stringify(recipeObj);

    addData(CreateMarkup(recipe));
    addScrollbarText();
    addRatingButton(); 
  } catch (err) {
    console.error(err);
  }
}

function removeListeners() {
  // Main Modal
  refs.closeModalBtn.removeEventListener('click', CloseModal);
  refs.backdropModal.removeEventListener('click', CloseOnClick);
  refs.saveRecipeBtn.removeEventListener('click', AddToFav);
  // All
  window.removeEventListener('keydown', CloseOnBtnClick);
}