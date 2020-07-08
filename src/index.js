import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";

// Grabbing and initializing drawable canvas from index.html
let ctx = document.getElementById("gameScreen").getContext("2d");

// Game size
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// Init objects
let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball = new Ball(GAME_WIDTH, GAME_HEIGHT);
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

	ball.update(deltaTime);
	ball.draw(ctx);

	if (ball.position.x >= paddle.position.x && ball.position.x + ball.size <= paddle.position.x + paddle.width) {
		if (ball.position.y + ball.size >= paddle.position.y && ball.position.y <= paddle.position.y + paddle.height) {
			ball.position.y = paddle.position.y - ball.size;
			ball.speed.y = -ball.speed.y;		}
	}

	requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);