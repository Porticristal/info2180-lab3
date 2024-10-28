const player_X = "X";
const player_O = "O";
let x_counter = 0;
let x_counter_list = [];
let y_counter = 0;
let y_counter_list = [];
let currentPlayer = player_X;
let winnerChosen = false;  // Added winnerChosen flag

let arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

const win = (player, player_list) => {
    player_list.sort((a, b) => a - b);
    console.log(player_list + " player list");
    const win_list = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let win of win_list) {
        console.log(win + " win");
        if (arraysEqual(player_list, win)) {
            console.log(`${player} wins!`);
            return true;
        }
        let match_count = 0;
        for (let i = 0; i < win.length; i++) {
            if (player_list.includes(win[i])) {
                match_count++;
            }
            if (match_count === 3) {
                console.log(`${player} wins!`);
                return true;
            }
        }
    }

    return false;
}

document.addEventListener("DOMContentLoaded", () => {
    const squares = document.getElementById("board").querySelectorAll("div");
    squares.forEach((square, index) => {
        square.classList.add("square");
        square.addEventListener("click", () => {
            // Check if game is over or square is already filled
            if (winnerChosen || square.textContent !== "") {
                return;
            }
            if (currentPlayer === player_X) {
                x_counter_list.push(index);
                square.textContent = player_X;
                square.classList.add("X");
                x_counter += 1;
                if (x_counter >= 3) {
                    if (win(player_X, x_counter_list)) {
                        document.getElementById("status").textContent = `Congratulations! ${player_X} is the Winner!`;
                        document.getElementById("status").classList.add("you-won");
                        winnerChosen = true;  // Set winnerChosen to true when X wins
                        return;
                    }
                }
                currentPlayer = player_O;
            } else if (currentPlayer === player_O) {
                y_counter_list.push(index);
                square.textContent = player_O;
                square.classList.add("O");
                y_counter += 1;
                if (y_counter >= 3) {
                    if (win(player_O, y_counter_list)) {
                        document.getElementById("status").textContent = `Congratulations! ${player_O} is the Winner!`;
                        document.getElementById("status").classList.add("you-won");
                        winnerChosen = true;
                        return;
                    }
                }
                currentPlayer = player_X;
            }
            if ((x_counter + y_counter >= 9) && !win(player_O, y_counter_list) && !win(player_X, x_counter_list)) {
                document.getElementById("status").textContent = "Game ends in a draw!";
                winnerChosen = true;
            }
        });

        square.addEventListener("mouseover", () => {
            if (!winnerChosen && square.textContent === "") {
                square.classList.add("hover");
            }
        });

        square.addEventListener("mouseout", () => {
            square.classList.remove("hover");
        });
    });

    document.querySelector("button").addEventListener("click", () => {
        squares.forEach(square => {
            square.textContent = "";
            square.classList.remove("X", "O");
            document.getElementById("status").textContent = "";
            x_counter = 0;
            x_counter_list = [];
            y_counter = 0;
            y_counter_list = [];
            currentPlayer = player_X;
            winnerChosen = false;
            document.getElementById("status").classList.remove("you-won");
            document.getElementById("status").textContent = "Move your mouse over a square and click to play an X or an O.";
        });
    });
});