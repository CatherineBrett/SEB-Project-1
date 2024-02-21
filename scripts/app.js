const gameGrid = document.querySelector(".game-grid");
const width = 10;
const height = 10;
const numberOfCells = width * height;
const gridCells = [];
const playerStartLocation = 94;
let playerLocation = playerStartLocation;
let obstacle1Location = 89;
let obstacle2Location = 71;
let obstacle3Location = 67;
let obstacle4Location = 33;
let obstacle5Location = 25;
let obstacle6Location = 15;
let obstacle1Timer = null;
let obstacle2Timer = null;
let obstacle3Timer = null;
let obstacle4Timer = null;
let obstacle5Timer = null;
let obstacle6Timer = null;
const startButton = document.getElementById("start");
let obstacleSpeed = 2000;
let lilyCell = null;
let lives = 3;
const livesTracker = document.getElementById("lives-tracker");
let score = 0;
const scoreBoard = document.getElementById("scoreboard");

function addPlayer(location) {
  gridCells[location].classList.add("player");
}

function addFlies() {}

function addLilyPad() {
  lilyCell = gridCells[Math.floor(Math.random() * width)];
  lilyCell.classList.add("lily-pad");
}

function makeGrid() {
  for (let i = 0; i < numberOfCells; i++) {
    const cell = document.createElement("div");
    cell.innerText = i;
    gameGrid.appendChild(cell);
    gridCells.push(cell);
  }

  addPlayer(playerStartLocation);
  addLilyPad();
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
  frogIsHome();
}

function detectOb1Collision() {
  if (gridCells[obstacle1Location].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 1!");
    clearInterval(obstacle1Timer);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "😭";
  }
}

function detectOb2Collision() {
  if (gridCells[obstacle2Location].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 2!");
    clearInterval(obstacle2Timer);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "😭 (R.I.P.)";
  }
}

function detectOb3Collision() {
  if (gridCells[obstacle3Location].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 3!");
    clearInterval(obstacle3Timer);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "😭 (R.I.P.)";
  }
}

function detectOb4Collision() {
  if (gridCells[obstacle4Location].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 4!");
    clearInterval(obstacle4Timer);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "😭 (R.I.P.)";
  }
}

function detectOb5Collision() {
  if (gridCells[obstacle5Location].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 5!");
    clearInterval(obstacle5Timer);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "😭";
  }
}
function detectOb6Collision() {
  if (gridCells[obstacle6Location].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 6!");
    clearInterval(obstacle6Timer);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "😭";
  }
}

function frogIsHome() {
  if (lilyCell.classList.contains("player")) {
    console.log("Hooray, you made it!");
    lilyCell.classList.remove("player", "lily-pad");
    lilyCell.classList.add("home");
    score += 60;
    scoreBoard.textContent = score;
    playerLocation = playerStartLocation;
    addPlayer(playerLocation);
  }
}

function moveObstacle1Left() {
  obstacle1Timer = setInterval(() => {
    gridCells[obstacle1Location].classList.add("purple-car");
    detectOb1Collision();
    if (obstacle1Location === 80) {
      clearInterval(obstacle1Timer);
    } else {
      gridCells[obstacle1Location].classList.remove("purple-car");
      obstacle1Location--;
      gridCells[obstacle1Location].classList.add("purple-car");
    }
  }, obstacleSpeed);
}

moveObstacle1Left();

function moveObstacle2Right() {
  obstacle2Timer = setInterval(() => {
    gridCells[obstacle2Location].classList.add("green-car");
    detectOb2Collision();
    if (obstacle2Location === 79) {
      clearInterval(obstacle2Timer);
    } else {
      gridCells[obstacle2Location].classList.remove("green-car");
      obstacle2Location++;
      gridCells[obstacle2Location].classList.add("green-car");
    }
  }, obstacleSpeed);
}

moveObstacle2Right();

function moveObstacle3Left() {
  obstacle3Timer = setInterval(() => {
    gridCells[obstacle3Location].classList.add("minibus");
    detectOb3Collision();
    if (obstacle3Location === 60) {
      clearInterval(obstacle3Timer);
    } else {
      gridCells[obstacle3Location].classList.remove("minibus");
      obstacle3Location--;
      gridCells[obstacle3Location].classList.add("minibus");
    }
  }, obstacleSpeed);
}

moveObstacle3Left();

function moveObstacle4Right() {
  obstacle4Timer = setInterval(() => {
    gridCells[obstacle4Location].classList.add("bus");
    detectOb4Collision();
    if (obstacle4Location === 39) {
      clearInterval(obstacle4Timer);
    } else {
      gridCells[obstacle4Location].classList.remove("bus");
      obstacle4Location++;
      gridCells[obstacle4Location].classList.add("bus");
    }
  }, obstacleSpeed);
}

moveObstacle4Right();

function moveObstacle5Left() {
  obstacle5Timer = setInterval(() => {
    gridCells[obstacle5Location].classList.add("truck");
    detectOb5Collision();
    if (obstacle5Location === 20) {
      clearInterval(obstacle5Timer);
    } else {
      gridCells[obstacle5Location].classList.remove("truck");
      obstacle5Location--;
      gridCells[obstacle5Location].classList.add("truck");
    }
  }, obstacleSpeed);
}

moveObstacle5Left();

function moveObstacle6Right() {
  obstacle6Timer = setInterval(() => {
    gridCells[obstacle6Location].classList.add("tank");
    detectOb6Collision();
    if (obstacle6Location === 19) {
      clearInterval(obstacle6Timer);
    } else {
      gridCells[obstacle6Location].classList.remove("tank");
      obstacle6Location++;
      gridCells[obstacle6Location].classList.add("tank");
    }
  }, obstacleSpeed);
}

moveObstacle6Right();

function startGame() {}

startButton.addEventListener("click", startGame);
document.addEventListener("keydown", relocatePlayer);
