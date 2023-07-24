const recipiesEl = document.querySelector('.popular-list');
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes/popular';

console.log(recipiesEl);
console.log(BASE_URL);

async function getRecipies() {
  try {
    let response = await fetch(BASE_URL);
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
  const markUp = recipesArr.map(({ title, description, preview, _id }) => {
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
  }).join('');

  recipiesEl.insertAdjacentHTML('beforeend', markUp);
}

getRecipies().then(renderCart);
