console.log("Welcome to my Portfolio!")
console.log("Page Loaded Successfully!")
console.log("Current Section: Home")
console.log("\n");

// 3 Favorite Websites

console.log("=== MY FAVORITE WEBSITES ===");

console.log("1. Guitar Center (guitarcenter.com) - My go-to for music equipment and gear");
console.log("2. Crunchyroll (crunchyroll.com) - Best place to watch anime and manga content");
console.log("3. HumbleBundle (humblebundle.com) - Amazing game deals and supports charity");

console.log("\n");

// 3 Favorite Games

console.log("=== MY FAVORITE GAMES ===");

console.log("1. Sly Cooper 2: Band of Thieves (PS2) - One of my earliest and best gaming memories");
console.log("2. God of War (2018)  - Incredible storytelling and emotional journey");
console.log("3. Tony Hawk's American Wasteland (PS2) - The perfect skating story with an amazing amount of pop culture references from the early 2000's and 1990's");

console.log("\n");

// 3 Favorite Artists

console.log("MY FAVORITE ARTISTS & THEIR CULTURAL IMPORTANCE");

console.log("1. Ethan Regan");
console.log("   Cultural Importance: Independent artist who represents the DIY music movement and modern bedroom pop culture. Shows how artists can build authentic connections with audiences through raw, personal songwriting without major label backing.");
console.log("2. Tyler Childers");
console.log("   Cultural Importance: Revitalized traditional country music by blending Appalachian roots with modern storytelling. His authentic voice and refusal to conform to mainstream country helped spark a renaissance of genuine, story-driven country music.");
console.log("3. Studio Ghibli / Hayao Miyazaki");
console.log("   Cultural Importance: Elevated animation to high art, proving that animated films can tackle complex themes and deep emotions. Their work influenced global animation and introduced Japanese storytelling to worldwide audiences.");

console.log("\n");

// Q&A

console.log("INTERACTIVE Q&A");

var userAnswer = prompt("What's your favorite creative medium? (film, music, games, art, etc.)");

console.log("You answered: " + userAnswer);

console.log("That's awesome! " + userAnswer + " is a great way to express creativity!");
console.log("Thanks for visiting my portfolio and checking out the console!");
console.log("\n=== END OF CONSOLE OUTPUT ===");

const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.querySelector('.main-nav').classList.add('scrolled');
        } else {
            document.querySelector('.main-nav').classList.remove('scrolled');
        }
    });
}