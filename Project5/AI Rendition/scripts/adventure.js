const scenes = {
    start: {
        text: "The Wisp flickers. Destination: FREIGHTER, PLANET, or OUTPOST?",
        image: "styles/images/space2.jpg",
        color: "#ff9800"
    },
    freighter: {
        text: "You board the derelict. Do you hack the DOOR or enter the VENT?",
        image: "styles/images/freighter.jpg",
        color: "#757575"
    },
    planet: {
        text: "The ruins hum. Do you TOUCH the crystal or SCAN from the ship?",
        image: "styles/images/planet.jpg",
        color: "#00d4ff"
    },
    outpost: {
        text: "The station is grimy. Do you REFUEL or talk to the BARMAN?",
        image: "styles/images/outpost.jpg",
        color: "#902102"
    },
    win: {
        text: "Success! You found the coordinates. Type RESTART to play again.",
        image: "styles/images/victory.jpg",
        color: "#4CAF50"
    },
    loss: {
        text: "The mission failed. Type RESTART to try again.",
        image: "styles/images/gameover.jpg",
        color: "#f44336"
    }
};

let currentScene = "start";
let journeyHistory = [];

// FUNCTION 1: Takes parameters to update CSS
function applyTheme(color) {
    const wrapper = document.querySelector('.story-wrapper');
    wrapper.style.borderColor = color;
    wrapper.style.boxShadow = `0 8px 30px ${color}44`;
}

// FUNCTION 2: Returns a value (Sanitizing Input)
function cleanInput(str) {
    return str.trim().toLowerCase();
}

// FUNCTION 3: Uses a Loop (While loop for history)
function updateHistoryDisplay() {
    const list = document.getElementById("history-list");
    list.innerHTML = "";
    
    let i = 0;
    while (i < journeyHistory.length) {
        let entry = document.createElement("li");
        entry.textContent = `> ${journeyHistory[i]}`;
        list.appendChild(entry);
        i++;
    }
}

function processDecision() {
    const inputEl = document.getElementById("user-input");
    const choice = cleanInput(inputEl.value); // Use return function
    const feedback = document.getElementById("feedback");
    
    if (choice === "restart") {
        journeyHistory = [];
        currentScene = "start";
        renderScene("start");
        inputEl.value = "";
        return;
    }

    let next = "";

    // CONTROL STRUCTURE: Switch statement for 5+ decisions
    switch (currentScene) {
        case "start":
            if (choice.includes("freighter")) next = "freighter";
            else if (choice.includes("planet")) next = "planet";
            else if (choice.includes("outpost")) next = "outpost";
            break;
        case "freighter":
            if (choice.includes("door")) next = "win";
            else if (choice.includes("vent")) next = "loss";
            break;
        case "planet":
            if (choice.includes("touch")) next = "win";
            else if (choice.includes("scan")) next = "win";
            break;
        case "outpost":
            if (choice.includes("refuel")) next = "win";
            else if (choice.includes("barman")) next = "loss";
            break;
    }

    if (next) {
        journeyHistory.push(choice);
        currentScene = next;
        renderScene(next);
        feedback.textContent = "";
    } else {
        feedback.textContent = "Unknown command. Try a keyword from the text.";
    }
    
    inputEl.value = "";
}

function renderScene(key) {
    const scene = scenes[key];
    document.getElementById("story-text").textContent = scene.text;
    document.getElementById("scene-image").src = scene.image;
    
    applyTheme(scene.color); // Use parameter function
    updateHistoryDisplay(); // Use loop function
}

// Event Listener for the Enter Key
document.getElementById("user-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") processDecision();
});

// Initial Load
renderScene("start");