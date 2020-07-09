import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import {buildLevel, level1, level2} from "./levels.js";

const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	BUILDLEVEL: 2,
	MENU: 3,
	GAMEOVER: 4
}

export default class Game {
	constructor(gameWidth, gameHeight) {
		// Set game screen size
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;

		// Initialize game objects
		this.paddle = new Paddle(this.gameWidth, this.gameHeight);
		this.ball = new Ball(this.gameWidth, this.gameHeight);
		this.bricks = [];

		// Initialize game info
		this.gameState = GAMESTATE.MENU;

		// Initialize level
		this.bricks = buildLevel(level1);

		// Init input handler
		new InputHandler(this, document.getElementById("htmlObject"));

		// Assign all game objects into array
		this.gameObjects = [this.paddle, this.ball, ...this.bricks];
	}

	draw(ctx) {
		this.gameObjects.forEach(object => object.draw(ctx));

		// Game Menu
		if (this.gameState === GAMESTATE.MENU) {
			ctx.rect(0,0, this.gameWidth, this.gameHeight);
			ctx.fillStyle = "rgba(0,0,0,1)";
			ctx.fill();

			ctx.font = "30px monospace";
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.fillText(
				"Press SPACEBAR or TAP SCREEN To Start",
				this.gameWidth / 2,
				this.gameHeight / 2
			);
			ctx.font = "24px monospace";
			ctx.fillText(
				"Press esc at any time to pause",
				this.gameWidth / 2,
				this.gameHeight / 2 + 30
			);
		}
	}

	update(deltaTime, game) {
		// Only if game is running will update
		if (this.gameState === GAMESTATE.RUNNING) {
			this.gameObjects.forEach(object => object.update(deltaTime, game));
			// Filter out deleted bricks
			this.gameObjects = this.gameObjects.filter(object => !object.delete);
		}
	}
}
