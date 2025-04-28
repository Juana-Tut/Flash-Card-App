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

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    showCard(currentIndex);

    // Attach event listeners to navigation buttons
    prevButton.addEventListener('click', prevCard);
    nextButton.addEventListener('click', nextCard);

});