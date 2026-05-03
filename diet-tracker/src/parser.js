export function parseMealInput(input, foodDB = {}) {
  const mealTotals = {};
  const unknownItems = [];

  const normalized = input
    .toLowerCase()
    .replace(/\band\b/g, "+")
    .replace(/[\n,]/g, "+")
    .trim();

  const parts = normalized
    .split("+")
    .map((part) => part.trim())
    .filter(Boolean);

  for (const part of parts) {
    const match = part.match(/^(\d+(?:\.\d+)?)\s*(g|ml)?\s*([a-z_ ]+)$/i);
    if (!match) {
      unknownItems.push(part);
      continue;
    }

    const quantity = Number(match[1]);
    const unitToken = match[2] ? match[2].toLowerCase() : "";
    const rawName = match[3].trim().replace(/\s+/g, "_");

    let foodName = rawName;
    if (foodName.endsWith("s") && !foodDB[foodName] && foodDB[foodName.slice(0, -1)]) {
      foodName = foodName.slice(0, -1);
    }

    if (!foodDB[foodName]) {
      unknownItems.push(part);
      continue;
    }

    const dbUnit = foodDB[foodName].unit.toLowerCase();
    const expectsMl = dbUnit.includes("ml");
    const expectsGram = dbUnit.includes("1g") || dbUnit.includes("1 g");

    if (unitToken === "ml" && !expectsMl) {
      unknownItems.push(`${part} (unit mismatch)`);
      continue;
    }

    if (unitToken === "g" && !expectsGram) {
      unknownItems.push(`${part} (unit mismatch)`);
      continue;
    }

    mealTotals[foodName] = (mealTotals[foodName] || 0) + quantity;
  }

  return { items: mealTotals, unknownItems };
}
