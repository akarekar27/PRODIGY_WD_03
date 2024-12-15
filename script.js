const boxes = document.querySelectorAll(".box");
const startGameButton = document.querySelector("#start-game");
const startScreen = document.querySelector("#start-screen");
const gameContainer = document.querySelector("#game-container");
const playAgainButton = document.querySelector("#play-again");
const results = document.querySelector("#results");

let turn = "X";
let isGameOver = false;

startGameButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameContainer.style.display = "block";
});

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!isGameOver && box.innerHTML === "") {
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.querySelector(".bg").style.left = turn === "X" ? "0" : "100px";
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    winConditions.forEach((combo) => {
        const [a, b, c] = combo;
        if (
            boxes[a].innerHTML &&
            boxes[a].innerHTML === boxes[b].innerHTML &&
            boxes[a].innerHTML === boxes[c].innerHTML
        ) {
            isGameOver = true;
            results.innerHTML = `${turn} Wins!`;
            playAgainButton.style.display = "inline";
            combo.forEach((index) => boxes[index].classList.add("win"));
        }
    });
}

function checkDraw() {
    if ([...boxes].every((box) => box.innerHTML !== "") && !isGameOver) {
        isGameOver = true;
        results.innerHTML = "It's a Draw!";
        playAgainButton.style.display = "inline";
    }
}

playAgainButton.addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    results.innerHTML = "";
    playAgainButton.style.display = "none";
    document.querySelector(".bg").style.left = "0";
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.classList.remove("win");
    });
});
