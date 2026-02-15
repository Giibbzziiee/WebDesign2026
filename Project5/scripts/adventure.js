// PLAYER STATE
let playerState = {
  name: "Captain",
  inventory: [],
  credits: 100,
  reputation: 0,
  pipTrust: 5,
  lastInput: ""
};

// SCENES
const scenes = {
  nameEntry: {
    text: "Before we begin, what's your name, pilot?",
    image: "styles/images/space2.jpg",
    inputType: "text",
    inputPrompt: "Enter your pilot name:",
    inputPlaceholder: "Your name",
    choices: [
      { text: "Begin your journey", next: "start", requiresInput: true }
    ]
  },

  start: {
    text: () => `Welcome aboard, Captain ${playerState.name}. The nav-suite flickers in the dim cockpit of the Wisp. Three destinations pulse on the star chart: a derelict freighter broadcasting a faint distress ping, a shimmering blue-green world marked 'Unsurveyed – Anomalous Energy', and a distant mining outpost advertising 'Last Fuel for 40 light-years'. Pip the ferret chitters on your shoulder, batting at the holographic waypoint for the blue planet like it's a toy. You have ${playerState.credits} credits and fuel's running low. Where to?`,
    image: "styles/images/space2.jpg",
    choices: [
      { text: "Investigate the derelict freighter – could be salvage or trouble", next: "derelict" },
      { text: "Head to the anomalous planet – curiosity over caution", next: "planet" },
      { text: "Play it safe and make for the outpost – refuel first", next: "outpost" },
      { text: "Check your inventory and ship status", next: "inventory" }
    ]
  },

  inventory: {
    text: () => `Ship Status:\n━━━━━━━━━━━━━━━━\nPilot: ${playerState.name}\nCredits: ${playerState.credits}\nReputation: ${playerState.reputation}\nPip's Trust Level: ${playerState.pipTrust}/10\n\nInventory: ${playerState.inventory.length > 0 ? playerState.inventory.join(', ') : 'Empty (just Pip and determination)'}\n\nPip looks at you expectantly, tail swishing.`,
    image: "styles/images/space2.jpg",
    choices: [
      { text: "Return to navigation", next: "start" }
    ]
  },

  derelict: {
    text: `You dock with the silent freighter. Inside, corridors are dark except for emergency strips casting an eerie red glow. Pip squeaks nervously, his claws digging slightly into your shoulder. You find a locked cargo bay door with a flickering terminal beside it. The screen reads: 'SECURITY OVERRIDE REQUIRED - Enter Authorization Code'. Pip is eyeing a loose panel that looks like it might lead to the ventilation system. What's your play, Captain?`,
    image: "styles/images/space2.jpg",
    choices: [
      { text: "Hack the terminal – see what's inside the cargo", next: "hackAttempt" },
      { text: "Let Pip investigate the vents – ferrets are small and sneaky", next: "vents" },
      { text: "Search the nearby rooms for clues", next: "searchRooms" }
    ]
  },

  hackAttempt: {
    text: "The terminal's keypad glows softly. You could try a standard override code, or attempt a more sophisticated hack. Pip tilts his head, watching curiously. What's your approach?",
    inputType: "text",
    inputPrompt: "Enter your hack attempt (try a code or command):",
    inputPlaceholder: "Type your attempt...",
    choices: [
      { text: "Submit your hack", next: "hackResult", requiresInput: true },
      { text: "Abandon the hack and try something else", next: "derelict" }
    ]
  },

  hackResult: {
    text: () => {
      const input = (playerState.lastInput || "").trim();
      let result = `You type: "${input}"\n\nThe terminal processes... `;

      const lower = input.toLowerCase();
      if (lower.includes('admin') || lower.includes('override') || lower.includes('1234')) {
        if (!playerState.inventory.includes('Exotic Crystal')) playerState.inventory.push('Exotic Crystal');
        playerState.credits += 50;
        result += "SUCCESS! The door hisses open. Inside, you find crates of exotic crystals humming with energy. You grab a sample. Pip does a little victory dance. +1 Exotic Crystal, +50 Credits!";
      } else if (lower.includes('pip') || lower.includes('ferret')) {
        playerState.pipTrust += 2;
        result += "The terminal beeps: 'INVALID CODE - But I respect the ferret reference.' A hidden compartment opens with some bonus supplies. Pip seems pleased. +2 Pip Trust!";
      } else {
        result += "DENIED. Alarms blare! You need to move fast!";
      }
      return result;
    },
    choices: [
      { 
        text: () => playerState.inventory.includes('Exotic Crystal') ? "Take your prize and leave" : "Run back to the ship!",
        next: () => playerState.inventory.includes('Exotic Crystal') ? "crystalEscape" : "alarmedEscape"
      }
    ]
  },

  crystalEscape: {
    text: "You sprint back to the Wisp with Pip clinging to your jacket. The crystal pulses in your pack – it's worth a fortune. As you undock, you see automated defense turrets powering up. That was close. THE END (Wealthy... or cursed by mysterious cargo?).",
    choices: [{ text: "Start a new adventure", next: "nameEntry" }]
  },

  alarmedEscape: {
    text: "Red lights flash as you bolt back to your ship. Pip leads the way, somehow knowing the fastest route. You barely make it to the Wisp before blast doors seal behind you. No loot, but you're alive. Pip gets extra treats for the quick thinking. THE END (Survived, barely).",
    choices: [{ text: "Try again with a new approach", next: "nameEntry" }]
  },

  searchRooms: {
    text: "You search nearby crew quarters. Most are empty, but in one you find a datapad with a sticky note: 'Auth Code: ADM1N-P1P'. Pip sniffs the datapad and chitters approvingly. Also, there's a half-eaten protein bar. Pip wants it. Do you share?",
    choices: [
      { text: "Share the protein bar with Pip (gain trust)", next: "shareWithPip" },
      { text: "Save it for yourself (keep supplies)", next: "keepBar" },
      { text: "Use the code you found on the terminal", next: "useFoundCode" }
    ]
  },

  shareWithPip: {
    text: () => {
      playerState.pipTrust += 3;
      return `You break the bar in half and give Pip the bigger piece. He chirps happily and nuzzles your hand. You feel closer to your little copilot. +3 Pip Trust! (Now at ${playerState.pipTrust}/10)\n\nNow, what about that code?`;
    },
    choices: [
      { text: "Go back and use the code on the terminal", next: "useFoundCode" },
      { text: "Forget the code, have Pip explore the vents", next: "vents" }
    ]
  },

  keepBar: {
    text: "Pip looks disappointed as you pocket the bar. His ears droop slightly. Sometimes survival means tough choices. You now have the code though.",
    choices: [{ text: "Use the code on the terminal", next: "useFoundCode" }]
  },

  useFoundCode: {
    text: () => {
      playerState.inventory.push('Exotic Crystal');
      playerState.inventory.push('Freighter Manifest');
      playerState.credits += 75;
      return `You enter 'ADM1N-P1P' into the terminal. It chirps happily and the cargo bay door slides open with a smooth hiss. Inside: crates of glowing exotic crystals AND a data manifest showing their destinations. This could be very valuable to the right buyer. Pip seems proud of finding that note. +1 Exotic Crystal, +1 Freighter Manifest, +75 Credits!`;
    },
    choices: [{ text: "Take your haul and leave before security responds", next: "cleanGetaway" }]
  },

  cleanGetaway: {
    text: "You make a clean escape with valuable cargo and intel. Pip rides on your shoulder like a victorious pirate's parrot. This is the kind of score that could set you up for a while. THE END (Professional Salvager).",
    choices: [{ text: "Chart a new course", next: "nameEntry" }]
  },

  vents: {
    text: "Pip slips into the vents with practiced ease. You hear skittering, then silence... then more skittering. After a tense minute, Pip emerges dragging a data chip in his teeth, looking incredibly pleased with himself. The chip contains coordinates to a hidden supply cache nearby. What do you do?",
    choices: [
      { text: "Check the coordinates and investigate the cache", next: "hiddenCache" },
      { text: "Leave immediately before something goes wrong", next: "ventEscape" }
    ]
  },

  hiddenCache: {
    text: () => {
      playerState.inventory.push('Med Kit');
      playerState.inventory.push('Fuel Cell');
      playerState.credits += 30;
      playerState.pipTrust += 2;
      return `Following Pip's coordinates, you find a hidden compartment with emergency supplies: a med kit and a fuel cell. Score! Pip gets extra treats and head scratches. +1 Med Kit, +1 Fuel Cell, +30 Credits, +2 Pip Trust!`;
    },
    choices: [{ text: "Leave before the freighter's auto-destruct activates", next: "ventEscape" }]
  },

  ventEscape: {
    text: "You escape just as the freighter's self-destruct sequence counts down behind you. Pip curls up in your lap as you jump to safety, purring contentedly. Solid loot, zero casualties. THE END (Clever Ferret Wins).",
    choices: [{ text: "Chart a new course", next: "nameEntry" }]
  },

  planet: {
    text: `You descend through swirling mists to land on the anomalous world. Ancient ruins rise from the fog – towering spires with glowing blue crystals embedded in weathered stone. The air hums with energy. Pip is mesmerized, his whiskers twitching. He paws at one of the crystals gently. A low harmonic hum builds in the air around you. This place feels... alive. What's your approach?`,
    choices: [
      { text: "Touch the crystal – see what happens", next: "touchCrystal" },
      { text: "Scan safely from the ship – no risks", next: "scan" },
      { text: "Explore the ruins on foot first", next: "exploreRuins" }
    ]
  },

  exploreRuins: {
    text: "You walk deeper into the ruins, Pip trotting alongside you. You find ancient inscriptions on the walls. They seem to be telling a story... or maybe instructions? There's a gap in the text. How would you describe your purpose here?",
    inputType: "text",
    inputPrompt: "What is your purpose as a pilot? (Be creative!):",
    inputPlaceholder: "Type your answer...",
    choices: [
      { text: "Inscribe your answer", next: "inscriptionResult", requiresInput: true },
      { text: "Leave the inscription alone", next: "scan" }
    ]
  },

  inscriptionResult: {
    text: () => {
      const purpose = playerState.lastInput || "a curious explorer";
      playerState.reputation += 3;
      return `You trace your answer into the ancient stone: "${purpose}"\n\nThe inscription glows briefly, then pulses with warm light. Pip chirps excitedly. You feel... acknowledged. Like the ruins recognize your intent. The crystals around you glow brighter, as if responding to your honesty. +3 Reputation with Ancient Civilizations!`;
    },
    choices: [
      { text: "Now touch one of the glowing crystals", next: "touchCrystal" },
      { text: "Take a sample and leave respectfully", next: "respectfulScan" }
    ]
  },

  touchCrystal: {
    text: () => {
      playerState.inventory.push('Star Map Fragment');
      playerState.reputation += 5;
      return `The crystal flares with brilliant light. Visions flood your mind: ancient star maps, forgotten civilizations, wars fought across galaxies, and... a path. A path home, or perhaps to something greater. Pip nuzzles your hand calmly, as if he can see the visions too. You feel fundamentally changed. When you come back to yourself, you have knowledge of jump coordinates to uncharted space. +1 Star Map Fragment, +5 Reputation. EPIC DISCOVERY.`;
    },
    choices: [
      { text: "Follow the new coordinates", next: "newFrontier" },
      { text: "Return to known space with your discovery", next: "touchEnd" }
    ]
  },

  newFrontier: {
    text: "Using your newly acquired star map, you jump into uncharted space. The stars here are different – older, stranger. Pip seems excited. This is the beginning of a much longer adventure... THE END (Or is it just the beginning?).",
    choices: [{ text: "Begin a new journey", next: "nameEntry" }]
  },

  touchEnd: {
    text: "You return to known space with your discovery. The star map fragment will change navigation forever. Pip seems proud to have been part of this discovery. THE END (Legendary Explorer).",
    choices: [{ text: "Start a new adventure", next: "nameEntry" }]
  },

  respectfulScan: {
    text: () => {
      playerState.inventory.push('Crystal Sample');
      playerState.reputation += 2;
      return `You carefully collect a small crystal sample without disturbing the site. Pip watches approvingly. As you leave, you swear the ruins pulse with a grateful light. +1 Crystal Sample, +2 Reputation.`;
    },
    choices: [{ text: "Return to your ship", next: "scan" }]
  },

  scan: {
    text: () => {
      if (!playerState.inventory.includes('Crystal Sample') && !playerState.inventory.includes('Scan Data')) {
        playerState.inventory.push('Scan Data');
      }
      return `Safe scan reveals the crystals are a natural energy source, possibly ancient technology. ${playerState.inventory.includes('Crystal Sample') ? 'Combined with your sample,' : ''} The data alone is valuable to researchers. Pip seems slightly disappointed but curls up for a nap in the ship. Scientific win. THE END (Cautious Scholar).`;
    },
    choices: [{ text: "Chart a new course", next: "nameEntry" }]
  },

  outpost: {
    text: "You dock at the grimy frontier outpost. The place smells of engine grease and recycled air. You refuel (−30 credits) and head to the cantina. The bartender, a grizzled veteran, mentions rumors of pirate activity on the route you almost took. 'Good timing,' she says. Pip steals a shiny bottle cap from the counter when no one's looking. What now?",
    choices: [
      { text: "Ask the bartender about local opportunities", next: "cantinaTalk" },
      { text: "Check the job board for work", next: "jobBoard" },
      { text: "Play it safe and head out", next: "safeOutpostEnd" }
    ]
  },

  cantinaTalk: {
    text: "The bartender leans in. 'You looking for work? There's a merchant convoy that needs escorts through the Belt. Pays well, but pirates have been active.' She slides you a data chip. 'Or, there's a researcher who needs rare samples from asteroid clusters. Less danger, decent pay.' What interests you?",
    choices: [
      { text: "Take the convoy escort job (risky, high pay)", next: "convoyJob" },
      { text: "Take the research collection job (safer, moderate pay)", next: "researchJob" },
      { text: "Decline both and move on", next: "safeOutpostEnd" }
    ]
  },

  convoyJob: {
    text: "You accept the convoy job. As you escort three merchant ships through the asteroid belt, sensors ping: three bogeys incoming fast. Pirates. Pip's eyes go wide. Time to decide: fight or flight?",
    choices: [
      { text: "Stand and fight – protect the convoy", next: "fightPirates" },
      { text: "Execute evasive maneuvers", next: "evadePirates" }
    ]
  },

  fightPirates: {
    text: () => {
      playerState.credits += 150;
      playerState.reputation += 4;
      return `You engage the pirates head-on. The dogfight is intense – Pip hangs on tight as you execute barrel rolls and precision shots. You disable two pirate fighters; the third retreats. The convoy is safe. The merchants pay you handsomely and spread word of your bravery. +150 Credits, +4 Reputation. THE END (Convoy Hero).`;
    },
    choices: [{ text: "Start fresh", next: "nameEntry" }]
  },

  evadePirates: {
    text: () => {
      playerState.credits += 80;
      return `You thread through the asteroids with expert precision. Pip seems to enjoy the wild ride. The pirates can't keep up with your maneuvers in the dense field. Convoy delivered safely, though the pay is slightly reduced for the 'unconventional' protection method. +80 Credits. THE END (Ace Pilot).`;
    },
    choices: [{ text: "Chart a new course", next: "nameEntry" }]
  },

  researchJob: {
    text: "You collect crystallized mineral samples from asteroid clusters. It's peaceful work, and Pip enjoys floating in zero-G, spinning like a fuzzy little planet. The researcher is thrilled with your samples. Easy money.",
    choices: [{ text: "Collect your payment and rest", next: "researchEnd" }]
  },

  researchEnd: {
    text: () => {
      playerState.credits += 60;
      return `Job complete. +60 Credits. You and Pip find a quiet station to rest. Sometimes the quiet jobs are the best ones. THE END (Honest Work).`;
    },
    choices: [{ text: "Begin anew", next: "nameEntry" }]
  },

  jobBoard: {
    text: "The digital job board flickers with various postings. Most are routine cargo hauls, but one catches your eye: 'URGENT: Retrieve lost probe from unstable planet. Danger pay included.' How much danger are you willing to risk?",
    inputType: "text",
    inputPrompt: "On a scale of 1-10, how much danger are you willing to risk?",
    inputPlaceholder: "Enter a number...",
    choices: [
      { text: "Assess your risk tolerance", next: "riskAssessment", requiresInput: true }
    ]
  },

  riskAssessment: {
    text: () => {
      const risk = parseInt(playerState.lastInput) || 5;
      if (risk >= 8) {
        return `Risk level ${risk}/10? You're bold. You take the dangerous probe mission. The unstable planet's atmosphere is brutal, storms raging. But you and Pip make the retrieval and earn a massive payday. BRAVE ENDING.`;
      } else if (risk >= 4) {
        return `Risk level ${risk}/10. Moderate. You take a standard cargo job instead. Solid, reliable work. Pip approves of the measured approach. BALANCED ENDING.`;
      } else {
        return `Risk level ${risk}/10. Playing it safe. You take a simple station-to-station delivery. Nothing exciting, but nothing dangerous either. Pip yawns. SAFE ENDING.`;
      }
    },
    choices: [{ text: "Reflect on your choices", next: "safeOutpostEnd" }]
  },

  safeOutpostEnd: {
    text: "You leave the outpost with full fuel tanks and a quiet conscience. Pip sits in your lap as you plot a course to the next system. The galaxy is full of possibilities. Safe travels ahead. Boring but alive. THE END (Cautious Survivor).",
    choices: [{ text: "Chart a new course", next: "nameEntry" }]
  }
};

// DOM ELEMENTS 
const storyTextEl = document.getElementById("story-text");
const imageEl = document.getElementById("scene-image");
const choicesArea = document.getElementById("choices-area");
let currentScene = "nameEntry";

// MAIN SCENE RENDERER 
function showScene(key) {
  const scene = scenes[key];
  if (!scene) return;

  currentScene = key;

  // Dynamic text
  const displayText = typeof scene.text === 'function' ? scene.text() : scene.text;
  storyTextEl.textContent = displayText;

  // Image
  if (scene.image) {
    imageEl.src = scene.image;
    imageEl.style.display = "block";
  } else {
    imageEl.style.display = "none";
  }

  // Clear choices
  choicesArea.innerHTML = "";

  // Text input field
  if (scene.inputType === "text") {
    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    const label = document.createElement("label");
    label.textContent = scene.inputPrompt || "Your input:";
    label.className = "input-label";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "text-input";
    input.placeholder = scene.inputPlaceholder || "Type here...";
    input.id = "scene-input";

    inputGroup.appendChild(label);
    inputGroup.appendChild(input);
    choicesArea.appendChild(inputGroup);

    setTimeout(() => input.focus(), 50);
  }

  // Choice buttons
  scene.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";

    btn.textContent = typeof choice.text === 'function' ? choice.text() : choice.text;

    btn.onclick = () => {
      if (choice.requiresInput) {
        const input = document.getElementById("scene-input");
        if (input) {
          const value = input.value.trim();
          if (!value) {
            alert("Please enter something first!");
            return;
          }
          if (currentScene === "nameEntry") {
            playerState.name = value;
          } else {
            playerState.lastInput = value;
          }
        }
      }

      const nextScene = typeof choice.next === 'function' ? choice.next() : choice.next;
      showScene(nextScene);
    };

    choicesArea.appendChild(btn);
  });

  // Auto-restart button for endings
  if (scene.choices.length === 0) {
    const restart = document.createElement("button");
    restart.className = "choice-btn restart-btn";
    restart.textContent = "Chart a New Course?";
    restart.onclick = () => {
      playerState = { name: "Captain", inventory: [], credits: 100, reputation: 0, pipTrust: 5, lastInput: "" };
      showScene("nameEntry");
    };
    choicesArea.appendChild(restart);
  }

  console.log(`Scene: ${currentScene} | Credits: ${playerState.credits} | Inventory: ${playerState.inventory.length}`);
}

// KEYBOARD SUPPORT
document.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const input = document.getElementById('scene-input');
    if (input && document.activeElement === input) {
      const buttons = document.querySelectorAll('.choice-btn');
      const submitBtn = Array.from(buttons).find(btn =>
        btn.textContent.includes('Begin') ||
        btn.textContent.includes('Submit') ||
        btn.textContent.includes('Inscribe') ||
        btn.textContent.includes('Assess')
      );
      if (submitBtn) submitBtn.click();
    }
  }
});

// F*** me JavaScript is insane. After like 12 hours I finally got all this to work how I wanted. I rewrote this like 3 times if not more.
// I'm not actually certain I did this assignment quite how I was supposed to, but I want to work on this a bit more. This story is turning pretty fun.

// START 
showScene("nameEntry");