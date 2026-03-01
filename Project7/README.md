# Memory Game — MART 441
### Ethan Gibson

## What This Is
A three-page memory matching game built as part of a web development assignment. The project focuses on connecting multiple pages together using `localStorage` and `JSON` to pass player data between screens.

## How It Works
1. **Setup** — Enter your name and age. The info is stored as a JSON object in `localStorage`.
2. **Game** — Match all six pairs of cards. Every second card flip counts as an attempt. When you finish, your attempt count is saved and a prompt asks if you're ready to see your results.
3. **Results** — Your name, age, and total attempts are pulled from `localStorage` and displayed on the finale page.

## What I Learned
This assignment pushed me to think about how to share information across pages without a backend. Using `JSON.stringify()` and `JSON.parse()` with `localStorage` made that click in a pretty natural way. I also got more comfortable keeping HTML, CSS, and JavaScript in separate files and writing JS that only runs when the right page elements are actually present.
