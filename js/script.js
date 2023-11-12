const roundDisplay = document.querySelector("#roundNum");
let userRounds = 0;
const player1FirstRoll = document.querySelector("#p1roll");
const player2FirstRoll = document.querySelector("#p2roll");
const player1Score = document.getElementById("p1score");
const player1Wins = document.getElementById("p1wins");
const player2Score = document.getElementById("p2score");
const player2Wins = document.getElementById("p2wins");
const dice = document.getElementById("dice");
const gameInfoClassList = document.querySelector(".gameInfo").classList;
const roundsClassList = document.querySelector(".starting").classList;
const turnsClassList = document.querySelector(".turns").classList;
const continueClassList = document.querySelector("#continue").classList;
const rollClassList = document.querySelector("#roll").classList;
const rollButton = document.getElementById("roll");
let currentPlayer = 0;
let rollNum = 0;
let curRound = 1;
let p1TotalScore = 0;
let p2TotalScore = 0;
let p1RoundWins = 0;
let p2RoundWins = 0;
let turnCount = 0;
let totalTurnCount = 0;

function startGame() {
    roundsClassList.add("hidden");
    turnsClassList.remove("hidden");
    roundDisplay.textContent = `Round 1 of ${userRounds}`;
}

function isValid() {
    userRounds = document.getElementById("rounds").value;
    if (userRounds % 2 === 0) {
        alert("Number of rounds must be odd");
    } else {
        startGame();
    }
}

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const rollDice = () => getRandomNumber(1, 6);

function decideTurn() {
    let p1roll = rollDice();
    let p2roll = rollDice();
    player1FirstRoll.textContent = `Player 1 Roll:  ${p1roll}`;
    player2FirstRoll.textContent = `Player 2 Roll:  ${p2roll}`;
    if (p1roll == p2roll) {
        document.getElementById("prompt").innerHTML = "Roll Again";
    } else if (p1roll > p2roll) {
        document.getElementById("prompt").innerHTML = "Player 1 will start";
        currentPlayer = 1;
        continueClassList.remove("hidden");
    } else {
        document.getElementById("prompt").innerHTML = "Player 2 will start";
        currentPlayer = 2;
        continueClassList.remove("hidden");
    }
}

function gameBegin() {
    turnsClassList.add("hidden");
    gameInfoClassList.remove("hidden");
    continueClassList.add("hidden");
    document.getElementById("starter").textContent = `Player ${currentPlayer} Rolls`;
    if(rollClassList.contains("hidden")){
        rollClassList.remove("hidden")
    }
}



function turn() {
    document.getElementById("roundWinner").textContent = "";
    turnCount += 1;
    totalTurnCount += 1; 
    let rolls = [];
    
    for (let i = 0; i < 3 - rollNum; i++) {
        rolls.push(rollDice());
    }
    rollNum += 1;

    document.getElementById("dice").textContent = rolls.join(" ");
    let highestRoll = Math.max(...rolls);

    if (currentPlayer == 1) {
        document.getElementById("starter").textContent = `Player ${currentPlayer} Rolls for Round ${curRound}:`;
        p1TotalScore += highestRoll;
        player1Score.textContent = `Player 1 Score: ${p1TotalScore}`;
    } else {
        document.getElementById("starter").textContent = `Player ${currentPlayer} Rolls for Round ${curRound}:`;
        p2TotalScore += highestRoll;
        player2Score.textContent = `Player 2 Score: ${p2TotalScore}`;
    }

    if (turnCount == 3) {
        if (currentPlayer == 1) {
            currentPlayer = 2;
            turnCount = 0;
            rollNum = 0;
        } else {
            currentPlayer = 1;
            turnCount = 0;
            rollNum = 0;
        }
    }

    if (totalTurnCount == 6) {
        if (p1TotalScore > p2TotalScore) {
            p1RoundWins += 1;
            p1TotalScore = 0;
            p2TotalScore = 0;
            document.getElementById("roundWinner").textContent = `Player 1 Wins Round ${curRound}`;
            document.getElementById("p1wins").textContent = `Player 1 Rounds Won: ${p1RoundWins}`;
        } else {
            p2RoundWins += 1;
            p1TotalScore = 0;
            p2TotalScore = 0;
            document.getElementById("roundWinner").textContent = `Player 2 Wins Round ${curRound}`;
            document.getElementById("p2wins").textContent = `Player 2 Rounds Won: ${p2RoundWins}`;
        }
        totalTurnCount = 0;

        if (curRound < userRounds) {
            curRound += 1;
            roundDisplay.textContent = `Round ${curRound} of ${userRounds}`;
        } else {
            rollClassList.add("hidden");
            determineWinner();
        }
    }
}

function determineWinner(){
    if(p1RoundWins > p2RoundWins){
        document.getElementById("gameWinner").textContent = `Player 1 Wins the Game`;
    }
    else if(p2RoundWins > p1RoundWins){
        document.getElementById("gameWinner").textContent = `Player 2 Wins the Game`;
    }
    else{
        document.getElementById("gameWinner").textContent = `Draw!`;
    }
}

function restart(){
    currentPlayer = 0;
    rollNum = 0;
    curRound = 1;
    p1TotalScore = 0;
    p2TotalScore = 0;
    p1RoundWins = 0;
    p2RoundWins = 0;
    turnCount = 0;
    totalTurnCount = 0;
    if (gameInfoClassList.contains("hidden") == false) {
        gameInfoClassList.add("hidden"); 
    }
    if (roundsClassList.contains("hidden")) {
        roundsClassList.remove("hidden"); 
    }
    if (turnsClassList.contains("hidden") == false) {
        turnsClassList.add("hidden"); 
    }
    if (continueClassList.contains("hidden") == false) {
        continueClassList.add("hidden"); 
    } 
    document.getElementById("prompt").innerHTML = "";
    player1FirstRoll.textContent = "Player 1 Roll: ";
    player2FirstRoll.textContent = "Player 2 Roll: ";
    document.getElementById("gameWinner").innerHTML = "";
    document.getElementById("roundWinner").innerHTML = "";
    document.getElementById("dice").textContent = "";
    roundDisplay.innerHTML = "Round 1 of ";
    player1Score.innerHTML = "Player 1 Score:";
    player1Wins.innerHTML = "Player 1 Rounds Won:";
    player2Score.innerHTML = "Player 2 Score:";
    player2Wins.innerHTML = "Player 2 Rounds Won:";

}

document.getElementById("continue").addEventListener("click", gameBegin);

document.getElementById("turnDecider").addEventListener("click", decideTurn);

document.getElementById("submit").addEventListener("click", isValid);

document.getElementById("roll").addEventListener("click", turn);

document.getElementById("restart").addEventListener("click", restart);
