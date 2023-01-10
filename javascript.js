const player1 = "X";
const player2 = "O";
let gameState = ["", "", "", "", "", "", "", "", ""]; //This array saves the plays for 'X' or 'O' throughout the game
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; //Those are the conditions that must be met for a win, if they aren't met and the gameboard is full, then it's a draw
let currentTurn = player1;
let cpuPlaying = false;

document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      alert("You are going to be playing against the CPU now!");
      cpuPlaying = true;
    } else {
      cpuPlaying = false;
    }
  });
}); //if the switch for the CPU is clicked, this verifies if it was turned on or turned off then triggers an action depending on the state of the switch

function cpuPlay () {
  //this function creates a 'while loop' that generates a random integer number that will be used a position on the board. If that position has been played, then it generates another number until it finds one that hasn't been played yet
  currentTurn = player2;
    const cells = document.querySelectorAll("p");
    var cpuTurn = Math.floor(Math.random() * 9);
  
    while (gameState[cpuTurn] !== "") {
      cpuTurn = Math.floor(Math.random() * 9);
    }
    cells[cpuTurn].innerHTML = player2;
    gameState[cpuTurn] = player2;
    currentTurnWon();
    currentTurn = player1;
} 

function restartButton() {
  //this function creates a 'for loop' that "deletes" every play on the board and sets gameState to its default value
  let deleter = document.getElementsByClassName("grid");
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentTurn = player1;

  for (let i = 0; i < deleter.length; i++) {
    deleter[i].innerHTML = "";
  }

  return;
}

function changeTurn() {
  //as the name indicates, this function just changes the turn of the players, depending on who was the last one that made a move
  if (currentTurn === player1) {
    currentTurn = player2;
  } else{
    currentTurn = player1;
  }
}

function currentTurnWon() {
  // checks gameState to check if X or O won or if it's a draw
  const winner = currentTurn;

  changeTurn();

  for (let i = 0; i <= 7; i++) {
    const checkWins = winConditions[i];
    const check1 = gameState[checkWins[0]];
    const check2 = gameState[checkWins[1]];
    const check3 = gameState[checkWins[2]];

    if (check1 === "" || check1 === "" || check3 === "") {
      continue;
    } else if (check1 === check2 && check1 === check3) {
      alert(`${winner} won!!!`);
      restartButton();
      break;
    }
  }  

  if (!gameState.includes("")) {
    alert("It's a draw!");
    restartButton();
    return;
  } else if (cpuPlaying == true && currentTurn === player2) {
    setTimeout(cpuPlay, 100);
  }
}

function play(elementId) {
  //and this is the last function, this one gets the data-value from the grid that was clicked on, checks if it's empty (if it is, then it can procede), saves the play on the gameState array and finally it changes the text on the grid to the current turn
  function savePlay() {
    const data = document.getElementById(elementId).dataset.value;
    const id = parseInt(data);
    if (gameState[id] !== "") {
      return;
    }

    gameState[id] = currentTurn;
  }

  if (document.getElementById(elementId).innerHTML === "") {
    document.getElementById(elementId).innerHTML = currentTurn;
    savePlay();
    currentTurnWon();
  }
}
