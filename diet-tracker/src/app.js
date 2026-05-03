import { parseMealInput } from "./parser.js";
import { calculateTotals, calculateDayTotal, suggestOptimization } from "./calculator.js";

async function init() {
  const response = await fetch("../data/foods.json");
  const foodDB = await response.json();

  const mealsContainer = document.getElementById("meals");
  const addMealButton = document.getElementById("add-meal");
  const calculateButton = document.getElementById("calculate");
  const results = document.getElementById("results");
  const foodList = document.getElementById("food-list");

  foodList.textContent = Object.entries(foodDB)
    .map(([name, info]) => `${name} (${info.unit})`)
    .join(", ");

  function createMealInput(name = "Meal") {
    const wrapper = document.createElement("div");
    wrapper.className = "meal-block";
    wrapper.innerHTML = `
      <label>${name}</label>
      <input type="text" placeholder="e.g. 3 dosa + 2 eggs" class="meal-input" />
    `;
    mealsContainer.appendChild(wrapper);
  }

  createMealInput("Breakfast");
  createMealInput("Lunch");
  createMealInput("Dinner");

  addMealButton.addEventListener("click", () => {
    createMealInput(`Meal ${mealsContainer.children.length + 1}`);
  });

  calculateButton.addEventListener("click", () => {
    const mealInputs = [...document.querySelectorAll(".meal-input")]
      .map((input) => input.value.trim())
      .filter(Boolean);

    const mealResults = [];
    const unknowns = [];

    for (const text of mealInputs) {
      const parsed = parseMealInput(text, foodDB);
      if (parsed.unknownItems.length > 0) unknowns.push(...parsed.unknownItems);
      mealResults.push(calculateTotals(parsed.items, foodDB));
    }

    const dayTotals = calculateDayTotal(mealResults);
    const suggestions = suggestOptimization(dayTotals, {
      calories: Number(document.getElementById("calorie-target").value) || undefined,
      protein: Number(document.getElementById("protein-target").value) || undefined
    });

    results.innerHTML = `
      <h3>Daily Summary</h3>
      <p><strong>Total Calories:</strong> ${dayTotals.totalCalories.toFixed(0)} kcal</p>
      <p><strong>Total Protein:</strong> ${dayTotals.totalProtein.toFixed(1)} g</p>
      ${unknowns.length ? `<p class="warning"><strong>Unrecognized entries:</strong> ${unknowns.join(", ")}</p>` : ""}
      ${suggestions.length ? `<h4>Suggestions</h4><ul>${suggestions.map((s) => `<li>${s}</li>`).join("")}</ul>` : ""}
    `;
  });
}

init();
