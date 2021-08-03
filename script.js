const gameBoard = document.querySelector(".game-board");
const gameStart = document.querySelector(".game-start");
const dice = document.querySelector(".dice");
const squareOne = document.querySelector(".square-1");
const gamePieceOne = `<i class="fas fa-user game-piece-1"></i>`;
const gamePieceTwo = `<i class="fas fa-user game-piece-2"></i>`;

// INITIAL CONDITIONS
let isPlaying = false;
let currentPlayer = 1;
let playerOnePosition = 1;
let playerTwoPosition = 1;

// CREATE GAME BOARD
const makeGrid = function (rows, cols) {
  for (i = rows * cols; i > 0; i--) {
    gameBoard.innerHTML += `<div class="game-board-square square-${i}">${i}</div>`;
  }
};
makeGrid(10, 10);

// INITIATE GAME
gameStart.addEventListener("click", function () {
  if (isPlaying === false) {
    isPlaying = true;
    currentPlayer = 1;
    playerOnePosition = 1;
    playerTwoPosition = 1;
    document.querySelector(
      ".square-1"
    ).innerHTML += `${gamePieceOne} ${gamePieceTwo}`;
  }
});

// DICE ROLL FUNCTIONALITY
dice.addEventListener("click", function () {
  if (isPlaying === true) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // DISPLAY DICE ROLL
    // dice.innerHTML = `<img src="/images/dice-${dice}.png" alt="game_dice" class="dice" />`;
    dice.src = `/images/dice-${diceRoll}.png`;

    // MOVE GAME PIECE
    if (playerOnePosition === playerTwoPosition) {
      // IF PLAYERS ARE ON THE SAME SQUARE
      if (currentPlayer === 1) {
        playerOnePosition += diceRoll;
        const newPosition = `.square-${playerOnePosition}`;
        document.querySelector(newPosition).innerHTML += `${gamePieceOne}`;
        document.querySelector(
          `.square-${playerTwoPosition}`
        ).innerHTML = `${playerTwoPosition}${gamePieceTwo}`;
        currentPlayer = 2;
      } else {
        playerTwoPosition += diceRoll;
        const newPosition = `.square-${playerTwoPosition}`;
        document.querySelector(newPosition).innerHTML += `${gamePieceTwo}`;
        document.querySelector(
          `.square-${playerOnePosition}`
        ).innerHTML = `${playerOnePosition}${gamePieceOne}`;
        currentPlayer = 1;
      }
    }
    //IF PLAYERS ARE ON DIFFERENT SQUARES
    else {
      if (currentPlayer === 1) {
        document.querySelector(`.square-${playerOnePosition}`).textContent =
          playerOnePosition;
        playerOnePosition += diceRoll;
        const newPosition = `.square-${playerOnePosition}`;
        document.querySelector(newPosition).innerHTML += `${gamePieceOne}`;
        currentPlayer = 2;
      } else {
        document.querySelector(`.square-${playerTwoPosition}`).textContent =
          playerTwoPosition;
        playerTwoPosition += diceRoll;
        const newPosition = `.square-${playerTwoPosition}`;
        document.querySelector(newPosition).innerHTML += `${gamePieceTwo}`;
        currentPlayer = 1;
      }
    }
  }
});
