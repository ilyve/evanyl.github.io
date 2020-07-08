import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";

// Grabbing and initializing drawable canvas from index.html
let ctx = document.getElementById("gameScreen").getContext("2d");
let htmlObject = document.getElementById("htmlObject");

// Game size
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// Init objects
let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
let ball = new Ball(GAME_WIDTH, GAME_HEIGHT);

let bricks = [];
let brick;

for (let i = 0; i <= 10; i++) {
	for (let j = 0; j <= 19; j++) {
		bricks.push(new Brick(ball, {x: j * 40, y: i * 20 + 100}));
	}
};
new InputHandler(paddle, htmlObject);

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

	for (brick of bricks) {
		brick.update();
		brick.draw(ctx);
	}

	bricks = bricks.filter(object => !object.delete);

	if (
		ball.position.x >= paddle.position.x && 
		ball.position.x + ball.size <= paddle.position.x + paddle.width
		) {
		if (
			ball.position.y + ball.size >= paddle.position.y && 
			ball.position.y <= paddle.position.y + paddle.height
			) {
				ball.position.y = paddle.position.y - ball.size;
				ball.speed.y = -ball.speed.y;		
			}
	}

	requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);