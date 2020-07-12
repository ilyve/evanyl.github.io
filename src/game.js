import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Score from "./score.js";
import LevelHandler {levels} from "./levels.js";

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
		this.paddle = new Paddle(this);
		this.ball = new Ball(this);
		this.levelHandler = new LevelHandler();
		this.scoreboard = new Score();
		this.essentialObjects = [];
		this.gameObjects = [];
		this.bricks = [];

		// Initialize game info
		this.gameState = GAMESTATE.MENU;
		this.level = 0;
		this.pauseTime = 0;
		this.notStarted = true;

		// Init input handler
		new InputHandler(this, document.getElementById("htmlObject"));
	}

	start() {
		this.score = 0;
		// Init level
		this.essentialObjects = [this.paddle, this.ball, this.scoreboard];
		this.baseObjects = 3;
		this.loadLevel(0);
	}

	loadLevel(increment) {
		this.gameState = GAMESTATE.BUILDLEVEL;
		this.level += increment;
		this.bricks = this.levelHandler.buildLevel(levels[this.level]);
		this.gameObjects = [...this.essentialObjects, ...this.bricks];

		this.notStarted = true;
		levels.push(this.randomLevelGenerator);
	}

	// Draw screen
	draw(ctx) {
		ctx.clearRect(0,0,this.gameWidth, this.gameHeight);
		this.gameObjects.forEach(object => object.draw(ctx));
		// Game Menu
		switch (this.gameState) {
			case GAMESTATE.MENU:
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
				break;

			case GAMESTATE.PAUSED:
				ctx.rect(0,0,this.gameWidth, this.gameHeight);
				ctx.fillStyle = "rgba(0,0,0,0.5)";
				ctx.fill();

				ctx.font = "30px, monospace";
				ctx.fillStyle = "white";
				ctx.textAlign = "center";
				ctx.fillText("PAUSED", this.gameWidth / 2, this.gameHeight / 2);
				break;

			case GAMESTATE.BUILDLEVEL:
				ctx.rect(0,0,this.gameWidth, this.gameHeight);
				ctx.fillStyle = "rgba(0,0,0,1)";
				ctx.fill();

				ctx.font = "30px, monospace";
				ctx.fillStyle = "white";
				ctx.textAlign = "center";
				ctx.fillText(`Level: ${this.level + 1}`, this.gameWidth / 2, this.gameHeight / 2);
				break;

		}
	}

	// Update all game objects if game is running
	update(deltaTime, game) {
		switch (this.gameState) {
			// Only if game is running will update
			case GAMESTATE.RUNNING:
				if (this.notStarted) {
					this.ball.notStarted();
				}

				this.gameObjects.forEach(object => object.update(deltaTime, game));

				// Add bricks destroyed to score
				this.score += this.gameObjects.length - this.gameObjects.filter(object => !object.delete).length;

				// Filter out deleted bricks
				this.gameObjects = this.gameObjects.filter(object => !object.delete);

				// Check if level is complete
				if (this.gameObjects.length === this.baseObjects) {
					this.loadLevel(1);
				}
				break;

			// Building level pause
			case GAMESTATE.BUILDLEVEL:
				this.pauseTime += deltaTime;
				if (this.pauseTime > 1500) {
					this.gameState = GAMESTATE.RUNNING;
					this.pauseTime = 0;
				}
				break;

			default:
				break;

		}
	}

	// Toggle pause
	togglePause() {
		if (this.gameState === GAMESTATE.RUNNING) {
			this.gameState = GAMESTATE.PAUSED;
		} else if (this.gameState === GAMESTATE.PAUSED) {
			this.gameState = GAMESTATE.RUNNING;
		}
	}

	death() {
		this.loadLevel(0);
		this.score = 0;
	}
}
