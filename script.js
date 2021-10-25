// test commit

const gameBoard = document.querySelector(".game-board");
const gameStart = document.querySelector(".game-start");
const dice = document.querySelector(".dice");
const gamePieceOne = `<i class="fas fa-user game-piece-1"></i>`;
const gamePieceTwo = `<i class="fas fa-user game-piece-2"></i>`;
const winnerMessage = document.querySelector(".winner-message");
const blur = document.querySelector(".blur");

// INITIAL CONDITIONS
let isPlaying = false;
let currentPlayer = 1;
let playerOnePosition = 1;
let playerTwoPosition = 1;

// CREATE GAME BOARD
const makeGrid = (rows, cols) => {
  for (i = rows * cols; i > 0; i--) {
    gameBoard.innerHTML += `<div class="game-board-square square-${i}">${i}</div>`;
  }
};

makeGrid(10, 10);

const squareOne = document.querySelector(".square-1");
const squareEnd = document.querySelector(".square-100");

// INITIATE GAME

const gameReset = () => {
  currentPlayer = 1;
  for (let i = 1; i < 101; i++) {
    document.querySelector(`.square-${i}`).textContent = i;
  }
  playerOnePosition = 1;
  playerTwoPosition = 1;
  squareOne.innerHTML += `${gamePieceOne} ${gamePieceTwo}`;
};

gameStart.addEventListener("click", function () {
  if (isPlaying === false) {
    isPlaying = true;
    gameReset();
  } else {
    gameReset();
  }
});

// WIN FUNCTION

const displayWinnerMessage = (player) => {
  winnerMessage.innerHTML = `<h1>Player ${player} Wins!!!</h1>`;
  winnerMessage.classList.remove("hidden");
  blur.classList.remove("hidden");
};

const hideWinnerMessage = () => {
  if (!winnerMessage.classList.contains("hidden")) {
    winnerMessage.classList.add("hidden");
    blur.classList.add("hidden");
  }
};

winnerMessage.addEventListener("click", hideWinnerMessage);
blur.addEventListener("click", hideWinnerMessage);

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

const turnPlayerOne = () => {
  if (playerOnePosition >= 100) {
    squareEnd.innerHTML += `${gamePieceOne}`;
    displayWinnerMessage("One");
    isPlaying = false;
  } else if (snakesAndLadders[playerOnePosition]) {
    playerOnePosition = snakesAndLadders[playerOnePosition];
    const newPosition = `.square-${playerOnePosition}`;
    document.querySelector(newPosition).innerHTML += `${gamePieceOne}`;
  } else {
    const newPosition = `.square-${playerOnePosition}`;
    document.querySelector(newPosition).innerHTML += `${gamePieceOne}`;
  }
};

const turnPlayerTwo = () => {
  if (playerTwoPosition >= 100) {
    squareEnd.innerHTML += `${gamePieceTwo}`;
    displayWinnerMessage("Two");
    isPlaying = false;
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
        setTimeout(turnPlayerOne(), 500);

        document.querySelector(
          `.square-${playerTwoPosition}`
        ).innerHTML = `${playerTwoPosition}${gamePieceTwo}`;
        currentPlayer = 2;
      } else {
        playerTwoPosition += diceRoll;
        setTimeout(turnPlayerTwo(), 500);

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
        setTimeout(turnPlayerOne(), 500);

        currentPlayer = 2;
      } else {
        document.querySelector(`.square-${playerTwoPosition}`).textContent =
          playerTwoPosition;

        playerTwoPosition += diceRoll;
        setTimeout(turnPlayerTwo(), 500);

        currentPlayer = 1;
      }
    }
  }
});
