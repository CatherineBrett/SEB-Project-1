const gameGrid = document.querySelector(".game-grid");
const width = 10;
const height = 10;
const numberOfCells = width * height;
const gridCells = [];
let playerLocation = 94;

function addPlayer(location) {
  gridCells[location].classList.add("player");
}

function makeGrid() {
  for (let i = 0; i < numberOfCells; i++) {
    const cell = document.createElement("div");
    cell.innerText = i;
    gameGrid.appendChild(cell);
    gridCells.push(cell);
  }

  addPlayer(playerLocation);
}

makeGrid();

function removePlayer(location) {
  gridCells[location].classList.remove("player");
}

document.addEventListener("keydown", relocatePlayer);

function relocatePlayer(event) {
  removePlayer(playerLocation);
  if (event.keyCode === 37 && playerLocation % width !== 0) {
    playerLocation -= 1;
  } else if (event.keyCode === 38 && playerLocation >= width) {
    playerLocation -= width;
  } else if (event.keyCode === 39 && playerLocation % width !== width - 1) {
    playerLocation += 1;
  } else if (event.keyCode === 40 && playerLocation < 90) {
    playerLocation += width;
  }

  addPlayer(playerLocation);
}
