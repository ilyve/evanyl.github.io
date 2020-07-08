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

let balls = [new Ball(GAME_WIDTH, GAME_HEIGHT)];
let ball;

let bricks = [];
let brick;

for (let i = 0; i <= 14; i++) {
	for (let j = 0; j <= 19; j++) {
		bricks.push(new Brick(ball, {x: j * 40, y: i * 20 + 40}));
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

	for (ball of balls) {
		ball.update(deltaTime, bricks);
		ball.draw(ctx);
	}

	for (brick of bricks) {
		brick.draw(ctx);
	}

	bricks = bricks.filter(object => !object.delete);

	if (bricks.length <= 250 && balls.length == 1) {
		balls.push(new Ball(GAME_WIDTH, GAME_HEIGHT));
		balls[1].speed.x = -balls[1].speed.x;
		balls.push(new Ball(GAME_WIDTH, GAME_HEIGHT));
		balls[2].speed.y = -balls[2].speed.x;
	}
	
	for (ball of balls) {
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
	}

	requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);