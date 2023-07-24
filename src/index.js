import './partials/js/modal-recipes';
fetch('/partials/html/modal-recipes.html') 
  .then(response => response.text())
  .then(data => {
    document.getElementById('content').innerHTML = data;
  })
  .catch(error => {
    console.error(error);
  });



