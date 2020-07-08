import Paddle from "./paddle.js";
import InputHandler from "./input.js";

// Grabbing and initializing drawable canvas from index.html
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// Init objects
let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
new InputHandler(paddle);

// Game Loop Begins
let lastTime = 0;

const gameLoop = timestamp => {
	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	// Clear screen
	ctx.clearRect(0,0,GAME_WIDTH, GAME_HEIGHT);

	// Draw objects
	paddle.update(deltaTime);
	paddle.draw(ctx);

	requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);