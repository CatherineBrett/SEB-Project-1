const gameGrid = document.querySelector(".game-grid");
const width = 10;
const height = 10;
const numberOfCells = width * height;
const gridCells = [];
let playerLocation = 90;
let obstacleOneLocation = 89;
let obstacleTwoLocation = 70;
let obstacleThreeLocation = 69;
let obstacleFourLocation = 30;
let obstacleFiveLocation = 29;
let obstacleSixLocation = 10;
let obstacleOneTimer = null;
let obstacleTwoTimer = null;
const startButton = document.getElementById("start");
let obstacleSpeed = 500;
let lives = 3;
const livesTracker = document.getElementById("lives-tracker");
let score = 0;
const scoreBoard = document.getElementById("scoreboard");

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

// 37 is left, 38 is up, 39 is right, 40 is down
function relocatePlayer(event) {
  removePlayer(playerLocation);
  if (event.keyCode === 37 && playerLocation % width !== 0) {
    playerLocation -= 1;
  } else if (event.keyCode === 38 && playerLocation >= height) {
    playerLocation -= height;
    score += 10;
    scoreBoard.textContent = score;
  } else if (event.keyCode === 39 && playerLocation % width !== width - 1) {
    playerLocation += 1;
  } else if (event.keyCode === 40 && playerLocation < 90) {
    playerLocation += height;
  }

  addPlayer(playerLocation);
}

function detectOb1Collision() {
  if (gridCells[obstacleOneLocation].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 1!");
    clearInterval(obstacleOneTimer);
  }
}

function detectOb2Collision() {
  if (gridCells[obstacleTwoLocation].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 2!");
    clearInterval(obstacleTwoTimer);
  }
}

function moveObstacleOneLeft() {
  obstacleOneTimer = setInterval(() => {
    gridCells[obstacleOneLocation].classList.add("purple-car");
    detectOb1Collision();
    if (obstacleOneLocation === 80) {
      clearInterval(obstacleOneTimer);
    } else {
      gridCells[obstacleOneLocation].classList.remove("purple-car");
      obstacleOneLocation--;
      gridCells[obstacleOneLocation].classList.add("purple-car");
    }
  }, obstacleSpeed);
}

moveObstacleOneLeft();

function moveObstacleTwoRight() {
  obstacleTwoTimer = setInterval(() => {
    gridCells[obstacleTwoLocation].classList.add("green-car");
    detectOb2Collision();
    if (obstacleTwoLocation === 79) {
      clearInterval(obstacleTwoTimer);
    } else {
      gridCells[obstacleTwoLocation].classList.remove("green-car");
      obstacleTwoLocation++;
      gridCells[obstacleTwoLocation].classList.add("green-car");
    }
  }, obstacleSpeed);
}

moveObstacleTwoRight();

function startGame() {}

startButton.addEventListener("click", startGame);
document.addEventListener("keydown", relocatePlayer);
