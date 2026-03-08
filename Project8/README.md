# Project 8 — Assignment Writeup
**Ethan Gibson | MART 441**

---

## What This Page Is

Social Views is a required assignment for MART 441 built as part of the Gibson Media portfolio site. The assignment called for a ViewMaster-style image viewer presenting photojournalism images alongside written personal commentary on social justice topics. I chose to focus on criminal justice reform, labor rights, and anti-war/peace, and selected five real protest photographs to represent those themes.

---

## How It Was Built

The page is split across three files: `socialviews.html`, `styles/socialviews.css`, and `scripts/socialviews.js`. It inherits the site-wide nav, fonts, and base styles from `styles/styles.css`.

The viewer is driven entirely by JavaScript. Each slide is an instance of a `Slide` class with six properties: title, image, description, author, year, and theme. The five slides are stored in an array and cycled using a Fisher-Yates shuffle queue, which ensures all five appear before any repeats. Transitions use a CSS opacity fade triggered by toggling a `.fading` class on the image and info block.

The written views and photo sources sections below the viewer are static HTML. A separate navigation script is included inline rather than loading `scripts.js`, since that file triggers a `prompt()` call that only belongs on the index page.

---

## Photo Credits

| Image | Photographer | Source |
|---|---|---|
| Justice for George Floyd, Minneapolis (2020) | Kerem Yucel / AFP via Getty Images | Al Jazeera |
| Parole Justice Rally, NYC (approx. 2021) | Via 19th News | 19thnews.org |
| Support Amazon Workers Rally, NYC (2021) | Erik McGregor / LightRocket via Getty Images | erikmcgregor.com |
| UPS Teamsters Practice Picket (2023) | Chris Otts / WDRB News | WDRB News |
| National March for Palestine, London (2023) | Hollie Adams / Reuters | Al Jazeera |
