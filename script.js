const gameBoard = document.querySelector(".game-board");
const gameStart = document.querySelector(".game-start");
const dice = document.querySelector(".dice");
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

const squareOne = document.querySelector(".square-1");
const squareEnd = document.querySelector(".square-100");

// INITIATE GAME

const gameReset = function () {
  currentPlayer = 1;
  playerOnePosition = 1;
  playerTwoPosition = 1;
  squareOne.innerHTML += `${gamePieceOne} ${gamePieceTwo}`;
};

gameStart.addEventListener("click", function () {
  if (isPlaying === false) {
    isPlaying = true;
    gameReset();
  } else {
    document.querySelector(`.square-${playerOnePosition}`).textContent =
      playerOnePosition;
    document.querySelector(`.square-${playerTwoPosition}`).textContent =
      playerTwoPosition;
    gameReset();
  }
});

// TURN FUNCTIONS

let snakesAndLadders = {
  // Snakes
  42: 7,
  99: 11,
  58: 24,
  77: 39,
  85: 61,
  // Ladders
  2: 33,
  19: 28,
  25: 66,
  59: 89,
  73: 91,
};

const turnPlayerOne = function () {
  if (playerOnePosition >= 100) {
    squareEnd.innerHTML += `${gamePieceOne}`;
    gameBoard.innerHTML = `<h1 class="winner-message">Player One Wins!!!</h1>`;
  } else if (snakesAndLadders[playerOnePosition]) {
    playerOnePosition = snakesAndLadders[playerOnePosition];
    const newPosition = `.square-${playerOnePosition}`;
    document.querySelector(newPosition).innerHTML += `${gamePieceOne}`;
  } else {
    const newPosition = `.square-${playerOnePosition}`;
    document.querySelector(newPosition).innerHTML += `${gamePieceOne}`;
  }
};

const turnPlayerTwo = function () {
  if (playerTwoPosition >= 100) {
    squareEnd.innerHTML += `${gamePieceTwo}`;
    gameBoard.innerHTML = `<h1 class="winner-message">Player Two Wins!!!</h1>`;
  } else if (snakesAndLadders[playerTwoPosition]) {
    playerTwoPosition = snakesAndLadders[playerTwoPosition];
    const newPosition = `.square-${playerTwoPosition}`;
    document.querySelector(newPosition).innerHTML += `${gamePieceTwo}`;
  } else {
    const newPosition = `.square-${playerTwoPosition}`;
    document.querySelector(newPosition).innerHTML += `${gamePieceTwo}`;
  }
};

// GENERATE DICE ROLL
dice.addEventListener("click", function () {
  if (isPlaying === true) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    // DISPLAY DICE ROLL
    dice.src = `/images/dice-${diceRoll}.png`;

    // MOVE GAME PIECE
    if (playerOnePosition === playerTwoPosition) {
      // IF PLAYERS ARE ON THE SAME SQUARE
      if (currentPlayer === 1) {
        playerOnePosition += diceRoll;
        turnPlayerOne();

        document.querySelector(
          `.square-${playerTwoPosition}`
        ).innerHTML = `${playerTwoPosition}${gamePieceTwo}`;
        currentPlayer = 2;
      } else {
        playerTwoPosition += diceRoll;
        turnPlayerTwo();

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
        turnPlayerOne();

        currentPlayer = 2;
      } else {
        document.querySelector(`.square-${playerTwoPosition}`).textContent =
          playerTwoPosition;

        playerTwoPosition += diceRoll;
        turnPlayerTwo();

        currentPlayer = 1;
      }
    }
  }
});
