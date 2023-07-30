import axios from 'axios';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { getRecipeMarkup, fetchImages } from './pictures_backend';

const container = document.getElementById('tui-pagination-container');
const URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

const windowWidth = document.documentElement.clientWidth;
if (windowWidth < 768) {
  visiblePages = 2;
  limitCount = 6;
} else if (windowWidth > 768 && windowWidth < 1280) {
  visiblePages = 3;
  limitCount = 8;
} else if (windowWidth > 1280) {
  visiblePages = 3;
  limitCount = 9;
}

export async function usePagination(url, params) {
  let response = await axios.get(URL);
  const { page, perPage, totalPages } = response.data;
  const options = {
    totalItems: perPage * totalPages,
    itemsPerPage: perPage,
    visiblePages: visiblePages,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
  const paginationP = new Pagination(container, options);

  paginationP.getCurrentPage();
  paginationP.on('afterMove', event => {
    const currentPage = event.page;
    fetchImages(url, { ...params, page: currentPage, limit: limitCount });
  });
}

usePagination(URL);
