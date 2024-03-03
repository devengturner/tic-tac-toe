/*
 ** The gameboard represents the state of the board
 ** printBoard prints the board to the console
 ** getBoard returns the board
 */
const modalEl = document.querySelector("dialog");
const player1NameEl = document.querySelector("#player1-name");
const player2NameEl = document.querySelector("#player2-name");
const drawEl = document.querySelector(".draws");
let draws = 0;
const player1ScoreEl = document.querySelector(".player1-score");
const player2ScoreEl = document.querySelector(".player2-score");
const playAgainButton = document.querySelector(".play-again");

function Gameboard() {
  let gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameboard[i][j] = "";
      }
    }
  };

  const getBoard = () => gameboard;

  const makeMark = (row, column, mark) => {
    if (gameboard[row][column] == "") {
      gameboard[row][column] = mark;
    }
  };
  return {
    getBoard,
    makeMark,
    resetBoard,
  };
}

/*
 ** Player represents each of the two players
 ** Marker is either "X" or "O";
 */

function Player(name, marker) {
  return {
    name,
    marker,
  };
}

/*
 ** The GameController controls the flow of the game / internal logic and data
 */

function GameController() {
  let player1Name = "Player One";
  let player2Name = "Player Two";
  const player1 = Player(player1Name, "x");
  const player2 = Player(player2Name, "o");
  let player1Score = 0;
  let player2Score = 0;
  let activePlayer = player1;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const getActivePlayer = () => {
    return activePlayer;
  };

  const getPlayer1Score = () => player1Score;

  const getPlayer2Score = () => player2Score;

  const resetPlayer1Score = () => (player1Score = 0);

  const resetPlayer2Score = () => (player1Score = 0);

  const incrementPlayer1Score = () => player1Score++;

  const incrementPlayer2Score = () => player2Score++;

  const setPlayer1Name = (name) => {
    player1Name = name;
  };
  const setPlayer2Name = (name) => {
    player2Name = name;
  };

  const getPlayer1Name = () => player1Name;

  const getPlayer2Name = () => player2Name;

  const checkWin = (board) => {
    let win = false;

    //check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] != "" && board[i][1] != "" && board[i][2] != "") {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
          win = true;
        }
      }
    }

    //check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] != "" && board[1][i] != "" && board[2][i] != "") {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
          win = true;
        }
      }
    }

    //check diagonals

    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] != ""
    ) {
      win = true;
    }

    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] != ""
    ) {
      win = true;
    }

    return win;
  };

  const checkDraw = (board) => {
    let draw = true;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          draw = false;
        }
      }
    }
    return draw;
  };

  return {
    checkWin,
    checkDraw,
    getActivePlayer,
    switchActivePlayer,
    player1,
    player2,
    player1Score,
    player2Score,
    getPlayer1Score,
    getPlayer2Score,
    setPlayer1Name,
    setPlayer2Name,
    getPlayer1Name,
    getPlayer2Name,
    incrementPlayer1Score,
    incrementPlayer2Score,
    resetPlayer1Score,
    resetPlayer2Score,
  };
}

function ScreenUpdater() {
  const board = Gameboard();
  const game = GameController();
  const turnElement = document.querySelector(".turn");
  const startButtonEl = document.querySelector(".start");
  const player1NameInput = document.querySelector("#player1-name");
  const player2NameInput = document.querySelector("#player2-name");

  startButtonEl.addEventListener("click", function () {
    game.setPlayer1Name(player1NameInput.value);
    game.setPlayer2Name(player2NameInput.value);
    player1NameEl.textContent = `${game.getPlayer1Name()}:`;
    player2NameEl.textContent = `game.getPlayer2Name()`;
    player1ScoreEl.textContent = `${game.getPlayer1Name()}:`;
    player2ScoreEl.textContent = `${game.getPlayer2Name()}:`;

    turnElement.textContent = `It is ${game.getPlayer1Name()}'s turn`;
    playAgainButton.classList.add("hidden");
    modalEl.close();
  });

  const updateTurn = () => {
    if (game.getActivePlayer() === game.player1) {
      turnElement.textContent = `It is ${game.getPlayer1Name()}'s turn`;
    } else {
      turnElement.textContent = `It is ${game.getPlayer2Name()}'s turn`;
    }
    console.log("update turn");
  };

  const updateScreen = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const currentButton = document.querySelector(`.button${i}${j}`);
        if (board.getBoard()[i][j] === "x") {
          currentButton.textContent = "x";
        } else if (board.getBoard()[i][j] === "o") {
          currentButton.textContent = "o";
        } else if (board.getBoard()[i][j] === "") {
          currentButton.textContent = "";
        }
      }
    }
  };
  const makeButtons = () => {
    buttonsAll = document.querySelectorAll(".btn");
    for (let i = 0; i < 9; i++) {
      if (i < 3) {
        buttonsAll[i].classList.add(`button0${i}`);
        buttonsAll[i].addEventListener("click", function () {
          if (game.getActivePlayer() == game.player1) {
            board.makeMark(0, i, "x");
          } else {
            board.makeMark(0, i, "o");
          }
          updateScreen();

          game.switchActivePlayer();
          updateTurn();
          buttonsAll[i].disabled = true;
          if (game.checkWin(board.getBoard())) {
            if (game.getActivePlayer() == game.player1) {
              turnElement.textContent = `${game.getPlayer2Name()} wins!`;
            } else {
              turnElement.textContent = `${game.getPlayer1Name()} wins!`;
            }
            disableButtons();
            updateScore();

            playAgainButton.classList.remove("hidden");
          } else if (game.checkDraw(board.getBoard())) {
            turnElement.textContent = "It is a draw!";
            disableButtons();

            draws++;
            drawEl.textContent = `Draws: ${draws}`;
            playAgainButton.classList.remove("hidden");
          }
        });
      } else if (i >= 3 && i < 6) {
        buttonsAll[i].classList.add(`button1${i - 3}`);
        buttonsAll[i].addEventListener("click", function () {
          if (game.getActivePlayer() === game.player1) {
            board.makeMark(1, i - 3, "x");
          } else {
            board.makeMark(1, i - 3, "o");
          }
          updateScreen();

          game.switchActivePlayer();
          updateTurn();
          buttonsAll[i].disabled = true;
          if (game.checkWin(board.getBoard())) {
            if (game.getActivePlayer() == game.player1) {
              turnElement.textContent = `${game.getPlayer2Name()} wins!`;
            } else {
              turnElement.textContent = `${game.getPlayer1Name()} wins!`;
            }
            disableButtons();
            updateScore();

            playAgainButton.classList.remove("hidden");
          } else if (game.checkDraw(board.getBoard())) {
            turnElement.textContent = "It is a draw!";
            disableButtons();

            draws++;
            drawEl.textContent = `Draws: ${draws}`;
            playAgainButton.classList.remove("hidden");
          }
        });
      } else {
        buttonsAll[i].classList.add(`button2${i - 6}`);
        buttonsAll[i].addEventListener("click", function () {
          if (game.getActivePlayer() === game.player1) {
            board.makeMark(2, i - 6, "x");
          } else {
            board.makeMark(2, i - 6, "o");
          }
          updateScreen();

          game.switchActivePlayer();
          updateTurn();
          buttonsAll[i].disabled = true;
          if (game.checkWin(board.getBoard())) {
            if (game.getActivePlayer() == game.player1) {
              turnElement.textContent = `${game.getPlayer2Name()} wins!`;
            } else {
              turnElement.textContent = `${game.getPlayer1Name()} wins!`;
            }
            disableButtons();
            updateScore();

            playAgainButton.classList.remove("hidden");
          } else if (game.checkDraw(board.getBoard())) {
            turnElement.textContent = "It is a draw!";
            disableButtons();

            draws++;
            drawEl.textContent = `Draws: ${draws}`;
            playAgainButton.classList.remove("hidden");
          }
        });
      }
    }
  };

  const disableButtons = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const currentButton = document.querySelector(`.button${i}${j}`);
        currentButton.disabled = true;
      }
    }
  };

  const enableButtons = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const currentButton = document.querySelector(`.button${i}${j}`);
        currentButton.disabled = false;
      }
    }
  };
  const updateScore = () => {
    if (game.getActivePlayer() === game.player1) {
      game.incrementPlayer2Score();
      player2ScoreEl.textContent = `${game.getPlayer2Name()}: ${game.getPlayer2Score()}`;
    } else {
      game.incrementPlayer1Score();
      player1ScoreEl.textContent = `${game.getPlayer1Name()}: ${game.getPlayer1Score()}`;
    }
    console.log("Update score");
  };

  const resetGame = () => {
    board.resetBoard();
    updateScreen();
    playAgainButton.classList.add("hidden");
    enableButtons();
    turnElement.textContent = `It is ${game.getPlayer1Name()}'s turn`;

    if (game.getActivePlayer() === game.player2) {
      game.switchActivePlayer();
    }
  };

  playAgainButton.addEventListener("click", function () {
    resetGame();
  });

  makeButtons();
  console.log(buttonsAll);
}
modalEl.showModal();
ScreenUpdater();
