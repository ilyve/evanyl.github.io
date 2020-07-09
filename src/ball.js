import {checkCollision} from "./collisions.js";

export default class Ball {
	constructor(gameWidth, gameHeight) {
		this.image = new Image();
		this.image.src = "../assets/images/ball.png";

		this.position = {x: 300, y:500};
		this.speed = {x: 500, y: 500};

		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;

		this.size = 15;
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.position.x,this.position.y, this.size, this.size);
	}

	update(deltaTime, game) {
		this.position.x += this.speed.x * (deltaTime / 1000);
		this.position.y += this.speed.y * (deltaTime / 1000);

		// Check wall collisions
		if (this.position.x < 0) {
			this.position.x = 0;
			this.speed.x = -this.speed.x;
		} else if (this.position.x > this.gameWidth - this.size) {
			this.position.x = this.gameWidth - this.size;
			this.speed.x = -this.speed.x;
		}
		if (this.position.y < 0) {
			this.position.y = 0;
			this.speed.y = -this.speed.y;
		} else if (this.position.y > this.gameHeight - this.size) {
			// THIS IS GAME OVER
			this.position.y = this.gameHeight - this.size;
			this.speed.y = -this.speed.y;
		}

		// Loop through all game objects
		let object;
		for (object of game.gameObjects) {
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
				}
			}
		}
	}
}