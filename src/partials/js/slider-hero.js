import axios from 'axios';
import Swiper, { Pagination, Autoplay } from 'swiper';
import '../../../node_modules/swiper/swiper.css';
// import '../../../node_modules/swiper/modules/pagination/pagination-element.min.css';

const slider = document.querySelector('.slider');

async function fetchMasterClass() {
  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/events';
  const respons = await axios.get(BASE_URL);
  return respons.data();
}
createSlider();
async function createSlider() {
  try {
    const markUp = await sliderMark();
    await createEvent(markUp);
    const swiper = await new Swiper('.swiper', {
      modules: [Pagination, Autoplay],
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 6000,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function sliderMark(arrayEvents) {
  try {
    const events = await fetchMasterClass();
    return events.reduce((markUp, event) => {
      markUp + createMarkUP(event), '';
    });
  } catch (error) {
    console.log(error);
  }
}

function createMarkUP(event) {
  const { name, previewUrl, area } = event.topic;
  const cookName = event.cook.name;
  const cookimgUrl = event.cook.imgUrl;
  return `<div><img src="${cookimgUrl}" alt="${cookName}" loading="lazy"></div>
    <div><img src="${previewUrl}" alt="${name}" loading="lazy"><p>${name}</p><p>${area}</p></div>
   <div><img src="${previewUrl}" alt="${name}" loading="lazy"></div>
    `;
}

function createEvent(markUp) {
  slider.insertAdjacentHTML('beforeend', markUp);
}
