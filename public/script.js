// public/script.js

// DOM Elements
const flashcards = document.querySelectorAll('.flashcard');
const cardNumberDisplay = document.getElementById('card-number');
const prevButton = document.querySelector('#navigation button:first-child');
const nextButton = document.querySelector('#navigation button:last-child');

// State
let currentIndex = 0;

// Function to show a specific card
function showCard(index) {
    if (flashcards.length === 0) return;

    // Hide all cards
    flashcards.forEach((card, i) => {
        card.style.display = i === index ? 'block' : 'none';
    });

    // Update card number display
    cardNumberDisplay.innerText = `Card ${index + 1} of ${flashcards.length}`;

    // Enable/disable navigation buttons
    prevButton.disabled = index === 0;
    nextButton.disabled = index === flashcards.length - 1;
}

// Function to toggle the flip state of a card
function toggleFlip(event) {
    event.currentTarget.classList.toggle('flipped');
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Attach the flip event listener to each card
    flashcards.forEach(card => {
        card.addEventListener('click', toggleFlip);
    });

    // Show the first card
    showCard(currentIndex);

    // Attach event listeners to navigation buttons
    prevButton.addEventListener('click', prevCard);
    nextButton.addEventListener('click', nextCard);
});

// Navigation functions
function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        showCard(currentIndex);
    }
}

function nextCard() {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        showCard(currentIndex);
    }
}