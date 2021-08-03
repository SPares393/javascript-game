const gameBoard = document.querySelector(".game-board");

const makeGrid = function (rows, cols) {
  for (i = rows * cols; i > 0; i--) {
    gameBoard.innerHTML += `<div class="game-board-square square-${i}">${i}</div>`;
  }
};
makeGrid(10, 10);
