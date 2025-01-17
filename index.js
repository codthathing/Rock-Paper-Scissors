const gameButtonDetails = [
  { id: 0, buttonIcon: "./src/assets/icon-paper.svg", buttonAlt: "PAPER", buttonClass: "game-button-paper" },
  { id: 1, buttonIcon: "./src/assets/icon-scissors.svg", buttonAlt: "SCISSORS", buttonClass: "game-button-scissors" },
  { id: 2, buttonIcon: "./src/assets/icon-rock.svg", buttonAlt: "ROCK", buttonClass: "game-button-rock" },
];

function createButton(mainButtonClass, mainButtonIconClass, { buttonClass, buttonIcon, buttonAlt }) {
  return `
    <button class="${`game-button ${mainButtonClass} ${buttonClass}`}">
      <img src=${buttonIcon} loading="lazy" class=${mainButtonIconClass} alt="${`${buttonAlt} ICON`}">
    </button>
  `;
}

document.getElementById("main-game").innerHTML = gameButtonDetails.map(({ buttonIcon, buttonAlt, buttonClass }) => createButton("game-main-button", "game-main-button-icon", { buttonClass, buttonIcon, buttonAlt })).join("");

function displayMainGame(determineStyle) {
  document.getElementById("main-game").style.display = determineStyle ? "none" : "block";
}
