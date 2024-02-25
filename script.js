/*
 ** The gameboard represents the state of the board
 ** printBoard prints the board to the console
 ** getBoard returns the board
 */

function Gameboard() {
  const gameboard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const printBoard = () => {
    for (let i = 0; i < 3; i++) {
      console.log(
        `  ${gameboard[i][0]}  |  ${gameboard[i][1]}  |  ${gameboard[i][2]}`
      );
      if (i != 2) {
        console.log("_______________");
      }
    }
    console.log("");
    console.log("");
  };

  const getBoard = () => board;

  const makeMark = (row, column, mark) => {
    if (gameboard[row][column] != "x" && gameboard[row][column] != "o") {
      gameboard[row][column] = mark;
    }
  };

  return {
    gameboard,
    printBoard,
    getBoard,
    makeMark,
  };
}

/*
 ** Player represents each of the two players
 ** Marker is either "X" or "O";
 */

function Player(name, marker) {
  return {
    marker,
    name,
  };
}

/*
 ** The GameController controls the flow of the game
 */

function GameController() {
  const player1Name = prompt("Enter player1's name:");
  const player2Name = prompt("Enter player2's name:");
  const board = Gameboard();
  const player1 = Player(player1Name, "x");
  const player2 = Player(player2Name, "o");
  let activePlayer = player1;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  const printNewTurn = () => {
    board.printBoard();
    console.log(`${activePlayer.name}'s Turn:`);
  };

  const playRound = () => {
    printNewTurn();

    const rowAndColumn = prompt("Enter a row and column: ").split(" ");
    var row = rowAndColumn[0];
    var column = rowAndColumn[1];
    while (row < 0 || row > 2 || column < 0 || column > 2) {
      rowAndColumn = prompt("Enter a VALID row and column: ").split(" ");
      row = rowAndColumn[0];
      column = rowAndColumn[1];
    }

    board.makeMark(row, column, activePlayer.marker);
    switchActivePlayer();
  };

  const checkGameOver = () => {
    let gameOver = false;

    //check rows
    for (let i = 0; i < 3; i++) {
      if (
        board.gameboard[i][0] != "" &&
        board.gameboard[i][1] != "" &&
        board.gameboard[i][2] != ""
      ) {
        if (
          board.gameboard[i][0] === board.gameboard[i][1] &&
          board.gameboard[i][1] === board.gameboard[i][2]
        ) {
          gameOver = true;
        }
      }
    }

    //check columns
    for (let i = 0; i < 3; i++) {
      if (
        board.gameboard[0][i] != "" &&
        board.gameboard[1][i] != "" &&
        board.gameboard[2][i] != ""
      ) {
        if (
          board.gameboard[0][i] === board.gameboard[1][i] &&
          board.gameboard[1][i] === board.gameboard[2][i]
        ) {
          gameOver = true;
        }
      }
    }

    //check diagonals

    if (
      board.gameboard[0][0] === board.gameboard[1][1] &&
      board.gameboard[1][1] === board.gameboard[2][2] &&
      board.gameboard[0][0] != ""
    ) {
      gameOver = true;
    }

    if (
      board.gameboard[0][2] === board.gameboard[1][1] &&
      board.gameboard[1][1] === board.gameboard[2][0] &&
      board.gameboard[0][2] != ""
    ) {
      gameOver = true;
    }
    if (gameOver === true) {
      board.printBoard();
    }

    return gameOver;
  };

  return { playRound, checkGameOver };
}

game = GameController();

while (!game.checkGameOver()) {
  game.playRound();
}

console.log("Game over!");
