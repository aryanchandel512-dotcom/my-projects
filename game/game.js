

document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell"),
        statusText = document.getElementById("status"),
        restartBtn = document.getElementById("restartBtn"),
        winLine = document.getElementById("win-line"),
        gameBox = document.querySelector(".game");

    let player1, player2, currentPlayer, gameActive, gameState;

    const winningConditions = [
        { c: [0, 1, 2], r: 0 }, { c: [3, 4, 5], r: 0 }, { c: [6, 7, 8], r: 0 },
        { c: [0, 3, 6], r: 90 }, { c: [1, 4, 7], r: 90 }, { c: [2, 5, 8], r: 90 },
        { c: [0, 4, 8], r: 45 }, { c: [2, 4, 6], r: -45 }
    ];

    const initGame = () => {
        gameActive = true;
        gameState = Array(9).fill("");
        cells.forEach(c => c.textContent = "");
        winLine.style.display = 'none';
        let choice = prompt("Player 1: Choose X or O")?.toUpperCase() || "X";
        while (!["X", "O"].includes(choice)) choice = prompt("Choose X or O")?.toUpperCase() || "X";
        player1 = choice; player2 = choice === "X" ? "O" : "X"; currentPlayer = player1;
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    };

    const handleClick = e => {
        const i = e.currentTarget.dataset.index;
        if (!gameActive || gameState[i]) return;
        gameState[i] = currentPlayer;
        e.currentTarget.textContent = currentPlayer;
        checkWinner();
    };

    const checkWinner = () => {
        let won = false;
        for (const { c: [a, b, c], r } of winningConditions)
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                won = true; drawLine(a, c, r); break;
            }
        if (won) { statusText.textContent = `Player ${currentPlayer} Wins!`; gameActive = false; }
        else if (!gameState.includes("")) { statusText.textContent = "It's a Draw!"; gameActive = false; }
        else { currentPlayer = currentPlayer === player1 ? player2 : player1; statusText.textContent = `Player ${currentPlayer}'s Turn`; winLine.style.display = 'none'; }
    };

   const drawLine = (s, e, r) => {
  const gameRect = gameBox.getBoundingClientRect(),
        startRect = cells[s].getBoundingClientRect(),
        endRect = cells[e].getBoundingClientRect();

  const startX = startRect.left + startRect.width / 2 - gameRect.left;
  const startY = startRect.top + startRect.height / 2 - gameRect.top;

  const endX = endRect.left + endRect.width / 2 - gameRect.left;
  const endY = endRect.top + endRect.height / 2 - gameRect.top;

  const length = Math.hypot(endX - startX, endY - startY);

  winLine.style.position = "absolute";
  winLine.style.top = startY + "px";
  winLine.style.left = startX + "px";
  winLine.style.width = length + "px";
  winLine.style.transformOrigin = "0 50%";
  winLine.style.transform = `rotate(${r}deg)`;
  winLine.style.display = "block";
};
    cells.forEach(c => c.addEventListener("click", handleClick));
    restartBtn.addEventListener("click", initGame);
    initGame();
});

