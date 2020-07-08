import {checkCollision} from "./collisions.js";

export default class Brick {
	constructor(ball, position) {
		this.image = new Image();
		this.image.src = "../assets/images/brick.png";
		this.width = 40;
		this.height = 20;
		this.position = {x: position.x, y: position.y};

		this.delete = false;
		this.ball = ball;
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		if (checkCollision(this.ball, this)) {
			this.ball.speed.y = -this.ball.speed.y;
			this.delete = true;
		}
	}
}