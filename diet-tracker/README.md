# Smart Diet Tracker

A lightweight, personalized calorie + protein tracker for repetitive meal habits.

## Features
- Predefined food database in `data/foods.json`
- Fast meal input (`3 dosa + 2 eggs`, `200g rice + 50g fish`)
- Automatic total calories and protein calculation
- Optional calorie/protein targets with simple suggestions

## Run
Open `ui/index.html` in a browser.

## Structure
- `src/parser.js` parses human-friendly input
- `src/calculator.js` computes meal and daily totals
- `src/app.js` glues UI with parser and calculator
