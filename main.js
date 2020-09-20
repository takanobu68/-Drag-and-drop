'use strict';

{
	window.addEventListener('load', init);

	function init() {
		const stage = new createjs.Stage('canvas');

		const shape = new createjs.Shape();

		let dragPointX;
		let dragPointY;

		const radius = 30;
		const goalRadius = 50;
		let velocity = 10;
		let catchShapeSpeed;
		let goalSpeed;
		let goalFlag = false;

		shape.graphics.beginFill('blue')
			.drawCircle(0, 0, radius)
			.endFill();
		shape.x = 30;
		shape.y = canvas.height / 2;

		shape.addEventListener('mousedown', handleDown);
		shape.addEventListener('pressmove', handleMove);
		shape.addEventListener('pressup', handleUp);

		stage.addChild(shape);

		const goal = new createjs.Shape();

		goal.graphics.beginStroke('red')
			.setStrokeStyle(8)
			.drawCircle(0, 0, goalRadius)
			.endFill()

		goal.x = canvas.width / 2;
		goal.y = radius * 2;

		stage.addChild(goal);

		function handleDown() {

			if (goalFlag) {
				reStart();
			}

			dragPointX = stage.mouseX - shape.x;
			dragPointY = stage.mouseY - shape.y;

			shape.alpha = 0.5;
			catchShapeSpeed = velocity;
			velocity = 0;
		}

		function handleMove() {
			shape.x = stage.mouseX - dragPointX;
			shape.y = stage.mouseY - dragPointY;
		}

		function handleUp() {

			shape.alpha = 1.0;

			if ((shape.x >= goal.x - goalRadius && shape.x <= goal.x + goalRadius)
				&& (shape.y >= goal.y - goalRadius && shape.y <= goal.y + goalRadius)
			) {
				result();
				return
			}

			velocity = catchShapeSpeed;
		}

		function result() {
			alert('Goal!!!!!!');
			goalFlag = true;
			goalSpeed = catchShapeSpeed;
			velocity = 0;
			shape.graphics.clear()
				.beginFill('red')
				.drawCircle(0, 0, radius)
				.endFill();
			shape.x = shape.x
			shape.y = shape.y
		}

		function reStart() {
			goalFlag = false;
			velocity = goalSpeed;
			shape.graphics.clear()
				.beginFill('blue')
				.drawCircle(0, 0, radius)
				.endFill();
			shape.x = stage.mouseX;
			shape.y = stage.mouseY;
		}

		createjs.Ticker.addEventListener("tick", handleTick);

		function handleTick() {

			if (shape.x > canvas.width - radius && velocity > 0
				|| shape.x < radius && velocity < 0
			) {
				velocity = velocity * -1;
			}
			shape.x += velocity;

			stage.update();
		}
	}



}
