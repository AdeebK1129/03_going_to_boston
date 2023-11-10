/** 
 * 
document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let userRounds = document.getElementById("rounds").value;
    if (userRounds % 2 == 0) {
        alert("Number of rounds must be odd");
    }
    else {

    }
});

*/

const playerInfo = document.querySelector("#prompt");
let player1Score = document.getElementById("p1score");
let player1Wins = document.getElementById("p1Wins");
let player2Score = document.getElementById("p2score");
let player2Wins = document.getElementById("p2Wins");
let userRounds = document.getElementById("rounds").value;
const gameInfo_class_list = document.querySelector(".gameInfo").classList; 


function startGame() {
    let counter = 0;
    gameInfo_class_list.remove("hidden"); 
}


function isValid() {
    let userRounds = document.getElementById("rounds").value;
    if (userRounds % 2 == 0) {
        alert("Number of rounds must be odd");
    }
    else {
        startGame();
    }

}

document.getElementById("submit").addEventListener("click", isValid);