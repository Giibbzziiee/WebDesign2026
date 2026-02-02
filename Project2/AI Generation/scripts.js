// MART 441 – Alternate Identity Page
// This script keeps the interaction opt-in, and uses the console as a "hidden layer".

console.log("%cLoaded: Ethan Gibson | Identity Page (Alternate)", "font-weight:bold; font-size: 14px;");
console.log("Tip: Click the 'Open the hidden layer' button to print the console content.");

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const consoleBtn = document.getElementById("consoleBtn");
if (consoleBtn) {
  consoleBtn.addEventListener("click", () => {
    printConsoleLayer();
    askOneQuestion();
  });
}

function printConsoleLayer() {
  console.clear();

  console.log("%c=== HIDDEN LAYER: CULTURE + INFLUENCE ===", "font-weight:bold; font-size: 14px;");
  console.log("");

  console.log("%cThree Websites (and why)", "font-weight:bold;");
  console.log("1) Bandcamp — direct artist support + discovery");
  console.log("2) Letterboxd — film rabbit holes and notes");
  console.log("3) Humble Bundle — games, charity, and finding weird gems");
  console.log("");

  console.log("%cThree Games (and what they taught me)", "font-weight:bold;");
  console.log("1) Silent Hill 2 — atmosphere is a weapon");
  console.log("2) God of War (2018) — story pacing + character weight");
  console.log("3) Tony Hawk’s Underground — style + movement + era");
  console.log("");

  console.log("%cThree Artists / Creators (cultural importance)", "font-weight:bold;");
  console.log("1) Trent Reznor & Atticus Ross — modern film scoring built from texture");
  console.log("2) Tyler Childers — authentic storytelling in modern country/folk");
  console.log("3) Hayao Miyazaki — animation as high art with emotional depth");
  console.log("");

  console.log("%c(You can edit these lists — the point is: console output + personal reasoning.)", "font-style: italic;");
  console.log("");
}

function askOneQuestion() {
  // Opt-in prompt so it doesn't fire on load.
  const answer = prompt("Quick question: what creative medium feels the most 'you' right now? (film, music, photography, games, etc.)");

  if (answer === null) {
    console.log("User skipped the question. Respect.");
    return;
  }

  const trimmed = answer.trim();
  console.log("%cYour answer:", "font-weight:bold;", trimmed.length ? trimmed : "(blank)");

  if (!trimmed.length) {
    console.log("Sometimes the answer is 'I don't know yet.' That's still an answer.");
  } else {
    console.log(`Nice. If you're into ${trimmed}, try making one small thing this week that only you would make.`);
  }

  console.log("%c=== END ===", "font-weight:bold;");
}
