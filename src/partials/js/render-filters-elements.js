fetch('https://tasty-treats-backend.p.goit.global/api/areas')
  .then(response => response.json())
  .then(data => {
    const areaFilterEl = document.querySelector('.inp-area-form');

    data.forEach(area => {
      const areaOptionEl = document.createElement('option');
      areaOptionEl.value = area.name;
      areaOptionEl.textContent = area.name;
      areaFilterEl.appendChild(areaOptionEl);
    });
  })
  .catch(error => console.log('Ошибка при запросе:', error));

fetch('https://tasty-treats-backend.p.goit.global/api/ingredients')
  .then(response => response.json())
  .then(data => {
    const ingredientsFilterEl = document.querySelector('.inp-ingredients-form');

    data.forEach(ingredients => {
      const ingredientsOptionEl = document.createElement('option');
      ingredientsOptionEl.value = ingredients.name;
      ingredientsOptionEl.textContent = ingredients.name;
      ingredientsFilterEl.appendChild(ingredientsOptionEl);
    });
  })
  .catch(error => console.log('Ошибка при запросе:', error));
