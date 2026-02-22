const foodGrid = document.getElementById("foodGrid");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const dietSelect = document.getElementById("diet");
const sortSelect = document.getElementById("sort");
const plateItems = document.getElementById("plateItems");
const totals = {
  calories: document.getElementById("totalCalories"),
  protein: document.getElementById("totalProtein"),
  carbs: document.getElementById("totalCarbs"),
  fat: document.getElementById("totalFat")
};
const cardTemplate = document.getElementById("foodCardTemplate");

const state = {
  foods: [],
  plate: []
};

const format = (value) => Number.parseFloat(value).toFixed(1);

function populateCategories(foods) {
  const categories = [...new Set(foods.map((food) => food.category))].sort();
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  }
}

function getFilteredFoods() {
  const term = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const diet = dietSelect.value;
  const sort = sortSelect.value;

  const filtered = state.foods.filter((food) => {
    const termMatch =
      food.name.toLowerCase().includes(term) ||
      food.category.toLowerCase().includes(term);
    const categoryMatch = category === "all" || food.category === category;
    const dietMatch = diet === "all" || food.diet === diet;
    return termMatch && categoryMatch && dietMatch;
  });

  filtered.sort((a, b) => {
    if (sort === "protein") return b.protein - a.protein;
    if (sort === "calories") return a.calories - b.calories;
    return a.name.localeCompare(b.name);
  });

  return filtered;
}

function renderFoodGrid() {
  const foods = getFilteredFoods();
  foodGrid.innerHTML = "";
  resultCount.textContent = `${foods.length} foods`;

  for (const food of foods) {
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector("h3").textContent = food.name;
    card.querySelector(
      ".meta"
    ).textContent = `${food.category} • ${food.diet} • ${food.serving}`;

    const macroList = card.querySelector(".macro-list");
    const macros = [
      ["Calories", `${food.calories} kcal`],
      ["Protein", `${format(food.protein)} g`],
      ["Carbs", `${format(food.carbs)} g`],
      ["Fat", `${format(food.fat)} g`]
    ];

    for (const [label, value] of macros) {
      const item = document.createElement("li");
      item.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      macroList.append(item);
    }

    card.querySelector(".add-btn").addEventListener("click", () => {
      state.plate.push(food);
      renderPlate();
    });

    foodGrid.append(card);
  }
}

function renderPlate() {
  plateItems.innerHTML = "";

  if (!state.plate.length) {
    plateItems.innerHTML = `<p class="muted">No food added yet.</p>`;
  }

  state.plate.forEach((food, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "plate-item";
    wrapper.innerHTML = `
      <p><strong>${food.name}</strong></p>
      <p class="muted">${food.calories} kcal | P ${format(food.protein)}g | C ${format(
      food.carbs
    )}g | F ${format(food.fat)}g</p>
      <button class="remove">Remove</button>
    `;

    wrapper.querySelector(".remove").addEventListener("click", () => {
      state.plate.splice(index, 1);
      renderPlate();
    });

    plateItems.append(wrapper);
  });

  const total = state.plate.reduce(
    (acc, food) => {
      acc.calories += food.calories;
      acc.protein += food.protein;
      acc.carbs += food.carbs;
      acc.fat += food.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  totals.calories.textContent = `${Math.round(total.calories)}`;
  totals.protein.textContent = `${format(total.protein)} g`;
  totals.carbs.textContent = `${format(total.carbs)} g`;
  totals.fat.textContent = `${format(total.fat)} g`;
}

async function init() {
  const response = await fetch("./data/indian_foods.json");
  state.foods = await response.json();
  populateCategories(state.foods);
  renderFoodGrid();
  renderPlate();
}

[searchInput, categorySelect, dietSelect, sortSelect].forEach((element) => {
  element.addEventListener("input", renderFoodGrid);
  element.addEventListener("change", renderFoodGrid);
});

init();
