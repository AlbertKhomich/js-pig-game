'use strict';

const btnDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

class Player {
  constructor(idCurrentScore, idScore) {
    this.score = 0;
    this.currentScore = 0;
    this.idCurrentScore = idCurrentScore;
    this.idScore = idScore;
  }

  hold() {
    this.score += this.currentScore;
    this.currentScore = 0;
    return this.score;
  }

  rollDice() {
    let dice = Math.floor(Math.random() * 6 + 1);
    document.querySelector('.dice').src = `dice-${dice}.png`;
    if (dice > 1) {
      this.currentScore += dice;
    } else {
      this.currentScore = 0;
    }
    return this.currentScore;
  }
}

function setCurrentScore(num) {
  document.querySelector(currentPlayer.idCurrentScore).textContent = num;
}

function showDice(status) {
  document.querySelector('.dice').style.display = status;
}

function resetAllScores() {
  showDice('none');
  player1.score = 0;
  player1.currentScore = 0;
  player2.score = 0;
  player2.currentScore = 0;
  document.querySelector(player1.idCurrentScore).textContent = 0;
  document.querySelector(player1.idScore).textContent = 0;
  document.querySelector(player2.idCurrentScore).textContent = 0;
  document.querySelector(player2.idScore).textContent = 0;
}

function refreshCurrentScore() {
  showDice('block');
  let score = currentPlayer.rollDice();
  setCurrentScore(score);
  if (score === 0) switchPlayer();
}

function refreshScore() {
  let score = currentPlayer.hold();
  document.querySelector(currentPlayer.idScore).textContent = score;
  setCurrentScore(0);
  switchPlayer();
}

function switchPlayer() {
  if (currentPlayer === player1 && currentPlayer.score < 100) {
    currentPlayer = player2;
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
  } else if (currentPlayer === player2 && currentPlayer.score < 100) {
    currentPlayer = player1;
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
  } else checkWinner();
}

function newGame() {
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  resetAllScores();
  if (currentPlayer === player2) switchPlayer();
  btnDice.disabled = false;
  btnHold.disabled = false;
}

function checkWinner() {
  if (currentPlayer === player1) {
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--winner');
  } else {
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--winner');
  }
  btnDice.disabled = true;
  btnHold.disabled = true;
  showDice('none');
}

const player1 = new Player('#current--0', '#score--0');

const player2 = new Player('#current--1', '#score--1');

resetAllScores();

let currentPlayer = player1;

btnDice.addEventListener('click', refreshCurrentScore);
btnHold.addEventListener('click', refreshScore);
btnNewGame.addEventListener('click', newGame);
