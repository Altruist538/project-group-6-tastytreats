const url = 'https://tasty-treats-backend.p.goit.global/api/categories';

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
