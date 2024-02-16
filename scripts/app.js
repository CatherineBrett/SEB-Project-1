const gameGrid = document.querySelector(".game-grid");
const width = 10;
const numberOfCells = width * width;
const gridCells = [];

function makeGrid() {
  for (let i = 0; i < numberOfCells; i++) {
    const gridCell = document.createElement("div");
    gridCell.innerText = i;
    gameGrid.appendChild(gridCell);
    gridCells.push(gridCell);
  }
}

makeGrid();
