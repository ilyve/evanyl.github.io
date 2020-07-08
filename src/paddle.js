export default class Paddle {
	constructor(gameWidth, gameHeight) {
		this.width = 150;
		this.height = 15;

		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;

		this.maxSpeed = 1000;
		this.speed = 0;

		this.position = {x: gameWidth / 2 - this.width / 2, y: 550};
	}

	draw(ctx) {
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	update(deltaTime) {
		this.position.x += this.speed * (deltaTime / 1000);
		if (this.position.x > this.gameWidth - this.width) this.position.x = this.gameWidth - this.width;
		if (this.position.x < 0) this.position.x = 0;
	}

	// Movement
	moveLeft() {
		this.speed = -this.maxSpeed;
	}

	moveRight() {
		this.speed = this.maxSpeed;
	}

}
