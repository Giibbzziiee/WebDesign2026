// VARIABLES to track state
let credits = 10;
let hasPackage = true;
let reputation = "Unknown";

// DOM Elements
const storyText = document.getElementById('story-text');
const choiceContainer = document.getElementById('choices');
const sceneImg = document.getElementById('scene-img');
const statusBar = document.getElementById('status-bar');

// INITIAL FUNCTION to start game
function startGame() {
    updateStatus();
    showScene('start');
}

// FUNCTION to update the top status bar (Concatenation)
function updateStatus() {
    statusBar.innerText = "Credits: " + credits + " | Rep: " + reputation;
}

// MAIN LOGIC: Handles scene transitions
function showScene(sceneName) {
    // Clear previous choices
    choiceContainer.innerHTML = "";

    // Variable to hold the text for the current scene
    let textContent = "";
    let imageUrl = "";

    // SWITCH statement to handle different story nodes
    switch(sceneName) {
        case 'start':
            imageUrl = "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop";
            textContent = "Rain slicks the neon pavement of Sector 4. You are holding a sealed data-package. The client is waiting at the 'Blue Lotus' noodle bar. But a corpo-drone is hovering nearby, scanning faces.";
            
            createButton("Head straight to the noodle bar", () => showScene('bar'));
            createButton("Duck into the alleyway to hide", () => showScene('alley'));
            break;

        case 'alley':
            imageUrl = "https://images.unsplash.com/photo-1605218427306-635ba2439028?q=80&w=1000&auto=format&fit=crop";
            textContent = "The alley smells of ozone and old ramen. You find a dropped credit chip in a puddle. Lucky you.";
            
            // Arithmetic: Addition
            credits = credits + 50; 
            updateStatus();
            
            createButton("Go back to the street", () => showScene('start'));
            break;

        case 'bar':
            imageUrl = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop";
            textContent = "The Blue Lotus is crowded. You see the client in the back booth. He looks nervous. The drone from outside is now scanning the window.";
            
            createButton("Deliver the package immediately", () => showScene('deliver'));
            
            // IF Statement: distinct choice logic
            if (credits >= 50) {
                 createButton("Bribe the bartender to create a distraction (-50 creds)", () => showScene('distraction'));
            }
            break;

        case 'distraction':
            credits = credits - 50;
            reputation = "Sneaky";
            updateStatus();
            
            imageUrl = "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1000&auto=format&fit=crop";
            textContent = "The bartender 'accidentally' sets a drink on fire. Chaos ensues. You slip the package to the client unseen. He transfers the payment.";
            
            createButton("Mission Complete - Exit", () => location.reload());
            break;

        case 'deliver':
            reputation = "Reckless";
            updateStatus();
            textContent = "You walk up to the client. The drone spots the handoff! Sirens blare. The client runs, leaving you with the unpaid tab.";
            
            createButton("Run!", () => showScene('gameover'));
            break;

        case 'gameover':
            textContent = "You were caught by Sector Security. GAME OVER.";
            createButton("Try Again", () => location.reload());
            break;
    }

    // Update the DOM
    storyText.innerText = textContent;
    if(imageUrl) sceneImg.src = imageUrl;
}

// HELPER FUNCTION to create buttons dynamically
function createButton(text, action) {
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.onclick = action;
    choiceContainer.appendChild(btn);
}

// Start the game when script loads
startGame();