// Gibson Media - Ethan Gibson - MART 441

// CLASS DEFINITION
class Slide {
    constructor(title, image, description, author, year, theme) {
        this.title       = title;
        this.image       = image;
        this.description = description;
        this.author      = author;
        this.year        = year;
        this.theme       = theme;
    }
}

// SLIDE OBJECTS

const slide1 = new Slide(
    "Justice for George Floyd, Minneapolis",
    "styles/images/socialviews/GFloyd.webp",
    "In May 2020, the death of George Floyd at the hands of Minneapolis police sparked one of the largest waves of civil rights protests in U.S. history. Demonstrators flooded the streets demanding accountability and an end to systemic racial inequality in the criminal justice system. The movement put a sharp spotlight on the well-documented reality that Black Americans face harsher sentences and higher incarceration rates than white Americans for the same offenses. The call for justice was heard in cities across the country and around the world.",
    "[Eric Miller/Reuters]",
    "2020",
    "Criminal Justice Reform"
);

const slide2 = new Slide(
    "Parole Justice Rally, New York City",
    "styles/images/socialviews/paroleprotest.webp",
    "Activists and formerly incarcerated people gathered outside a New York courthouse to demand parole justice reform, calling attention to the thousands of people denied parole each year despite posing no public safety risk. Signs visible in the crowd reference individual cases of elderly and nonviolent offenders left to die in prison after repeated denials of medical parole. This rally represents the human side of a system that too often treats incarceration as permanent punishment rather than rehabilitation. Reforming the parole system is one of the most direct ways to address racial and economic disparities in sentencing.",
    "[Spencer Platt/Getty Images]",
    "approx. 2021",
    "Criminal Justice Reform"
);

const slide3 = new Slide(
    "Support Amazon Workers Rally, New York City",
    "styles/images/socialviews/AmazonWorkerSupport.jpg",
    "Workers and supporters rallied in New York City calling for Amazon to respect its employees' right to organize, holding signs reading 'Support Amazon Workers in Alabama' alongside anti-union-busting messages. Amazon, one of the wealthiest corporations in the world, has faced repeated accusations of suppressing union efforts and denying workers adequate healthcare and benefits. The rally was part of a broader national movement demanding that billion-dollar companies be held accountable to the people whose labor built their profits. Workers have every right to organize, and no profit margin justifies stripping them of that.",
    "[Erik McGregor]",
    "2021",
    "Labor Rights"
);

const slide4 = new Slide(
    "UPS Teamsters Practice Picket, Nationwide",
    "styles/images/socialviews/UPSteamsters.jpg",
    "UPS Teamsters workers took to the streets in a practice picket ahead of contract negotiations in the summer of 2023, carrying signs reading 'Just Practicing for a Just Contract.' The demonstration was a show of organized strength by approximately 340,000 workers demanding fair wages, better benefits, and improved working conditions from one of the world's largest delivery companies. The Teamsters ultimately won a landmark contract, proving that collective action still has real power. It became one of the most celebrated labor victories in recent American history.",
    "[Chris Otts/WDRB News]",
    "2023",
    "Labor Rights"
);

const slide5 = new Slide(
    "Ceasefire Now March, London",
    "styles/images/socialviews/stopwar.jpg",
    "Hundreds of thousands of demonstrators filled the streets of London in late 2023 calling for a ceasefire and justice for Palestinian civilians caught in the conflict in Gaza. Protesters carried flags and signs reading 'Free Palestine' and 'Ceasefire Now,' representing one of the largest anti-war demonstrations Europe had seen in years. The march reflects a growing global belief that governments must be held accountable for the human cost of military conflict, and that civilian lives cannot be treated as acceptable collateral. Peace is not just a foreign policy position, it is a social justice issue.",
    "[Alberto Pezzali/AP Photo]",
    "2023",
    "Anti-War / Peace"
);

// SLIDES ARRAY
const slides = [slide1, slide2, slide3, slide4, slide5];

// DOM REFERENCES
const imgEl        = document.getElementById('sv-image');
const titleEl      = document.getElementById('sv-title');
const descEl       = document.getElementById('sv-description');
const authorEl     = document.getElementById('sv-author');
const yearEl       = document.getElementById('sv-year');
const themeEl      = document.getElementById('sv-theme');
const slideNumEl   = document.getElementById('slideNumber');
const slideTotalEl = document.getElementById('slideTotal');
const nextBtn      = document.getElementById('nextSlideBtn');
const slideInfo    = document.querySelector('.sv-slide-info');

// STATE
let queue = [];

// FISHER-YATES SHUFFLED QUEUE
function buildQueue() {
    let indexes = slides.map((_, i) => i);
    for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    return indexes;
}

function getNextIndex() {
    if (queue.length === 0) {
        queue = buildQueue();
    }
    return queue.shift();
}

// Update DOM
function displaySlide(index, instant = false) {
    const slide = slides[index];

    if (instant) {
        imgEl.src              = slide.image;
        imgEl.alt              = slide.title;
        titleEl.textContent    = slide.title;
        descEl.textContent     = slide.description;
        authorEl.textContent   = slide.author;
        yearEl.textContent     = slide.year;
        themeEl.textContent    = slide.theme;
        slideNumEl.textContent = index + 1;
    } else {
        imgEl.classList.add('fading');
        slideInfo.classList.add('fading');

        setTimeout(() => {
            imgEl.src              = slide.image;
            imgEl.alt              = slide.title;
            titleEl.textContent    = slide.title;
            descEl.textContent     = slide.description;
            authorEl.textContent   = slide.author;
            yearEl.textContent     = slide.year;
            themeEl.textContent    = slide.theme;
            slideNumEl.textContent = index + 1;

            imgEl.classList.remove('fading');
            slideInfo.classList.remove('fading');
        }, 400);
    }

}

// INIT
slideTotalEl.textContent = slides.length;

displaySlide(getNextIndex(), true);

nextBtn.addEventListener('click', () => {
    displaySlide(getNextIndex());
});

// NAV
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
        const nav = document.querySelector('.main-nav');
        if (nav) {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        }
    });
}
