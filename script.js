'use strict';

// Selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Condition on Starting
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
// Rolling the Dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Genarating a Random Dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display Dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3. Checking if the Dice rolled is 1
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch the player
      switchPlayer();
    }
  }
});

// Holding functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add Current score to the active Player's Score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if Player's Score is >= 100
    if (scores[activePlayer] >= 50) {
      // Finish the game
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
