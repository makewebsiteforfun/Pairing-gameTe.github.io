const foodOptions = [
    { name: 'Pizza', image: './596343.jpg' },
    { name: 'Burger', image: './OIP.jpg' },
    { name: 'Salad', image: './OIP (1).jpg' },
    { name: 'pasta', image: './R.jpg' },
    { name: 'soup', image: './R (1).jpg' },
    { name: 'steak', image: './OIP (2).jpg' }
    // Add more food options here
];

const drinkOptions = [
    { name: 'Soda', image: './Kinza-Lemon-185-ml-x-30.jpg' },
    { name: 'Milkshake', image: './R (2).jpg' },
    { name: 'Water', image: './83568193-2418-40f0-8367-4fd80481e2f8_1.fc5284020d9e9b9bcd45d777a9e62bb5.webp' },
    { name: 'juice', image: './a25cefa4-3b7d-4e9f-bc90-e462897aafd2_1.25d60aef19ad09e801dc459a7297a76f.webp' },
    { name: 'sparkling water', image: './OIP (3).jpg' }
 
    // Add more drink options here
];

// Variables to track user selection, score, and attempts
let playerName = '';
let selectedFood = null;
let selectedDrink = null;
let score = 0;
let attemptsRemaining = 4;

// Function to start the game
function startGame() {
    playerName = document.getElementById('playerName').value;
    document.querySelector('.input-section').style.display = 'none';
    document.querySelector('.game-section').style.display = 'block';
    displayOptions('foodOptions', foodOptions);
    displayOptions('drinkOptions', drinkOptions);
    updateAttemptsRemaining();
}

// Function to display food and drink options
function displayOptions(containerId, options) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerHTML = `<img src="${option.image}" alt="${option.name}">`;
        optionElement.addEventListener('click', () => selectOption(option, containerId));
        container.appendChild(optionElement);
    });
}

// Function to handle option selection
function selectOption(option, containerId) {
    if (containerId === 'foodOptions') {
        selectedFood = option;
    } else {
        selectedDrink = option;
    }
    document.querySelectorAll('.option').forEach(element => {
        element.classList.remove('selected');
    });
    event.target.closest('.option').classList.add('selected');
}

function pairSelection() {
if (!selectedFood || !selectedDrink) {
alert('Please choose both a food and a drink before pairing.');
return;
}
const pairedItemsContainer = document.getElementById('pairedItems');
const foodImage = `<img src="${selectedFood.image}" alt="${selectedFood.name}">`;
const drinkImage = `<img src="${selectedDrink.image}" alt="${selectedDrink.name}">`;
pairedItemsContainer.innerHTML = `${foodImage} + ${drinkImage}`;
const pairScore = calculateScore(selectedFood, selectedDrink);
score += pairScore;
document.getElementById('score').textContent = score;
// Generate new set of options
generateNewOptions();
// Update attempts remaining
attemptsRemaining--;
updateAttemptsRemaining();
// Check if attempts are exhausted
if (attemptsRemaining === 0) {
alert('You have finished your tries!');
document.getElementById('pairButton').disabled = true;
}
}

// Update attempts remaining in the UI
function updateAttemptsRemaining() {
document.getElementById('attemptsRemaining').textContent = attemptsRemaining;
}
// Function to calculate the score based on the pairing
function calculateScore(food, drink) {
    let pairScore = 0;

    // Custom scoring logic based on perfect matches
    if (
        (food.name === 'Pizza' && drink.name === 'juice') ||
        (food.name === 'Burger' && drink.name === 'Milkshake') ||
        (food.name === 'Salad' && drink.name === 'sparkling water') || 
        (food.name === 'pasta' && drink.name === 'Soda') ||
        (food.name === 'soup' && drink.name === 'Water' ) ||
        (food.name === 'steak' && drink.name === 'Soda' )
    ) {
        pairScore = 20; // Perfect match
    } else {
        pairScore = 5; // Default score for non-perfect matches
    }

    return pairScore;
}

// Function to generate a new set of food and drink options
function generateNewOptions() {
    // Shuffle the food and drink options
    shuffleArray(foodOptions);
    shuffleArray(drinkOptions);
    // Display the new options
    displayOptions('foodOptions', foodOptions);
    displayOptions('drinkOptions', drinkOptions);
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to update the display of attempts remaining
function updateAttemptsRemaining() {
    document.getElementById('attemptsRemaining').textContent = `Attempts remaining: ${attemptsRemaining}`;
}

// Event listeners
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('pairButton').addEventListener('click', pairSelection);