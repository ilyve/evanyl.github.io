import {checkCollision} from "./collisions.js";

const STARTINGPOSITION = {x:300, y:500};
const STARTINGSPEED = {x: 400, y: -400};

export default class Ball {
	constructor(game) {
		this.image = new Image();
		this.image.src = "../assets/images/ball.png";

		this.position = STARTINGPOSITION;
		this.speed = STARTINGSPEED;
		this.baseSpeed = 500;
		this.maxSpeedFluctuation = 300;

		this.game = game;

		this.size = 15;
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
	}

	notStarted() {
		this.speed = {x: 0, y:0};
		this.position.x = this.game.paddle.position.x + (this.game.paddle.width / 2) - this.size / 2;
		this.position.y = this.game.paddle.position.y - this.size;
	}

	starting() {
		if (this.game.notStarted) {
			this.speed = STARTINGSPEED;
			this.game.notStarted = false;
		}	
	}

	newSpeed() {
		if (Math.random() < 0.8) {
			this.changeDirection = Math.sign(this.speed.x);
		} else {
			this.changeDirection = -Math.sign(this.speed.x);
		}

		if (Math.random() < 0.4) {
			this.speedFluctuation = this.maxSpeedFluctuation * 0.5;
		} else {
			this.speedFluctuation = this.maxSpeedFluctuation;
		}

		this.speed.x = this.changeDirection * this.baseSpeed + this.changeDirection * Math.floor(Math.random() * this.speedFluctuation - this.maxSpeedFluctuation / 2);
		
	}

	update(deltaTime, game) {
		// Add distance traveled
		this.position.x += this.speed.x * (deltaTime / 1000);
		this.position.y += this.speed.y * (deltaTime / 1000);

		// Check wall collisions
		this.checkWallCollisions();

		// Loop through all game objects
		this.checkAllGameObjects();
	}

	checkWallCollisions() {
		if (this.position.x < 0) {
			this.position.x = 0;
			this.speed.x = -this.speed.x;
		} else if (this.position.x > this.game.gameWidth - this.size) {
			this.position.x = this.game.gameWidth - this.size;
			this.speed.x = -this.speed.x;
		}
		if (this.position.y < 0) {
			this.position.y = 0;
			this.speed.y = -this.speed.y;
		} else if (this.position.y > this.game.gameHeight - this.size) {
			// THIS IS GAME OVER
			this.game.death();
			this.position.y = this.game.gameHeight - this.size;
			this.speed.y = -this.speed.y;
		}
	}

	checkAllGameObjects() {
		let object;
		for (object of this.game.gameObjects) {
			// Branch where object is a brick
			if (object.delete !== undefined) {
				if (checkCollision(this, object)) {
					object.delete = true;
					this.speed.y = - this.speed.y;
				}
			// Branch where object is a paddle
			} else if (object.maxSpeed !== undefined) {
				if (checkCollision(this, object)) {
					this.position.y = object.position.y - this.size;
					this.speed.y = -this.speed.y;
					this.newSpeed();
				}
			}
		}
	}
}