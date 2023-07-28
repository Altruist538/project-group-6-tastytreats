let $ = require('jquery');

function sliderStart() {
  $(document).ready(function () {
    $('.slider').slick({
      variableWidth: true,
      arrows: false,
      dots: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 4000,
    });
  });
}

const slider = document.querySelector('.slider');
// отримав інфу з бека
// let arrEvents = null;

async function fetchEvents() {
  let response = await fetch(
    'https://tasty-treats-backend.p.goit.global/api/events'
  );
  let arrEvents = await response.json();
  return arrEvents;
}

// розмітка слайдера

function sliderMarkUp(arrEvents) {
  const markUp = arrEvents
    .map(event => {
      return `<div class="slider-item-cook" >
      <img src="${event.cook.imgUrl}" loading="lazy" alt="${event.cook.name}">
      </div>
      
      <div class="slider-item-topic bcg">
        <img src="${event.topic.imgUrl}" loading="lazy" alt="${event.topic.name}">
        <p class="description">${event.topic.name}</p>
        <p class="country">${event.topic.area}</p>
      </div>
      
      <div class="slider-item-finally">
        <img src="${event.topic.imgUrl}" loading="lazy" alt="${event.topic.name}">
      </div>
    `;
    })
    .join('');
  slider.insertAdjacentHTML('beforeend', markUp);
}

// const data = await fetchEvents();
// sliderMarkUp(data);

async function data() {
  const data = await fetchEvents();
  sliderStart();
  sliderMarkUp(data);
}

slider && data();
