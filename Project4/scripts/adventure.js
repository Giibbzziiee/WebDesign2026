const scenes = {
  start: {
    text: "The nav-suite flickers in the dim cockpit of the Wisp. Three destinations pulse on the star chart: a derelict freighter broadcasting a faint distress ping, a shimmering blue-green world marked 'Unsurveyed – Anomalous Energy', and a distant mining outpost advertising 'Last Fuel for 40 light-years'. Pip the ferret chitters on your shoulder, batting at the holographic waypoint for the blue planet like it's a toy. Fuel's low. Where to?",
    image: "styles/images/space2.jpg",  
    choices: [
      { text: "Investigate the derelict freighter – could be salvage or trouble", next: "derelict" },
      { text: "Head to the anomalous planet – curiosity over caution", next: "planet" },
      { text: "Play it safe and make for the outpost – refuel first", next: "outpost" }
    ]
  },

  derelict: {
    text: "You dock with the silent freighter. Inside, corridors are dark except for emergency strips. Pip squeaks nervously. You find a locked cargo bay door and a flickering terminal. Pip is eyeing a loose panel that looks like it might lead to vents. What now?",
    choices: [
      { text: "Hack the terminal – see what's inside the cargo", next: "hack" },
      { text: "Let Pip investigate the vents – ferrets are small and sneaky", next: "vents" }
    ]
  },

  hack: {
    text: "The terminal unlocks with a hiss. Cargo manifest: 'Exotic crystals – high energy yield'. But alarms blare – automated defenses activate! You grab a single glowing crystal sample and run back to the Wisp with Pip clinging to your jacket. +1 mysterious crystal. THE END (wealthy... or cursed?).",
    choices: []
  },

  vents: {
    text: "Pip slips into the vents and returns dragging a data chip. It contains coordinates to a hidden cache. You escape just as the freighter's self-destruct counts down. Pip gets extra treats. Solid loot. THE END (clever ferret wins).",
    choices: []
  },

  planet: {
    text: "You land on the misty world. Ruins rise from the fog – ancient spires with glowing blue crystals embedded in stone. Pip is mesmerized, pawing at one. A low hum builds. Do you touch a crystal or scan from afar?",
    choices: [
      { text: "Touch the crystal – see what happens", next: "touch" },
      { text: "Scan safely from the ship – no risks", next: "scan" }
    ]
  },

  touch: {
    text: "The crystal flares. Visions flood your mind: star maps, forgotten wars, a path home. Pip nuzzles your hand calmly. You feel... changed. New jump coordinates unlocked. Epic discovery. WIN. THE END.",
    choices: []
  },

  scan: {
    text: "Safe scan reveals the crystals are a natural energy source. You collect samples without disturbing the site. Pip seems disappointed but curls up for a nap. Scientific win. THE END.",
    choices: []
  },

  outpost: {
    text: "You dock at the grimy outpost. Fuel refilled, but the bartender mentions rumors of a pirate ambush on the route you almost took. Pip steals a shiny bottle cap. Safe travels ahead. Boring but alive. THE END.",
    choices: []
  }
};

let currentScene = "start";

const storyTextEl = document.getElementById("story-text");
const imageEl = document.getElementById("scene-image");
const choicesArea = document.getElementById("choices-area");

function showScene(key) {
  const scene = scenes[key];
  if (!scene) return;

  currentScene = key;

  storyTextEl.textContent = scene.text;

  if (scene.image && scene.image.trim() !== "") {
    imageEl.src = scene.image;
    imageEl.style.display = "block";
  } else {
    imageEl.style.display = "none";
  }

  choicesArea.innerHTML = "";

  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice.text;
    btn.onclick = () => showScene(choice.next);
    choicesArea.appendChild(btn);
  });

  if (scene.choices.length === 0) {
    const restart = document.createElement("button");
    restart.className = "choice-btn restart-btn";
    restart.textContent = "Chart a New Course?";
    restart.onclick = () => showScene("start");
    choicesArea.appendChild(restart);
  }

  console.log("Scene: " + currentScene + " (" + (scene.text ? scene.text.length : 0) + " chars)");
}

showScene("start");