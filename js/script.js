function isValid() {
    let userRounds = document.getElementById("rounds").value;
    if (userRounds % 2 == 0) {
        alert("Number of rounds must be odd");
    }
    else {

    }

}


document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let userRounds = document.getElementById("rounds").value;
    if (userRounds % 2 == 0) {
        alert("Number of rounds must be odd");
    }
    else {

    }
});