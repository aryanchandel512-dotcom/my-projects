let userScore = 0;
let comScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const comScorePara = document.querySelector("#com-score");

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissor"];
    return options[Math.floor(Math.random() * 3)];
};

const drawGame = () => {
    msg.innerText = "Game was Draw!";
    console.log("Draw! Both chose the same.");
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = "You Win !! ";
        console.log(`User chose: ${userChoice}, Computer chose: ${compChoice} → User Wins!`);
    } else {
        comScore++;
        comScorePara.innerText = comScore;
        msg.innerText = "Computer Wins !!";
        console.log(`User chose: ${userChoice}, Computer chose: ${compChoice} → Computer Wins!`);
    }
};

const playGame = (userChoice) => {
    const compChoice = genComputerChoice();

    console.log("User clicked:", userChoice);
    console.log("Computer chose:", compChoice);

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin;
        if (userChoice === "rock") userWin = compChoice === "scissor";
        if (userChoice === "paper") userWin = compChoice === "rock";
        if (userChoice === "scissor") userWin = compChoice === "paper";
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});



// JSON javascript object notation  Api application programing interface 