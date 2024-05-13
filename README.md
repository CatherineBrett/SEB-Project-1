# General Assembly Project 1: Frogger

## Description

At the end of week 3 of General Assembly’s 12-week Software Engineering Bootcamp, for my first project, I worked solo to build a grid-based browser game (a version of 1981 arcade game Frogger). The aim of the original game is to guide a family of frogs home across a busy road (dodging the traffic) and across a river using floating logs and alligators. As a child of the 80s, I remember the game fondly, so I decided to keep the player character as a frog, and to give the game a simple style and lots of colour like the original. 

I used HTML, CSS and JavaScript to build the game. I had six business days (8 days in total) to plan, build and deploy the project.

My project is deployed [here](https://catherinebrett.github.io/SEB-Project-1/).

## Getting Started/Code Installation

- Clone the repo
- Open the `index.html` file (with either live server via your code editor, or in your browser)

## Technologies Used

- HTML
- CSS
- JavaScript
- VS Code
- Git / GitHub / GitHub Pages

## Brief

Your app must:

- Render a game in the browser
- Be built on a grid (not using HTML Canvas)
- Include separate HTML / CSS / JavaScript files
- Use semantic markup for HTML and CSS (adhering to best practices)
- Use JavaScript for DOM manipulation
- Design logic for winning & visually display this
- Be playable for one player
- Have auto-generated obstacles
- Be deployed online

## Planning

I refreshed my memory of Frogger’s gameplay/scoring etc. by reading the Wikipedia page, and then made a sketch of my MVP:

![My wireframe](/readme-assets/wireframe.jpg)

I also made notes of what my version could include, split into two columns – MVP and optional stretch goals:

![My planning notes](/readme-assets/notes.jpg) 

## Build/Code Process

At the beginning of each day/session, I would decide what my main substantial goal should be, and then focus on achieving that as a priority. This helped me to stay on track, and to avoid getting too distracted by (or nervous about!) everything else on the list!

To get things underway, I made an initial commit of our basic starter code. I gave the game a general layout and some temporary styling, and wrote a function to generate a grid with numbered cells to refer to during development.

```js
function makeGrid() {
  for (let i = 0; i < numberOfCells; i++) {
    const gridCell = document.createElement("div");
    gridCell.innerText = i;
    gameGrid.appendChild(gridCell);
    gridCells.push(gridCell);
  }
}

makeGrid();
```

I then added my cartoon frog in the middle of the bottom row as a starting position. I wrote a `.player` class which added the frog as a background image, and then an `addPlayer` and a `removePlayer` function, which respectively added and removed the class to/from the appropriate cell. Next, I got the frog to move in response to key presses (up, down, left and right arrows), using an event listener and a `relocatePlayer` function which called these functions. The `relocatePlayer` function also included logic to prevent the frog from breaking the boundaries of the grid:

```js
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
```

I wrote a temporary function which added a class of `.obstacle` to a cell, and another function to detect whether the frog and `.obstacle` class were in the same cell at the same time. (At this stage there were no actual obstacles, moving or otherwise; it was just a question of seeing if I could detect a “collision”.)

My next task was to source some images for a couple of my real obstacles, and get them moving from one side of the grid to the other (once).

```js
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
```

I tested that my collision detection was working.

```js
function detectOb1Collision() {
  if (gridCells[obstacleOneLocation].classList.contains("player")) {
    console.log("Oh no, you've hit obstacle 1!");
    clearInterval(obstacleOneTimer);
  }
}
```

I then implemented basic scoring, for now awarding and displaying 10 points just for moving upwards. I deducted one life and ten points in the event of a collision.

Next, I added the remaining four obstacles, and got them all moving, with collision detection working. In order to ensure the obstacles were evenly scattered around the grid, for now, I had each one start at a different column. I also sourced images for my lily pads and bonus flies.

I made a function to add, for the time being, one lily pad to the top row when the grid loaded. If the frog landed on the cell with the lily pad, I used a class of `.home` to give the cell a different background image (of a frog **on** a lily pad), and relocated the original frog image to the starting position by resetting the `playerLocation` to the `playerStartLocation`, and then calling `addPlayer`, passing it the updated `playerLocation` as an argument. (This same frog would now appear to the player to be a new member of the frog’s family.)

I now got my obstacles moving continuously, i.e. reappearing at their respective starting positions once they’d reached the other side of the grid.

```js
if (obsOneLocation % width === 0) {
  gridCells[obsOneLocation].classList.remove("purple-car");
  obsOneLocation = obsOneStart;
}  
```

Now, rather than starting them in different columns in order to spread them evenly across the grid, I moved their starting positions back to the left or right, and would instead stagger their start times using `setTimeout`, once I came to write the `startGame` function. 

At this point, I saw that there was an off-by-one bug in the "`moveObstacle`" functions, whereby the obstacles were skipping the cell they were supposed to start in. However, despite being tempted to explore its cause, I decided that as the bug wouldn’t make the game unplayable (or unlosable), it was more sensible to prioritise a working MVP, and so I decided to come back and fix it later if there was time.

I then added some bonus-point flies to my grid by calling an `addFly` function inside my `makeGrid` function. I also included the other three lily pads, and updated my game so that the player is sent back to the start in the event of a collision, and the vehicles keep moving. By using an `<audio>` HTML element in my `index.html` file, I was able to access and manipulate it to play various sound effects – when the frog moves, or lands on a lily pad, or when a collision occurs or a fly is caught. I introduced extra points for catching flies, and logic for removing them as they are caught.

```js
function catchFly() {
  const possibleFly = gridCells[playerLocation];
  if (possibleFly.classList.contains("fly")) {
    possibleFly.classList.remove("fly");
    playFlySound();
    score += 40;
    scoreBoard.textContent = score;
  }
}
```

Next, I wrote my `startGame`, `reset`, and `gameOver` functions. The `gameOver` function would be called if a player’s lives had run out upon collision detection – the function stops the obstacles from moving, and uses the `alert` method to display a modal dialogue box with a message about the high score (from local storage).

![High score image](/readme-assets/high-score.png)

I gave the obstacles staggered start times using `setTimeout` inside the `startGame` function, and different speeds using `setInterval` in their respective "`moveObstacle`" functions. If I wanted to slow them down I multiplied the `obstacleSpeed` variable by a number greater than one, and to speed them up I used a number smaller than one. 

Building on the logic that stops the frog from breaking the boundaries of the grid, I made the bank, and any already occupied lily pad cells, inaccessible to the player. 

```js
  } else if (
    event.keyCode === 38 &&
    playerLocation >= height &&
    !gridCells[playerLocation - 10].classList.contains("bank") &&
    !gridCells[playerLocation - 10].classList.contains("home")
  ) {
    playerLocation -= height;
    playBoing();
    score += 10;
    scoreBoard.textContent = score;
```

Other than some styling, my final job was to write a `levelUp` function to make an array of all cells with a class of `.home`, and check its length. If that length is 4, then the player has successfully guided four frogs home and filled up all the lily pads. Bonus points are awarded, the obstacles are sped up via the value of the `obstacleSpeed` variable, and after half a second, using `setTimeout`, the lily pads and flies are refreshed when a `resetLilyPadsAndFlies` function is called (see Challenges/Wins).

## Challenges/Wins

I am happy that I managed to build a genuinely playable game that included a number of my stretch goals, when at points during the build I had been concerned that I might not manage to even achieve an MVP in time for the deadline! 

In addition, having felt some trepidation and a lack of confidence around my ability to style the game, I do think I managed to make it reasonably attractive!

![Screenshot of game](/readme-assets/screenshot.png)

I was also pleased with my logic for refreshing the flies when the game levels up. Initially my `catchFly` function simply removed the class of `.fly` from a cell if the player landed on it, and I was struggling to figure out how to know where to put them back if the game was levelling up (as opposed to the game resetting with a new grid because it was over). I realised that just as I was swapping between the classes of `.home` and `.lily-pad` to deal with the top row, I could swap between `.fly` and `.was-fly` when catching a fly, enabling me to find and reset those cells when levelling up, by calling the `resetLilyPadsAndFlies` function inside the `levelUp` function. I also checked MDN Web Docs to see if there was a `replace` method I could use instead of `remove` plus `add`, to save some lines of code!

```js
function catchFly() {
  const possibleFly = gridCells[playerLocation];
  if (possibleFly.classList.contains("fly")) {
    possibleFly.classList.replace("fly", "was-fly");
```

```js
function resetLilyPadsAndFlies() {
  gridCells.forEach((cell) => cell.classList.replace("home", "lily-pad"));
  gridCells.forEach((cell) => cell.classList.replace("was-fly", "fly"));
}
```

## Key Learnings/Takeaways

- Writing placeholder code and logging things to the console are great ways of debugging and of testing that your logic works.
- Projects like these don’t move at a steady pace: one difficult problem can take what feels like an age to solve, leaving you anxious that your MVP is doomed – however, you may well find that the solution to this problem unlocks other problems down the line, speeding you up later on. In addition, the motivation you get from solving a difficult problem can help give you a real energy/productivity boost.
- I would like to have spent more time reviewing classwork before embarking on this project. I think it would have reminded me of certain concepts and methods that could have come in handy when building my game. I think I dived into the code a little earlier than a leveller-headed version of me would have!

## Bugs

- It is possible to move the player (and score points) when the game is not running and there are no obstacles.
- Reset is not always working as it ought to: in certain cases, while a new frog is added at the start position, it is your previous frog that continues playing from wherever he left off!
- The high scoring logic needs some attention and it is likely not to be working quite as it should.
- There is an off-by-one bug with the obstacles’ movement, whereby they skip the cell they are meant to start in.

## Future Improvements

As this was my first project, there is a lot I would improve upon, but two key areas are:

- Fixing all known bugs (the first three should be easy!)
- Making my code dryer by e.g.
    - In my CSS file, targeting multiple selectors/class names at the same time where they share declarations
    - Rather than having six separate collision detection functions (one for every obstacle, oops!), I could have just one, and pass one of the six obstacle location variables – which already exist – as an argument to a single, reusable function, like this:
    
        ```js
        function detectCollision(obsLocation) {
          if (gridCells[obsLocation].classlist.contains("player")) {
            gridCells[obsLocation].classList.remove("player");
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
        ```

    - And rather than having four separate SFX functions (one for each sound effect), I could save the sounds as variables and pass the relevant one as an argument to a single function, like this:

        ```js
        const boingSound = "./assets/boing.mp3";
        const collisionSound = "./assets/collision.mp3";
        const flySound = "./assets/fly-bonus.mp3";
        const homeSound = "./assets/lily-pad.mp3";

        function playSound(sound) {
          audio.src = sound;
          audio.play();
        }
        ```


    










