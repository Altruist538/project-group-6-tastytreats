const refs = {
  closeModalBtn: document.querySelector('.close-modal'),
  backdropModal: document.querySelector('.backdrop-recipes'),
  mainModalRecipes: document.querySelector('.modal-recipes'),
  modalRecipes: document.querySelector('.modal-recipes-js'),
  backdropModal: document.querySelector('.backdrop-recipes'),
  saveRecipeBtn: document.querySelector('.save-recipes-btn'),
  giveRatingBtn: document.querySelector('.give-rating-btn'),
 };


fetch('/partials/html/modal-recipes.html') 
  .then(response => response.text())
  .then(data => {
    document.getElementById('content').innerHTML = data;
  })
  .catch(error => {
    console.error (error);
  });





