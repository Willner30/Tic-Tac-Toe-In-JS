const player1 = "X";
const player2 = "O";
const gameState = ["", "", "", "", "", "", "", "", ""];
const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var currentTurn = player1;

function restartButton () {
    gameState.splice();
    let deleter = document.getElementsByClassName('grid');

    for (let i = 0; i < deleter.length; i++){
        deleter[i].innerHTML = "";
    }

    window.location.reload();

    confirm("Are you sure you want to restart the game?");
    return;
}

function changeTurn (){
    if (currentTurn === player1) {
        currentTurn = player2;
    } else {
        currentTurn = player1;
    }
}


function play (elementId){

    function restartButton () {
        let deleter = document.getElementsByClassName('grid');
        for (let i = 0; i < deleter.length; i++){
            deleter[i].innerHTML = "";
        }
        
        window.location.reload();

        alert("A new game will start!");
        return;
    }

    function savePlay (){
        const data = document.getElementById(elementId).dataset.value;
        const id = parseInt(data);        
        if (gameState[id] !== "") {
            return;
        }
        gameState[id] = currentTurn;
    }

    function currentTurnWon() {
        // check gameState to check if X or O won
        const winner = currentTurn;

        for (let i = 0; i <= 7; i++){
        const checkWins = winConditions[i];
        let check1 = gameState[checkWins[0]];
        let check2 = gameState[checkWins[1]];
        let check3 = gameState[checkWins[2]];

        if (check1 === '' || check1 ===  '' || check3 === ''){
            continue;
        } else if(check1 === check2 && check1 === check3){
            alert(`${winner} won!!!`);
            restartButton();
            break; 
            } else if (!gameState.includes("")){
                alert(`It's a draw!`);
                restartButton();
                break; 
            }
        }
    }

    if(document.getElementById(elementId).innerHTML === ""){ 
        document.getElementById(elementId).innerHTML = currentTurn;
        savePlay();
        currentTurnWon()
        changeTurn();
    }
}

