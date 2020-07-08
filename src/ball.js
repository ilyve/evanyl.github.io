import {checkCollision} from "./collisions.js";

export default class Ball {
	constructor(gameWidth, gameHeight) {
		this.image = new Image();
		this.image.src = "../assets/images/ball.png";

		this.position = {x: 300, y:500};
		this.speed = {x: 700, y: 600};

		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;

		this.size = 15;
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.position.x,this.position.y, this.size, this.size);
	}

	update(deltaTime, bricks) {
		this.position.x += this.speed.x * (deltaTime / 1000);
		this.position.y += this.speed.y * (deltaTime / 1000);

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
			this.position.y = this.gameHeight - this.size;
			this.speed.y = -this.speed.y;
		}

		let brick;
		for (brick of bricks) {
			if (checkCollision(this, brick)) {
				brick.delete = true;
				this.speed.y = -this.speed.y;
			}
		}
	}
}