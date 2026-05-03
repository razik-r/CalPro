export function calculateTotals(mealItems, foodDB) {
  let totalCalories = 0;
  let totalProtein = 0;
  const breakdown = [];

  for (const [food, quantity] of Object.entries(mealItems)) {
    const details = foodDB[food];
    if (!details) continue;

    const calories = quantity * details.calories;
    const protein = quantity * details.protein;

    totalCalories += calories;
    totalProtein += protein;

    breakdown.push({
      food,
      quantity,
      calories,
      protein,
      unit: details.unit
    });
  }

  return { totalCalories, totalProtein, breakdown };
}

export function calculateDayTotal(mealsArray) {
  return mealsArray.reduce(
    (acc, meal) => {
      acc.totalCalories += meal.totalCalories;
      acc.totalProtein += meal.totalProtein;
      return acc;
    },
    { totalCalories: 0, totalProtein: 0 }
  );
}

export function suggestOptimization({ totalCalories, totalProtein }, targets = {}) {
  const suggestions = [];
  const calorieTarget = targets.calories;
  const proteinTarget = targets.protein;

  if (typeof calorieTarget === "number" && totalCalories > calorieTarget) {
    suggestions.push(`You are ${Math.round(totalCalories - calorieTarget)} kcal above your calorie target.`);
    suggestions.push("Tip: reducing 1 dosa can cut about 130 kcal.");
  }

  if (typeof proteinTarget === "number" && totalProtein < proteinTarget) {
    suggestions.push(`You are ${Math.round(proteinTarget - totalProtein)} g below your protein target.`);
    suggestions.push("Tip: adding 1 egg adds about 6 g protein.");
  }

  return suggestions;
}
