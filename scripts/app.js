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
const resetButton = document.getElementById("reset");
let obstacleSpeed = 1000;
let lives = 3;
const livesTracker = document.getElementById("lives-tracker");
let score = 0;
const scoreBoard = document.getElementById("scoreboard");
let gameIsRunning = false;
const audio = document.getElementById("audio");

function addPlayer(location) {
  gridCells[location].classList.add("player");
}

function addFly(i) {
  const flyCell = gridCells[i];
  flyCell.classList.add("fly");
}

function addLilyPad(i) {
  const lilyCell = gridCells[i];
  lilyCell.classList.add("lily-pad");
}

function buildRoad(i) {
  const roadCell = gridCells[i];
  roadCell.classList.add("road");
}

function buildBank(i) {
  const bankCell = gridCells[i];
  bankCell.classList.add("bank");
}

function makeGrid() {
  for (let i = 0; i < numberOfCells; i++) {
    const cell = document.createElement("div");
    // cell.innerText = i;
    gameGrid.appendChild(cell);
    gridCells.push(cell);
    if (i === 0 || i === 3 || i === 6 || i === 9) {
      addLilyPad(i);
    }
    if (i > 0 && i < 9 && i !== 3 && i !== 6) {
      buildBank(i);
    }
    if (i === 42 || i === 45 || i === 48 || i === 51 || i === 54 || i === 57) {
      addFly(i);
    }
    if ((i > 9 && i < 40) || (i > 59 && i < 90)) {
      buildRoad(i);
    }
  }
  addPlayer(playerStartLocation);
}

makeGrid();

function removePlayer(location) {
  const player = gridCells[location];
  player.classList.remove("player");
}

function playBoing() {
  audio.src = "../sounds/boing.mp3";
  audio.play();
}

function playCollisionSound() {
  audio.src = "../sounds/collision.mp3";
  audio.play();
}

function playFlySound() {
  audio.src = "../sounds/fly-bonus.mp3";
  audio.play();
}

function playHomeSound() {
  audio.src = "../sounds/lily-pad.mp3";
  audio.play();
}

// 37 is left, 38 is up, 39 is right, 40 is down
function relocatePlayer(event) {
  removePlayer(playerLocation);
  if (event.keyCode === 37 && playerLocation % width !== 0) {
    playerLocation -= 1;
    playBoing();
  } else if (event.keyCode === 38 && playerLocation >= height) {
    playerLocation -= height;
    playBoing();
    score += 10;
    scoreBoard.textContent = score;
  } else if (event.keyCode === 39 && playerLocation % width !== width - 1) {
    playerLocation += 1;
    playBoing();
  } else if (event.keyCode === 40 && playerLocation < 90) {
    playerLocation += height;
    playBoing();
  }

  addPlayer(playerLocation);
  catchFly();
  frogIsHome();
}

function detectOb1Collision() {
  if (gridCells[obsOneLocation].classList.contains("player")) {
    gridCells[obsOneLocation].classList.remove("player");
    playCollisionSound();
    playerLocation = playerStartLocation;
    addPlayer(playerLocation);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "You lose! 😢";
    if (!lives) {
      gameOver();
    }
  }
}

function detectOb2Collision() {
  if (gridCells[obsTwoLocation].classList.contains("player")) {
    gridCells[obsTwoLocation].classList.remove("player");
    playCollisionSound();
    playerLocation = playerStartLocation;
    addPlayer(playerLocation);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "You lose! 😢";
    if (!lives) {
      gameOver();
    }
  }
}

function detectOb3Collision() {
  if (gridCells[obsThreeLocation].classList.contains("player")) {
    gridCells[obsThreeLocation].classList.remove("player");
    playCollisionSound();
    playerLocation = playerStartLocation;
    addPlayer(playerLocation);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "You lose! 😢";
    if (!lives) {
      gameOver();
    }
  }
}

function detectOb4Collision() {
  if (gridCells[obsFourLocation].classList.contains("player")) {
    gridCells[obsFourLocation].classList.remove("player");
    playCollisionSound();
    playerLocation = playerStartLocation;
    addPlayer(playerLocation);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "You lose! 😢";
    if (!lives) {
      gameOver();
    }
  }
}

function detectOb5Collision() {
  if (gridCells[obsFiveLocation].classList.contains("player")) {
    gridCells[obsFiveLocation].classList.remove("player");
    playCollisionSound();
    playerLocation = playerStartLocation;
    addPlayer(playerLocation);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "You lose! 😢";
    if (!lives) {
      gameOver();
    }
  }
}

function detectOb6Collision() {
  if (gridCells[obsSixLocation].classList.contains("player")) {
    gridCells[obsSixLocation].classList.remove("player");
    playCollisionSound();
    playerLocation = playerStartLocation;
    addPlayer(playerLocation);
    score -= 10;
    scoreBoard.textContent = score;
    lives--;
    livesTracker.innerText = lives ? "💚".repeat(lives) : "You lose! 😢";
    if (!lives) {
      gameOver();
    }
  }
}

function frogIsHome() {
  const possibleHome = gridCells[playerLocation];
  if (possibleHome.classList.contains("lily-pad")) {
    possibleHome.classList.remove("player", "lily-pad");
    possibleHome.classList.add("home");
    playHomeSound();
    score += 90;
    scoreBoard.textContent = score;
    playerLocation = playerStartLocation;
    addPlayer(playerLocation);
  }
}

function catchFly() {
  const possibleFly = gridCells[playerLocation];
  if (possibleFly.classList.contains("fly")) {
    possibleFly.classList.remove("fly");
    playFlySound();
    score += 40;
    scoreBoard.textContent = score;
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
      gridCells[obsOneLocation].classList.add("purple-car");
    }
  }, obstacleSpeed);
}

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

function startGame() {
  if (gameIsRunning === false) {
    gameIsRunning = true;
    moveObstacle1Left();
    moveObstacle2Right();
    moveObstacle3Left();
    moveObstacle4Right();
    moveObstacle5Left();
    moveObstacle6Right();
  }
}

function gameOver() {
  clearInterval(obstacle1Timer);
  clearInterval(obstacle2Timer);
  clearInterval(obstacle3Timer);
  clearInterval(obstacle4Timer);
  clearInterval(obstacle5Timer);
  clearInterval(obstacle6Timer);
  const highScore = localStorage.getItem("high-score");
  if (!highScore || score > highScore) {
    localStorage.setItem("high-score", score);
  }
  setTimeout(() => {
    if (highScore > score) {
      alert(
        `Game over! You scored ${score}. The high score is currently ${highScore}. Must try harder!`
      );
    } else if (parseInt(highScore) === score) {
      alert(
        `Game over! You reached a high score of ${score} AGAIN! Yawn. Must try harder!`
      );
    } else {
      alert(
        `Game over! Commiserations. However, you did achieve a new high score of ${score}! Pat on the back for that, at least.`
      );
    }
  }, 100);
}

function reset() {
  clearInterval(obstacle1Timer);
  clearInterval(obstacle2Timer);
  clearInterval(obstacle3Timer);
  clearInterval(obstacle4Timer);
  clearInterval(obstacle5Timer);
  clearInterval(obstacle6Timer);
  score = 0;
  scoreBoard.textContent = score;
  lives = 3;
  livesTracker.innerHTML = "💚".repeat(lives);
  gameIsRunning = false;
  gridCells.forEach((cell) =>
    cell.classList.remove(
      "purple-car",
      "green-car",
      "minibus",
      "bus",
      "truck",
      "tank",
      "home"
    )
  );
  makeGrid();
}

startButton.addEventListener("click", startGame);
document.addEventListener("keydown", relocatePlayer);
resetButton.addEventListener("click", reset);
