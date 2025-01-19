const gameButtonDetails = [
  { id: 0, buttonIcon: "./src/assets/icon-paper.svg", buttonAlt: "PAPER", buttonClass: "game-button-paper" },
  { id: 1, buttonIcon: "./src/assets/icon-scissors.svg", buttonAlt: "SCISSORS", buttonClass: "game-button-scissors" },
  { id: 2, buttonIcon: "./src/assets/icon-rock.svg", buttonAlt: "ROCK", buttonClass: "game-button-rock" },
];

function createButton(mainButtonClass, mainButtonIconClass, buttonFunction, { buttonClass, buttonIcon, buttonAlt }) {
  return `
    <button onclick="${buttonFunction}" class="${`game-button ${mainButtonClass} ${buttonClass}`}">
      <img src=${buttonIcon} loading="lazy" class=${mainButtonIconClass} alt="${`${buttonAlt} ICON`}">
    </button>
  `;
}

document.getElementById("main-game").innerHTML = gameButtonDetails.map(({ id, buttonIcon, buttonAlt, buttonClass }) => createButton("game-main-button", "game-main-button-icon", `getButtonDetails(${id})`, { buttonClass, buttonIcon, buttonAlt })).join("");

function displayMainGame(determineStyle) {
  document.getElementById("main-game").style.display = determineStyle ? "none" : "block";
  document.getElementById("main-game-outcome").style.display = determineStyle ? "flex" : "none";
}

let gameOutcomeButtonDetails = [];
gameOutcomeButtonDetails = gameOutcomeButtonDetails.concat(Array(2 - gameOutcomeButtonDetails.length).fill({buttonText: "THE HOUSE PICKED", buttonClass: "game-outcome-default-div"}));

function getButtonDetails(id) {
  
}
