const gameBoard = document.querySelector(".game-board");
const dice = document.querySelector(".dice");

// CREATE GAME BOARD
const makeGrid = function (rows, cols) {
  for (i = rows * cols; i > 0; i--) {
    gameBoard.innerHTML += `<div class="game-board-square square-${i}">${i}</div>`;
  }
};
makeGrid(10, 10);

// DICE ROLL FUNCTIONALITY
dice.addEventListener("click", function () {
  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  // DISPLAY DICE ROLL
  // dice.innerHTML = `<img src="/images/dice-${dice}.png" alt="game_dice" class="dice" />`;
  dice.src = `/images/dice-${diceRoll}.png`;
});
