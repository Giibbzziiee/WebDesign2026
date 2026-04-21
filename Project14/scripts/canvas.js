// Gibson Media - Ethan Gibson - MART 441

// CANVAS SETUP
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// OBSTACLE CLASS (JSON)
class Obstacle {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.color = data.color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
}

// SPEEDBOOST CLASS (JSON)
class SpeedBoost {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.color = data.color;
        this.active = true;
        this.respawnTimer = 0;
        this.respawnDelay = 1800;
    }

    draw() {
        if (!this.active) return;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 18;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }

    update() {
        if (!this.active) {
            this.respawnTimer--;
            if (this.respawnTimer <= 0) {
                this.active = true;
            }
        }
    }

    collect() {
        this.active = false;
        this.respawnTimer = this.respawnDelay;
    }
}

// ENTITY CLASS (player + AI share this)

class Entity {
    constructor(x, y, color, isPlayer = false) {
        this.x = x;
        this.y = y;
        this.width = 28;
        this.height = 28;
        this.color = color;
        this.baseSpeed = 3.5;
        this.speed = this.baseSpeed;
        this.isPlayer = isPlayer;
        this.isTagged = false;
        this.immuneTimer = 0;
        this.immuneDuration = 90;
        this.speedBoostTimer = 0;
        this.speedBoostDuration = 180;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
    }

    draw() {
        const drawColor = this.isTagged ? "#c0392b" : this.color;
        // Flash white when immune
        const finalColor = (this.immuneTimer > 0 && Math.floor(this.immuneTimer / 7) % 2 === 0) ? "#ffffff" : drawColor;
        ctx.fillStyle = finalColor;
        ctx.shadowColor = finalColor;
        ctx.shadowBlur = this.isTagged ? 24 : 16;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;

        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.font = "bold 11px 'Roboto', sans-serif";
        ctx.textAlign = "center";
        const label = this.isTagged ? "IT" : (this.isPlayer ? "YOU" : "");
        if (label) ctx.fillText(label, this.x + this.width / 2, this.y - 5);
        ctx.textAlign = "left";
    }

    applySpeedBoost() {
        this.speed = this.baseSpeed * 1.8;
        this.speedBoostTimer = this.speedBoostDuration;
    }

    updateSpeedBoost() {
        if (this.immuneTimer > 0) this.immuneTimer--;
        if (this.speedBoostTimer > 0) {
            this.speedBoostTimer--;
            if (this.speedBoostTimer === 0) {
                this.speed = this.baseSpeed;
            }
        }
    }

    clampToBounds() {
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x + this.width > canvas.width)  this.x = canvas.width  - this.width;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
    }

    collidesWith(other) {
        return (
            this.x < other.x + other.width  &&
            this.x + this.width  > other.x  &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }

    moveWithObstacleCheck(dx, dy, obstacles) {
        this.x += dx;
        this.clampToBounds();
        for (const obs of obstacles) {
            if (this.collidesWith(obs)) {
                this.x -= dx;
            }
        }

        this.y += dy;
        this.clampToBounds();
        for (const obs of obstacles) {
            if (this.collidesWith(obs)) {
                this.y -= dy;
            }
        }
    }

    moveAI(target, obstacles, chase = false) {
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // Taggers move at 80% speed, fleers at full speed
        const moveSpeed = chase ? this.speed * 0.8 : this.speed;
        const dirX = (dx / dist) * moveSpeed;
        const dirY = (dy / dist) * moveSpeed;

        if (chase) {
            this.moveWithObstacleCheck(dirX, dirY, obstacles);
        } else {
            this.vx = -dirX + (Math.random() - 0.5) * 0.8;
            this.vy = -dirY + (Math.random() - 0.5) * 0.8;
            const mag = Math.sqrt(this.vx * this.vx + this.vy * this.vy) || 1;
            this.moveWithObstacleCheck((this.vx / mag) * this.speed, (this.vy / mag) * this.speed, obstacles);
        }
    }
}

// GAME STATE
let obstacles   = [];
let speedBoosts = [];
let score       = 0;
const keys      = {};

const player = new Entity(60, 60, "#ff9800", true);
const ai1    = new Entity(700, 60,  "#4fc3f7");
const ai2    = new Entity(700, 500, "#a29bfe");
const ai3    = new Entity(60,  500, "#f7dc6f");
const entities = [player, ai1, ai2, ai3];

ai1.isTagged = true;

// INPUT
document.addEventListener("keydown", e => { keys[e.key] = true; });
document.addEventListener("keyup",   e => { keys[e.key] = false; });

// LOAD JSON
async function loadJSON(path) {
    const res = await fetch(path);
    return res.json();
}

async function init() {
    const obsData   = await loadJSON("json/obstacles.json");
    const boostData = await loadJSON("json/collectibles.json");

    obstacles   = obsData.map(d => new Obstacle(d));
    speedBoosts = boostData.map(d => new SpeedBoost(d));

    updateHUD();
    setInterval(update, 1000 / 60);
}

// HUD
function updateHUD() {
    const tagged = entities.find(e => e.isTagged);
    let taggedName = "YOU";
    if (!tagged.isPlayer) {
        taggedName = tagged === ai1 ? "Blue" : tagged === ai2 ? "Purple" : "Yellow";
    }
    document.getElementById("taggedDisplay").textContent  = taggedName;
    document.getElementById("scoreDisplay").textContent   = score;
    document.getElementById("gameStatus").textContent     = player.isTagged ? "You're IT!" : "Evade!";
    document.getElementById("boostStatus").textContent    = player.speedBoostTimer > 0
        ? "BOOST (" + Math.ceil(player.speedBoostTimer / 60) + "s)"
        : "None";
}

// BACKGROUND
function drawBackground() {
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255, 152, 0, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
}

// TAG LOGIC
function handleTagging() {
    const tagged = entities.find(e => e.isTagged);

    for (const other of entities) {
        if (other === tagged) continue;
        if (other.immuneTimer > 0) continue; // no-tag-backs
        if (tagged.collidesWith(other)) {
            tagged.isTagged = false;
            tagged.immuneTimer = tagged.immuneDuration; // immunity for just-untagged
            other.isTagged  = true;

            if (tagged.isPlayer) {
                score += 100;
            }

            updateHUD();
            break;
        }
    }
}

// SPEED BOOST COLLECTION
function handleBoosts() {
    for (const boost of speedBoosts) {
        boost.update();
        if (boost.active && player.collidesWith(boost)) {
            boost.collect();
            player.applySpeedBoost();
            score += 10;
            updateHUD();
        }
    }
}

// MAIN LOOP
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    const tagged = entities.find(e => e.isTagged);

    // Move player
    let dx = 0, dy = 0;
    if (keys["ArrowUp"]    || keys["w"] || keys["W"]) dy -= player.speed;
    if (keys["ArrowDown"]  || keys["s"] || keys["S"]) dy += player.speed;
    if (keys["ArrowLeft"]  || keys["a"] || keys["A"]) dx -= player.speed;
    if (keys["ArrowRight"] || keys["d"] || keys["D"]) dx += player.speed;
    player.moveWithObstacleCheck(dx, dy, obstacles);
    player.updateSpeedBoost();

    // Move AI
    for (const ai of [ai1, ai2, ai3]) {
        ai.updateSpeedBoost();
        if (ai.isTagged) {
            let nearest = null;
            let nearestDist = Infinity;
            for (const e of entities) {
                if (e === ai) continue;
                const d = Math.hypot(e.x - ai.x, e.y - ai.y);
                if (d < nearestDist) { nearestDist = d; nearest = e; }
            }
            if (nearest) ai.moveAI(nearest, obstacles, true);
        } else {
            ai.moveAI(tagged, obstacles, false);
        }
    }

    handleTagging();
    handleBoosts();

    obstacles.forEach(o => o.draw());
    speedBoosts.forEach(b => b.draw());
    entities.forEach(e => e.draw());

    updateHUD();
}

init();

// AUDIO: Play/Pause button toggle
document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bgMusic");
    const playBtn = document.getElementById("playMusicBtn");

    if (playBtn && bgMusic) {
        playBtn.addEventListener("click", () => {
            if (bgMusic.paused) {
                bgMusic.play();
                playBtn.textContent = "⏸ Pause";
            } else {
                bgMusic.pause();
                playBtn.textContent = "▶ Play";
            }
        });
    }
});
