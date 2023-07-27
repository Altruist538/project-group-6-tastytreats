const responce = {
  page: 1,
  perPage: 6,
  totalPages: 48,
  results: [
    {
      _id: "6462a8f74c3d0ddd28897fb8",
      title: "Mediterranean Pasta Salad",
      category: "Seafood",
      area: "Italian",
      instructions:
        "Bring a large saucepan of salted water to the boil\r\nAdd the pasta, stir once and cook for about 10 minutes or as directed on the packet.\r\nMeanwhile, wash the tomatoes and cut into quarters. Slice the olives. Wash the basil.\r\nPut the tomatoes into a salad bowl and tear the basil leaves over them. Add a tablespoon of olive oil and mix.\r\nWhen the pasta is ready, drain into a colander and run cold water over it to cool it quickly.\r\nToss the pasta into the salad bowl with the tomatoes and basil.\r\nAdd the sliced olives, drained mozzarella balls, and chunks of tuna. Mix well and let the salad rest for at least half an hour to allow the flavours to mingle.\r\nSprinkle the pasta with a generous grind of black pepper and drizzle with the remaining olive oil just before serving.",
      description:
        "A salad made with pasta, vegetables (such as tomatoes, cucumbers, and olives), feta cheese, and a dressing made with olive oil and lemon juice.",
      thumb:
        "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg",
      preview:
        "https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560402/mwtf7uqrnsxvlpjqtslc.jpg",
      time: "27",
      youtube: "https://www.youtube.com/watch?v=e52IL8zYmaE",
      tags: ["Pasta", "Baking"],
      ingredients: [
        { id: "640c2dd963a319ea671e3724", measure: "200 g" },
        { id: "640c2dd963a319ea671e3663", measure: "250 g" },
        { id: "640c2dd963a319ea671e36dd", measure: "1  bunch" },
        { id: "640c2dd963a319ea671e36cf", measure: "350 g" },
        { id: "640c2dd963a319ea671e36cd", measure: "3  tablespoons" },
        { id: "640c2dd963a319ea671e36f3", measure: "40 g" },
        { id: "640c2dd963a319ea671e3781", measure: "200 g" },
        { id: "640c2dd963a319ea671e375e", measure: "to taste" },
        { id: "640c2dd963a319ea671e373f", measure: "to taste" },
      ],
      rating: 2.94,
    },
  ],
};

const results = responce.results;
console.log(results);

const ratingContainer = document.querySelector(".rating-container");
// console.log(ratingContainer);

const ratingValue = document.getElementById("rating-value");

// console.log(ratingValue);

results.forEach((item) => {
  const rating = item.rating;

  ratingValue.textContent = rating;

  const roundedRating = Math.round(rating);

  const stars = ratingContainer.querySelectorAll(".star"); // Отримуємо всі зірки з контейнера
  console.log(stars);

  stars.forEach((star, index) => {
    if (index < roundedRating) {
      star.classList.add("filled"); // Додаємо клас для заповнених зірок
    } else {
      star.classList.remove("filled"); // Видаляємо клас для заповнених зірок
    }
  });
});