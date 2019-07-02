class Scene {
	constructor (x, y, width, height, space, scale) {
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;
		this._space = space;
		this._scale = scale;

		this._bricks = [];

		EVENT_MANAGER.add(this, EVENT.WAVE);
		EVENT_MANAGER.fire(EVENT.WAVE);
	}

	addBrick(x, y, width, height, scale, hp) {
		this._bricks.push(new Brick(x, y, width, height, scale, hp));
	}

	removeBrick(brick) {
		this._bricks.splice(this._bricks.indexOf(brick), 1);
	}

	onWave() {
		const brickCount = randomInt(1, 4);

		for (var i = 0; i < brickCount; i++) {
			var x = this._space + (randomInt(0, (this._width - this._scale) / this._scale)) * this._scale;
			var y = this._y + this._space;

			var found = i !== 0 ? true : false;

			while (found) {
				for (var j = 0; j < this._bricks.length; j++) {
					if (this._bricks[j].x === x && this._bricks[j].y === y) {
						x = this._space + (randomInt(0, (this._width - this._scale) / this._scale)) * this._scale;

						found = true;

						break;
					} else {
						found = false;
					}
				}
			}

			this.addBrick(x, y, this._scale - 2 * this._space, this._scale - 2 * this._space, this._scale, randomInt(BALLZIO.ballzer.ballCount, BALLZIO.ballzer.ballCount + 3));
		}

		this._bricks.forEach(function (brick) {
			brick.shift();
		});
	}

	onUpdate() {
		this._bricks.forEach(function (brick) {
			brick.onUpdate();
		});
	}

	onRender() {
		BALLZIO.ctx.save();
		BALLZIO.ctx.save();

		BALLZIO.ctx.fillStyle = '#303030';

		BALLZIO.ctx.fillRect(this._x, this._y, this._width, this._height);
		BALLZIO.ctx.restore();

		this._bricks.forEach(function (brick) {
			brick.onRender();
		});

		BALLZIO.ctx.restore();
	}

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	get bricks() {
		return this._bricks;
	}

	get scale() {
		return this._scale;
	}
}
