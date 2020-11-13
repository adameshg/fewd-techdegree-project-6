const qwerty = document.getElementById('qwerty');
const qwertyButton = document.querySelectorAll('#qwerty button');
const letterLi = document.getElementsByClassName('letter');
const overlay = document.getElementById('overlay');
const phrase = document.getElementById('phrase');
const buttonStart = document.getElementsByClassName('btn__reset')[0];
let missed = 0;

const phrases = [
    'May the force be with you', 
    'ET phone home', 
    'Life is like a box of chocolates', 
    'Nobody puts baby in a corner', 
    'I see dead people'
];

// Hides start menu overlay
buttonStart.addEventListener('click', () => {
        overlay.style.display = 'none';
});

// Selects random phrase from 'phrases' array then splits the string
function getRandomPhraseAsArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)].split('');
}

// Creates <li> for each character, appends it to <ul>, gives each alphabetical character a class of 'letter'
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        li = document.createElement('li');
        li.textContent = arr[i];
        document.querySelector('#phrase ul').appendChild(li);
        if (arr[i] === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
    }
}

// Adds phrase to game screen
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Checks whether the player's guess matches any of the letters in the phrase
function checkLetter(button) {
    let match = null;
    for (let i = 0; i < letterLi.length; i++) {
        if (letterLi[i].textContent.toLowerCase() === button.textContent.toLowerCase()) {
            letterLi[i].classList.add('show');
            match = true;
        }
    }
    return match;
}

// Disables buttons after they have been clicked once
qwerty.addEventListener('click', (e) => {
    const button = e.target;
    const letterFound = checkLetter(button);
    if (button.tagName === 'BUTTON') {
        button.className = 'chosen';
        button.disabled = true;
    } 
    // Adjusts hearts on scoreboard relative to missed guesses
    if (letterFound === null && button.tagName === 'BUTTON') {
        const scoreboardImg = document.querySelectorAll('.tries img');
        scoreboardImg[missed].src = 'images/lostHeart.png';
        missed++;
    }
    checkWin();
});

function checkWin() {
    const showLi = document.getElementsByClassName('show');
    if (letterLi.length === showLi.length) {
        overlay.style.display = 'flex';
        overlay.className = 'win';
        overlay.querySelector('h2').textContent = 'You won!';
        overlay.querySelector('.btn__reset').style.display = 'none';
    } else if (missed >= 5) {
        overlay.style.display = 'flex';
        overlay.className = 'lose';
        overlay.querySelector('h2').textContent = 'You lost :(';
        overlay.querySelector('.btn__reset').style.display = 'none';
    }
}