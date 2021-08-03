const gameBoard = document.querySelector(".game-board");
const gameStart = document.querySelector(".game-start");
const dice = document.querySelector(".dice");
const gamePieceOne = `<i class="fas fa-user game-piece-1"></i>`;
const gamePieceTwo = `<i class="fas fa-user game-piece-2"></i>`;

let isPlaying = false;

// CREATE GAME BOARD
const makeGrid = function (rows, cols) {
  for (i = rows * cols; i > 0; i--) {
    gameBoard.innerHTML += `<div class="game-board-square square-${i}">${i}</div>`;
  }
};
makeGrid(10, 10);

// INITIATE GAME
gameStart.addEventListener("click", function () {
  isPlaying = true;
  document.querySelector(
    ".square-1"
  ).innerHTML += `${gamePieceOne} ${gamePieceTwo}`;
});

// DICE ROLL FUNCTIONALITY
dice.addEventListener("click", function () {
  if (isPlaying === true) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    // DISPLAY DICE ROLL
    // dice.innerHTML = `<img src="/images/dice-${dice}.png" alt="game_dice" class="dice" />`;
    dice.src = `/images/dice-${diceRoll}.png`;
  }
});
