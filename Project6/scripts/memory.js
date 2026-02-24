// Memory Game JavaScript

// Array black
var blankImages = [];
for (var i = 0; i < 12; i++) {
    blankImages[i] = "styles/images/memory/blank.png";
}

// IMG Array
var actualImages = [
    "styles/images/memory/Mailk.png", "styles/images/memory/Mailk.png",
    "styles/images/memory/POMS.png",  "styles/images/memory/POMS.png",
    "styles/images/memory/BBS.png",   "styles/images/memory/BBS.png",
    "styles/images/memory/CBS.png",   "styles/images/memory/CBS.png",
    "styles/images/memory/DCSS.png",  "styles/images/memory/DCSS.png",
    "styles/images/memory/MDS.png",   "styles/images/memory/MDS.png"
];

// Randomize actualImages array
for (var i = actualImages.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = actualImages[i];
    actualImages[i] = actualImages[j];
    actualImages[j] = temp;
}

// Display blank image
var gameBoard = document.getElementById('game-board');

for (var i = 0; i < blankImages.length; i++) {
    var tile = document.createElement('img');
    tile.src = blankImages[i];
    tile.classList.add('tile');
    tile.dataset.index = i;

    // When click, reveal corresponding actual image
    tile.addEventListener('click', function() {
        var index = this.dataset.index;
        this.src = actualImages[index];
    });

    gameBoard.appendChild(tile);
}