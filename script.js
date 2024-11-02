'use strict';

// elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currScore0El = document.querySelector('#current--0');
const currScore1El = document.querySelector('#current--1');
const btnShowRules = document.querySelector('.show-rules');
const ruleModal = document.querySelector('.rules-modal-content');
const overlay = document.querySelector('.overlay');

// util functions
function toggleActivePlayer() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// initialization
let playing;
const limit = 100;

function startGame() {
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  dice.classList.add('hidden');
  currScore0El.textContent = 0;
  currScore1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
}
startGame();

// rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNum = Math.ceil(Math.random() * 6);
    dice.classList.remove('hidden');

    dice.src = `Assets/dice-${diceNum}.png`;

    if (diceNum === 1) {
      currScore0El.textContent = 0;
      currScore1El.textContent = 0;
      toggleActivePlayer();
    } else {
      if (player0El.classList.contains('player--active')) {
        currScore0El.textContent = Number(currScore0El.textContent) + diceNum;
      } else {
        currScore1El.textContent = Number(currScore1El.textContent) + diceNum;
      }
    }
  } else {
    player0El.classList.remove('player--active');
    player1El.classList.remove('player--active');
  }
});

// onhold
btnHold.addEventListener('click', function () {
  // if not any player has won yer
  if (playing) {
    // updating score of the active player
    if (player0El.classList.contains('player--active')) {
      const newScore =
        Number(score0El.textContent) + Number(currScore0El.textContent);
      score0El.textContent = newScore;
      if (newScore >= limit) {
        player0El.classList.add('player--winner');
        dice.classList.add('hidden');
        playing = false;
      }
    } else {
      const newScore =
        Number(score1El.textContent) + Number(currScore1El.textContent);
      score1El.textContent = newScore;
      if (newScore >= limit) {
        player1El.classList.add('player--winner');
        dice.classList.add('hidden');
        playing = false;
      }
    }

    // reseting current scores
    currScore0El.textContent = 0;
    currScore1El.textContent = 0;

    // toggling active player
    toggleActivePlayer();
  } else {
    player0El.classList.remove('player--active');
    player1El.classList.remove('player--active');
  }
});

// new game

btnNew.addEventListener('click', startGame);

btnShowRules.addEventListener('click', function (e) {
  e.stopPropagation();
  ruleModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

document.addEventListener('click', function () {
  ruleModal.classList.add('hidden');
  overlay.classList.add('hidden');
});
