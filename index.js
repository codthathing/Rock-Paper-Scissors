const gameButtonDetails = [
  { id: 0, buttonIcon: "./src/assets/icon-paper.svg", buttonAlt: "PAPER", buttonClass: "game-button-paper" },
  { id: 1, buttonIcon: "./src/assets/icon-scissors.svg", buttonAlt: "SCISSORS", buttonClass: "game-button-scissors" },
  { id: 2, buttonIcon: "./src/assets/icon-rock.svg", buttonAlt: "ROCK", buttonClass: "game-button-rock" },
];

let gameResult = sessionStorage.getItem("GAME_RESULT") || 12;
function updateSessionStorage() {
  sessionStorage.setItem("GAME_RESULT", gameResult);
  document.getElementById("score-value").innerHTML = gameResult;
}
updateSessionStorage();

function createButton(mainButtonClass, mainButtonIconClass, { buttonClass, buttonIcon, buttonAlt }, buttonFunction) {
  return `
    <button onclick="${buttonFunction}" class="${`game-button ${mainButtonClass} ${buttonClass ? buttonClass : ""}`}">
      ${buttonIcon ? `<img src=${buttonIcon} loading="lazy" class=${mainButtonIconClass} alt="${`${buttonAlt} ICON`}">` : ""} 
    </button>
  `;
}

document.getElementById("main-game").innerHTML = gameButtonDetails.map(({ id, buttonIcon, buttonAlt, buttonClass }) => createButton("game-main-button", "game-main-button-icon", { buttonClass, buttonIcon, buttonAlt }, `getButtonDetails(${id})`)).join("");

function displayMainGame(determineStyle) {
  document.getElementById("main-game").style.display = determineStyle ? "none" : "block";
  document.getElementById("main-game-outcome").style.display = determineStyle ? "flex" : "none";
}

let gameOutcomeButtonDetails = { gameOutcome: "", restartButton: "PLAY AGAIN", buttonArray: [] };
function getButtonDetails(id) {
  const buttonDetails = gameButtonDetails.find((button) => button.id === id);
  gameOutcomeButtonDetails.buttonArray.push({ ...buttonDetails, buttonText: "YOU PICKED" });
  gameOutcomeButtonDetails.buttonArray = gameOutcomeButtonDetails.buttonArray.concat(Array(2 - gameOutcomeButtonDetails.buttonArray.length).fill({ buttonText: "THE HOUSE PICKED", buttonClass: "game-outcome-default-div" }));
  displayGameOutcome(gameOutcomeButtonDetails.buttonArray);
  displayMainGame(true);
  determineHouseButton();
}

function displayGameOutcome(outcomeArray) {
  document.getElementById("main-game-outcome").innerHTML = outcomeArray.map(({ buttonText, buttonClass, buttonIcon, buttonAlt }) => {
    return `
      <div class="game-outcome-div">
        <p class="game-outcome-text">${buttonText}</p>
        ${createButton("game-outcome-button", "game-outcome-button-icon", { buttonClass, buttonIcon, buttonAlt })}
      </div>
    `;
  }).join("");
}

function determineHouseButton() {
  const generatedButtonNumber = Math.floor(Math.random() * 3);
  const timeout = setTimeout(() => {
    const houseButton = gameButtonDetails.find(({ id }) => id === generatedButtonNumber);
    gameOutcomeButtonDetails.buttonArray = gameOutcomeButtonDetails.buttonArray.map((outcomeButton) => (outcomeButton.buttonText === "THE HOUSE PICKED" ? { ...outcomeButton, ...houseButton, buttonClass: houseButton.buttonClass } : outcomeButton));
    displayGameOutcome(gameOutcomeButtonDetails.buttonArray);
    determineOutcomeResult();
    clearTimeout(timeout);
  }, 3000);
}

function addResultDiv(result, button) {
  document.getElementById("main-game-outcome").innerHTML += `
    <div id="game-outcome-result-div">
      <h1 id="game-result-text">${result}</h1>
      <button type="button" onclick="restartGame()" id="game-play-again-button">${button}</button>
    </div>
  `;
}

function determineOutcomeResult() {
  const userButton = gameOutcomeButtonDetails.buttonArray.find(({ buttonText }) => buttonText === "YOU PICKED").buttonAlt;
  const houseButton = gameOutcomeButtonDetails.buttonArray.find(({ buttonText }) => buttonText === "THE HOUSE PICKED").buttonAlt;
  if ((userButton === "SCISSORS" && houseButton === "PAPER") || (userButton === "PAPER" && houseButton === "ROCK") || (userButton === "ROCK" && houseButton === "SCISSORS")) {
    gameOutcomeButtonDetails.gameOutcome = "YOU WIN";
    gameResult ++;
  } else if ((houseButton === "SCISSORS" && userButton === "PAPER") || (houseButton === "PAPER" && userButton === "ROCK") || (houseButton === "ROCK" && userButton === "SCISSORS")) {
    gameOutcomeButtonDetails.gameOutcome = "YOU LOSE";
    gameResult --;
  } else {
    gameOutcomeButtonDetails.gameOutcome = "TIE!";
  };
  if(gameResult === 0) gameOutcomeButtonDetails.restartButton = "RESTART";
  updateSessionStorage();
  addResultDiv(gameOutcomeButtonDetails.gameOutcome, gameOutcomeButtonDetails.restartButton);
}

function restartGame() {
  if(gameResult === 0) {
    gameResult = 12;
    updateSessionStorage();
  };
  displayMainGame(false);
  document.getElementById("main-game-outcome").innerHTML = "";
  gameOutcomeButtonDetails = { restartButton: "PLAY AGAIN", gameOutcome: "", buttonArray: [] };
}
