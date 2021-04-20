let currentSym = null;
let counter = 0;
document.body.append(createArea());
let elements = document.querySelectorAll(".cage");

function createArea() {
  currentSym = "O";
  const area = document.createElement("div");
  area.classList.add("area");
  area.addEventListener("click", handleArea);
  for (let i = 0; i < 9; i++) {
    area.append(createCage());
  }
  return area;
}

function createCage() {
  const cage = document.createElement("div");
  cage.classList.add("cage");
  return cage;
}

function handleArea(e) {
  if (e.target.classList.contains("cage") && e.target.innerText === "") {
    counter++;
    setSymToCage(e.target);
    checkEndGame();
  }
}

function setSymToCage(element) {
  element.innerText =
    currentSym === "X" ? (currentSym = "O") : (currentSym = "X");
}

function checkEndGame() {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let combination of combinations) {
    if (
      (elements[combination[0]].innerText === "X" &&
        elements[combination[1]].innerText === "X" &&
        elements[combination[2]].innerText === "X") ||
      (elements[combination[0]].innerText === "O" &&
        elements[combination[1]].innerText === "O" &&
        elements[combination[2]].innerText === "O")
    ) {
      setTimeout(() => {
        hideGameArea();
      });

      return;
    }
  }
  if (counter === 9) {
    currentSym = "N";
    setTimeout(() => {
      hideGameArea();
    });
  }
}

function hideGameArea() {
  const area = document.querySelector(".area");
  area.removeEventListener("click", handleArea);
  area.remove();
  counter = 0;
  showWinnerScreen();
}

function showWinnerScreen() {
  document.body.append(createWinnerScreen());
}

function createWinnerScreen() {
  const winnerScreen = document.createElement("div");
  winnerScreen.classList.add("winner-screen");

  const winnerScreenTitle = document.createElement("h2");
  winnerScreenTitle.innerText = checkWinner();

  const winnerName = document.createElement("h3");
  winnerName.innerText = "Game Over";

  const button = document.createElement("button");
  button.innerText = "Restart";

  button.addEventListener("click", handleButton);
  winnerScreen.append(winnerScreenTitle, winnerName, button);
  return winnerScreen;
}

function checkWinner() {
  switch (currentSym) {
    case "X":
      return "1st player Win";
    case "O":
      return "2st player Win";
    default:
      return "Nobody won";
  }
}

function handleButton(e) {
  const winnerScreen = document.querySelector(".winner-screen");
  winnerScreen.remove();
  const button = winnerScreen.querySelector(".winner-screen > button");
  button.removeEventListener("click", handleButton);
  document.body.append(createArea());
  elements = document.querySelectorAll(".cage");
}
