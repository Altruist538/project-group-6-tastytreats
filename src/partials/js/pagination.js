import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

// function resizeVisPage() {
//   const screenWidth = window.innerWidth;

//   if (screenWidth < 768) {
//     return 2;
//   }

//   if (screenWidth >= 768) {
//     return 3;
//   }
// }

// function startPagination(page, perPage, totalPages, callback) {
//   const options = {
//     totalItems: Number(perPage) * Number(totalPages),
//     itemsPerPage: Number(perPage),
//     visiblePages: resizeVisPage(),
//     page: Number(page),
//     centerAlign: false,
//     omitMiddlePages: false,
//     firstItemClassName: 'tui-first-child',
//     lastItemClassName: 'tui-last-child',
//     template: {
//       page: '<a href="#" class="tui-page-btn pag-page">{{page}}</a>',
//       currentPage:
//         '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//       moveButton:
//         '<a href="#" class="tui-page-btn tui-{{type}} move-button">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</a>',
//       disabledMoveButton:
//         '<span class="tui-page-btn tui-is-disabled tui-{{type}} prev-button">' +
//         '<span class="tui-ico-{{type}}">{{type}}</span>' +
//         '</span>',
//       moreButton:
//         '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip more-button">' +
//         '<span class="tui-ico-ellip">...</span>' +
//         '</a>',
//     },
//   };

//   const pagination = new Pagination('pagination', options);

//   pagination.on('beforeMove', ({ page }) => {
//     console.log('beforeMove: Перехід на сторінку ' + page);
//   });

//   pagination.on('afterMove', ({ page }) => {
//     callback(page);
//   });
// }

// export default startPagination;

const recipiesEl = document.querySelector('.popular-list');
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

async function getRecipies(page, limit) {
  try {
    let response = await fetch(`${BASE_URL}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    let recipesArr = await response.json();
    return recipesArr;
  } catch (error) {
    console.log(`Failed to fetch recipes: ${error}`);
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

  recipiesEl.innerHTML = markUp;
}

async function init() {
  const currentPage = 1;
  const itemsPerPage = 10;

  const recipesData = await getRecipies(currentPage, itemsPerPage);
  const totalItems = recipesData.totalItems;

  renderCart(recipesData.recipes);

  renderPagination(totalItems, currentPage, itemsPerPage);
}

init();


function renderPagination(totalItems, currentPage, itemsPerPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginationEl = document.getElementById('pagination');
  let paginationMarkup = '';

  paginationMarkup += `<span class="tui-page-btn tui-is-disabled tui-first prev-button pag-page-prev-light">
    <span class="tui-ico-first">first</span>
  </span>`;

 
  paginationMarkup += `<span class="tui-page-btn tui-is-disabled tui-prev prev-button pag-page-prev-light">
    <span class="tui-ico-prev">prev</span>
  </span>`;


  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationMarkup += `<strong class="tui-page-btn tui-is-selected tui-first-child pag-active-light">${i}</strong>`;
    } else {
      paginationMarkup += `<a href="#" class="tui-page-btn pag-page pag-page-next-light">${i}</a>`;
    }
  }


  paginationMarkup += `<a href="#" class="tui-page-btn tui-next move-button pag-page-move-light">
    <span class="tui-ico-next">next</span>
  </a>`;


  paginationMarkup += `<a href="#" class="tui-page-btn tui-last move-button pag-page-move-light">
    <span class="tui-ico-last">last</span>
  </a>`;

  paginationEl.innerHTML = paginationMarkup;
}

export { renderPagination };