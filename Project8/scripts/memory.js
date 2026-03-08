// Memory Game JavaScript

var playerData = JSON.parse(localStorage.getItem('memoryPlayer'));

var gameBoard = document.getElementById('game-board');

if (gameBoard) {
    if (!playerData) {
        window.location.href = 'memorysetup.html';
    }

    // Show player name
    document.getElementById('playerInfo').textContent =
        'Playing as: ' + playerData.firstName + ' ' + playerData.lastName;

    // IMG Array
    var actualImages = [
        "styles/images/memory/Mailk.png", "styles/images/memory/Mailk.png",
        "styles/images/memory/POMS.png",  "styles/images/memory/POMS.png",
        "styles/images/memory/BBS.png",   "styles/images/memory/BBS.png",
        "styles/images/memory/CBS.png",   "styles/images/memory/CBS.png",
        "styles/images/memory/DCSS.png",  "styles/images/memory/DCSS.png",
        "styles/images/memory/MDS.png",   "styles/images/memory/MDS.png"
    ];

    // Randomize actualImages array (Fisher-Yates shuffle)
    for (var i = actualImages.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = actualImages[i];
        actualImages[i] = actualImages[j];
        actualImages[j] = temp;
    }

    // Array blank
    var blankImages = [];
    for (var i = 0; i < 12; i++) {
        blankImages[i] = "styles/images/memory/blank.png";
    }



    // Game state
    var attempts     = 0;
    var matchedPairs = 0;
    var totalPairs   = actualImages.length / 2;
    var firstTile    = null;
    var secondTile   = null;
    var isChecking   = false;

    // Build board
    for (var i = 0; i < actualImages.length; i++) {
        var tile = document.createElement('img');
        tile.src = blankImages[i];
        tile.classList.add('tile');
        tile.dataset.index = i;
        tile.dataset.image = actualImages[i];

        tile.addEventListener('click', handleTileClick);
        gameBoard.appendChild(tile);
    }

    function handleTileClick() {
        if (isChecking) return;
        if (this.dataset.flipped === 'true') return;
        if (this.dataset.matched === 'true') return;

        // Reveal tile
        this.src = this.dataset.image;
        this.dataset.flipped = 'true';

        if (!firstTile) {
            // First tile selected
            firstTile = this;
            return;
        }

        // Second tile selected — count attempt
        secondTile = this;
        attempts++;
        document.getElementById('attemptCount').textContent = attempts;
        isChecking = true;

        if (firstTile.dataset.image === secondTile.dataset.image) {
            // Match! Lock both tiles
            firstTile.dataset.matched  = 'true';
            secondTile.dataset.matched = 'true';
            firstTile.classList.add('tile-matched');
            secondTile.classList.add('tile-matched');
            matchedPairs++;
            resetTurn();

            if (matchedPairs === totalPairs) {
                finishGame();
            }
        } else {
            // No match — flip both back after a short delay
            setTimeout(function() {
                firstTile.src = blankImages[0];
                firstTile.dataset.flipped = 'false';
                secondTile.src = blankImages[0];
                secondTile.dataset.flipped = 'false';
                resetTurn();
            }, 1000);
        }
    }

    function resetTurn() {
        firstTile  = null;
        secondTile = null;
        isChecking = false;
    }

    function finishGame() {
        // Save final attempt count to localStorage
        playerData.attempts = attempts;
        localStorage.setItem('memoryPlayer', JSON.stringify(playerData));

        // Prompt player to move to results page
        var goToResults = confirm('You did it! You matched all ' + totalPairs + ' pairs in ' + attempts + ' attempts!\n\nView your results?');
        if (goToResults) {
            window.location.href = 'memoryfinale.html';
        }
    }
}

// Page 1/Setup Page

function startGame() {
    var firstName = document.getElementById('firstName').value.trim();
    var lastName  = document.getElementById('lastName').value.trim();
    var age       = document.getElementById('age').value.trim();
    var valid     = true;

    // Clear previous errors
    document.getElementById('firstNameErr').textContent = '';
    document.getElementById('lastNameErr').textContent  = '';
    document.getElementById('ageErr').textContent       = '';

    if (!firstName) {
        document.getElementById('firstNameErr').textContent = 'First name is required.';
        valid = false;
    }
    if (!lastName) {
        document.getElementById('lastNameErr').textContent = 'Last name is required.';
        valid = false;
    }
    if (!age || isNaN(age) || Number(age) < 1 || Number(age) > 120) {
        document.getElementById('ageErr').textContent = 'Please enter a valid age (1-120).';
        valid = false;
    }

    if (!valid) return;

    var playerData = {
        firstName : firstName,
        lastName  : lastName,
        age       : Number(age),
        attempts  : 0
    };

    localStorage.setItem('memoryPlayer', JSON.stringify(playerData));

    // Send player to the game
    window.location.href = 'memorygame.html';
}

// Page 3/Finale Page

var resultName = document.getElementById('resultName');

if (resultName) {
    var raw = localStorage.getItem('memoryPlayer');

    if (!raw) {
        window.location.href = 'memorysetup.html';
    } else {
        var player = JSON.parse(raw);

        document.getElementById('resultName').textContent     = player.firstName + ' ' + player.lastName;
        document.getElementById('resultAge').textContent      = player.age;
        document.getElementById('resultAttempts').textContent = player.attempts;
    }
}

function resetGame() {
    localStorage.removeItem('memoryPlayer');
    window.location.href = 'memorysetup.html';
}
