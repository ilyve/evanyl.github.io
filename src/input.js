export default class InputHandler {
	constructor(paddle) {
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

		$("#gameScreen").click(function(e) {
    	var divWidth = $("#gameScreen").width();        
   		 var clickX = e.clientX;
   		 if (clickX > divWidth/2) {
     		   console.log("Div was clicked on the right");
   		 } else {
     		   console.log("Div was clicked on the left");
   		 }
});
	}
}