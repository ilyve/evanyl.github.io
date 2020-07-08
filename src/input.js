export default class InputHandler {
	constructor(paddle, htmlObject) {
		document.addEventListener("keydown", event => {
			// alert(event.keyCode);
			switch(event.keyCode) {
				case 37:
				paddle.moveLeft();
					break;
				case 39:
				paddle.moveRight();
					break;
				default:
					break;
			}
		});

		document.addEventListener("keyup", event => {
			// alert(event.keyCode);
			switch(event.keyCode) {
				case 37:
					if (paddle.speed < 0) paddle.speed = 0;
					break;
				case 39:
					if (paddle.speed > 0) paddle.speed = 0;
					break;
				default:
					break;
			}
		});

		htmlObject.addEventListener('touchstart', (e) => {
			alert(e.touches[0].clientX);
		});
	}
}