import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

function resizeVisPage() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    return 2;
  }

  if (screenWidth >= 768) {
    return 3;
  }
}

function startPagination(page, perPage, totalPages, callback) {
  const options = {
    totalItems: Number(perPage) * Number(totalPages),
    itemsPerPage: Number(perPage),
    visiblePages: resizeVisPage(),
    page: Number(page),
    centerAlign: false,
    omitMiddlePages: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn pag-page">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} move-button">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} prev-button">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip more-button">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };

  const pagination = new Pagination('pagination', options);

  pagination.on('beforeMove', ({ page }) => {
    console.log('beforeMove: Перехід на сторінку ' + page);
  });

  pagination.on('afterMove', ({ page }) => {
    callback(page);
  });
}

export default startPagination;
