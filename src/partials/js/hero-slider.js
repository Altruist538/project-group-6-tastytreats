const slider = document.querySelector('.slider');
// отримав інфу з бека
let arrEvents = null;

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
      return `<div><img src="${event.cook.imgUrl}" alt="${event.cook.name}" loading="lazy"></div>
    <div><img src="${event.topic.previewUrl}" alt="${event.topic.name}" loading="lazy"><p>${event.topic.name}</p><p>${event.topic.area}</p></div>
   <div><img src="${event.topic.imgUrl}" alt="${event.topic.name}" loading="lazy"></div>
    `;
    })
    .join('');
  slider.insertAdjacentHTML('beforeend', markUp);
}

// const data = await fetchEvents();
// sliderMarkUp(data);

async function data() {
  const data = await fetchEvents();

  sliderMarkUp(data);
}

data();
