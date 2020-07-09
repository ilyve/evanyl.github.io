export default class Score {
	constructor() {
		this.scoreElement = document.getElementById("score");
	}

	draw(ctx) {
		return;
	}

	update(deltaTime, game) {
		this.scoreElement.innerHTML = game.score;
	}
}