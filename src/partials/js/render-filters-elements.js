import axios from 'axios';

const BASE_URL =
  'https://tasty-treats-backend.p.goit.global/api/recipes?limit=500';
const areaFilterEl = document.querySelector('.inp-area-form');

function fetchAreaFilter() {
  fetch(BASE_URL)
    .then(response => response.json())
    .then(data => {
      const areaFilterEl = document.querySelector('.inp-area-form');
      data.results.forEach(category => {
        const areaOptionElement = document.createElement('option');
        areaOptionElement.value = category.area;
        areaOptionElement.textContent = category.area;
        areaFilterEl.appendChild(areaOptionElement);
      });
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
}
fetchAreaFilter();

// function fetchAreaFilter() {
//   fetch(BASE_URL)
//     .then(response => response.json())
//     .then(data => {
//       const areaFilterEl = document.querySelector('.inp-area-form');
//       data.results.forEach(category => {
//         const areaOptionElement = document.createElement('option');
//         areaOptionElement.value = category.area;
//         areaOptionElement.textContent = category.area;
//         areaFilterEl.appendChild(areaOptionElement);
//       });
//     })
//     .catch(error => {
//       console.error('Ошибка:', error);
//     });
// }
// fetchAreaFilter();
