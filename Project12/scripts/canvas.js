// Gibson Media - Ethan Gibson - MART 441

// CANVAS SETUP
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ENTITY CLASS
class Entity {
    constructor(x, y, width, height, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;

        this.baseWidth = width;
        this.baseHeight = height;

        this.growTimer = 0;
    }

    // Draw entity on canvas
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);


        ctx.shadowColor = this.color;
        ctx.shadowBlur = 18;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0; // Reset so other draws aren't affected
    }


    clampToBounds() {
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
    }

    triggerGrow() {
        this.width = this.baseWidth * 2;
        this.height = this.baseHeight * 2;
        this.growTimer = 20; // Frames to stay grown
    }

    updateSize() {
        if (this.growTimer > 0) {
            this.growTimer--;
            if (this.growTimer === 0) {
                this.width = this.baseWidth;
                this.height = this.baseHeight;
            }
        }
    }
}

// COLLISION DETECTION
function hasCollided(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// CREATE OBJECTS
const player = new Entity(100, 275, 30, 30, "#ff9800", 0, 0);
const wraith = new Entity(650, 275, 30, 30, "#c0392b", 3, 2);

// KEYBOARD INPUT
const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// COLLISION STATE
let bgFlash = false;
let flashTimer = 0;
let collisionCount = 0;

// GAME WIN STATE
const MAX_COLLISIONS = 10;
let gameOver = false;


// DRAW GAME WIN OVERLAY
function drawGameOver() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.78)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    ctx.shadowColor = "#c0392b";
    ctx.shadowBlur = 40;
    ctx.fillStyle = "#c0392b";
    ctx.font = "bold 72px 'Playfair Display', serif";
    ctx.textAlign = "center";
    ctx.fillText("YOU WIN", canvas.width / 2, canvas.height / 2 - 60);

 
    ctx.shadowBlur = 0;

    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "300 22px 'Roboto', sans-serif";
    ctx.fillText("You caught the wraith 10 times!", canvas.width / 2, canvas.height / 2);

    ctx.fillStyle = "#ff9800";
    ctx.font = "300 18px 'Roboto', sans-serif";
    ctx.fillText("Press R to try again", canvas.width / 2, canvas.height / 2 + 50);

    ctx.textAlign = "left"; 
}

// MOVE PLAYER

function movePlayer() {
    const speed = 4;

    if (keys["w"] || keys["W"] || keys["ArrowUp"])    player.y -= speed;
    if (keys["s"] || keys["S"] || keys["ArrowDown"])  player.y += speed;
    if (keys["a"] || keys["A"] || keys["ArrowLeft"])  player.x -= speed;
    if (keys["d"] || keys["D"] || keys["ArrowRight"]) player.x += speed;

    player.clampToBounds();
}

// MOVE WRAITH
// DIFFICULTY SCALING
function moveWraith() {
    const speedScale = 1 + (collisionCount * 0.4);

    const huntFactor = Math.min(collisionCount * 0.01, 0.09);

    if (wraith.x < player.x) wraith.speedX += huntFactor;
    else wraith.speedX -= huntFactor;

    if (wraith.y < player.y) wraith.speedY += huntFactor;
    else wraith.speedY -= huntFactor;

    const magnitude = Math.sqrt(wraith.speedX ** 2 + wraith.speedY ** 2);
    wraith.speedX = (wraith.speedX / magnitude) * speedScale;
    wraith.speedY = (wraith.speedY / magnitude) * speedScale;

    wraith.x += wraith.speedX;
    wraith.y += wraith.speedY;

    if (wraith.x <= 0 || wraith.x + wraith.width >= canvas.width) {
        wraith.speedX *= -1;
    }

    if (wraith.y <= 0 || wraith.y + wraith.height >= canvas.height) {
        wraith.speedY *= -1;
    }

    wraith.clampToBounds();
}

// DRAW BACKGROUND
function drawBackground() {
    if (bgFlash) {
        ctx.fillStyle = "#4a0000";
    } else {
        ctx.fillStyle = "#111111";
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255, 152, 0, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// MAIN UPDATE LOOP
function update() {
    if (gameOver) {
        drawGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background 
    drawBackground();

    // Move both objects
    movePlayer();
    moveWraith();

    // Tick size timers
    player.updateSize();
    wraith.updateSize();

    // Check collision every frame
    if (hasCollided(player, wraith)) {
        if (!bgFlash) {
            // New collision: trigger effects
            bgFlash = true;
            flashTimer = 15; // Flash lasts 15 frames (~0.25 sec)
            collisionCount++;

            // Both objects grow on collision
            player.triggerGrow();
            wraith.triggerGrow();

            // Update the counter in the UI
            document.getElementById("collisionCount").textContent = collisionCount;

            // Check if player has hit the limit
            if (collisionCount >= MAX_COLLISIONS) {
                gameOver = true;
                document.getElementById("gameStatus").textContent = "Winner";
                bgMusic.pause();
            } else {
                document.getElementById("gameStatus").textContent = "Catching!";
            }
        }
    } else {
        if (!gameOver) document.getElementById("gameStatus").textContent = "Alive";
    }

    // Tick the flash timer down
    if (bgFlash) {
        flashTimer--;
        if (flashTimer <= 0) {
            bgFlash = false;
        }
    }

    // Draw both entities
    player.draw();
    wraith.draw();
}

// RESTART ON R KEY

document.addEventListener("keydown", (e) => {
    if ((e.key === "r" || e.key === "R") && gameOver) {
        // Reset positions
        player.x = 100; player.y = 275;
        wraith.x = 650; wraith.y = 275;

        // Reset wraith speed back to starting values
        wraith.speedX = 3;
        wraith.speedY = 2;

        // Reset sizes
        player.width = player.baseWidth; player.height = player.baseHeight;
        wraith.width = wraith.baseWidth; wraith.height = wraith.baseHeight;
        player.growTimer = 0; wraith.growTimer = 0;

        // Reset state
        collisionCount = 0;
        bgFlash = false;
        flashTimer = 0;
        gameOver = false;

        // Reset UI
        document.getElementById("collisionCount").textContent = "0";
        document.getElementById("gameStatus").textContent = "Alive";
    }
});

// Start the animation loop at ~60fps
setInterval(update, 1000 / 60);

// AUDIO: Play/Pause button toggle
const bgMusic = document.getElementById("bgMusic");
const playBtn = document.getElementById("playMusicBtn");

playBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        playBtn.textContent = "⏸ Pause";
    } else {
        bgMusic.pause();
        playBtn.textContent = "▶ Play";
    }
});
