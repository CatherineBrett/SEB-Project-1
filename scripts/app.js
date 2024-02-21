const gameGrid = document.querySelector(".game-grid");
const width = 10;
const height = 10;
const numberOfCells = width * height;
const gridCells = [];
const playerStartLocation = 94;
let playerLocation = playerStartLocation;
const obsOneStart = 89;
let obsOneLocation = obsOneStart;
const obsTwoStart = 70;
let obsTwoLocation = obsTwoStart;
const obsThreeStart = 69;
let obsThreeLocation = obsThreeStart;
const obsFourStart = 30;
let obsFourLocation = obsFourStart;
const obsFiveStart = 29;
let obsFiveLocation = obsFiveStart;
const obsSixStart = 10;
let obsSixLocation = obsSixStart;
let obstacle1Timer = null;
let obstacle2Timer = null;
let obstacle3Timer = null;
let obstacle4Timer = null;
let obstacle5Timer = null;
let obstacle6Timer = null;
const startButton = document.getElementById("start");
let obstacleSpeed = 1000;
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
  if (gridCells[obsOneLocation].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 1!");
    clearInterval(obstacle1Timer);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "😭";
  }
}

function detectOb2Collision() {
  if (gridCells[obsTwoLocation].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 2!");
    clearInterval(obstacle2Timer);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "😭 (R.I.P.)";
  }
}

function detectOb3Collision() {
  if (gridCells[obsThreeLocation].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 3!");
    clearInterval(obstacle3Timer);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "😭 (R.I.P.)";
  }
}

function detectOb4Collision() {
  if (gridCells[obsFourLocation].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 4!");
    clearInterval(obstacle4Timer);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "😭 (R.I.P.)";
  }
}

function detectOb5Collision() {
  if (gridCells[obsFiveLocation].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 5!");
    clearInterval(obstacle5Timer);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "😭";
  }
}
function detectOb6Collision() {
  if (gridCells[obsSixLocation].classList.contains("player")) {
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
    gridCells[obsOneLocation].classList.add("purple-car");
    detectOb1Collision();
    if (obsOneLocation % width === 0) {
      gridCells[obsOneLocation].classList.remove("purple-car");
      obsOneLocation = obsOneStart;
    } else {
      gridCells[obsOneLocation].classList.remove("purple-car");
      obsOneLocation--;
      // I don't understand why the line below needs to be there, but the obstacle doesn't appear without it.
      gridCells[obsOneLocation].classList.add("purple-car");
    }
  }, obstacleSpeed);
}

moveObstacle1Left();

function moveObstacle2Right() {
  obstacle2Timer = setInterval(() => {
    gridCells[obsTwoLocation].classList.add("green-car");
    detectOb2Collision();
    if (obsTwoLocation % width === width - 1) {
      gridCells[obsTwoLocation].classList.remove("green-car");
      obsTwoLocation = obsTwoStart;
    } else {
      gridCells[obsTwoLocation].classList.remove("green-car");
      obsTwoLocation++;
      gridCells[obsTwoLocation].classList.add("green-car");
    }
  }, obstacleSpeed);
}

moveObstacle2Right();

function moveObstacle3Left() {
  obstacle3Timer = setInterval(() => {
    gridCells[obsThreeLocation].classList.add("minibus");
    detectOb3Collision();
    if (obsThreeLocation % width === 0) {
      gridCells[obsThreeLocation].classList.remove("minibus");
      obsThreeLocation = obsThreeStart;
    } else {
      gridCells[obsThreeLocation].classList.remove("minibus");
      obsThreeLocation--;
      gridCells[obsThreeLocation].classList.add("minibus");
    }
  }, obstacleSpeed);
}

moveObstacle3Left();

function moveObstacle4Right() {
  obstacle4Timer = setInterval(() => {
    gridCells[obsFourLocation].classList.add("bus");
    detectOb4Collision();
    if (obsFourLocation % width === width - 1) {
      gridCells[obsFourLocation].classList.remove("bus");
      obsFourLocation = obsFourStart;
    } else {
      gridCells[obsFourLocation].classList.remove("bus");
      obsFourLocation++;
      gridCells[obsFourLocation].classList.add("bus");
    }
  }, obstacleSpeed);
}

moveObstacle4Right();

function moveObstacle5Left() {
  obstacle5Timer = setInterval(() => {
    gridCells[obsFiveLocation].classList.add("truck");
    detectOb5Collision();
    if (obsFiveLocation % width === 0) {
      gridCells[obsFiveLocation].classList.remove("truck");
      obsFiveLocation = obsFiveStart;
    } else {
      gridCells[obsFiveLocation].classList.remove("truck");
      obsFiveLocation--;
      gridCells[obsFiveLocation].classList.add("truck");
    }
  }, obstacleSpeed);
}

moveObstacle5Left();

function moveObstacle6Right() {
  obstacle6Timer = setInterval(() => {
    gridCells[obsSixLocation].classList.add("tank");
    detectOb6Collision();
    if (obsSixLocation % width === width - 1) {
      gridCells[obsSixLocation].classList.remove("tank");
      obsSixLocation = obsSixStart;
    } else {
      gridCells[obsSixLocation].classList.remove("tank");
      obsSixLocation++;
      gridCells[obsSixLocation].classList.add("tank");
    }
  }, obstacleSpeed);
}

moveObstacle6Right();

function startGame() {}

startButton.addEventListener("click", startGame);
document.addEventListener("keydown", relocatePlayer);
