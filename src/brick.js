class Brick {
	constructor (x, y, width, height, scale, hp) {
		this._x = x;
		this._dy = y;
		this._width = width;
		this._height = height;
		this._scale = scale;
		this._hp = hp;

		this._y = -this._height;

		this._square = new Square(this._x, this._y, this._width);

		this._color = randomColor();
	}

	hit() {
		this._hp--;

		if (this._hp === 0) {
			BALLZIO.scene.removeBrick(this);
		}
	}

	shift() {
		this.y = this._dy;

		this._dy = this._y + this._scale;
	}

	onUpdate() {
		this.y = lerp(this._y, this._dy, 1 / 15);
	}

	onRender() {
		const fontSize = this._scale / 3;

		BALLZIO.ctx.save();

		BALLZIO.ctx.fillStyle = this._color;
		BALLZIO.ctx.strokeStyle = this._color;

		this._square.draw(BALLZIO.ctx);

		BALLZIO.ctx.restore();

		BALLZIO.ctx.save();

		BALLZIO.ctx.fillStyle = '#000000';
		BALLZIO.ctx.font = fontSize + 'px arial';

		BALLZIO.ctx.fillText(this._hp, this._x + this._width / 2 - BALLZIO.ctx.measureText(this._hp).width / 2, this._y + this._height / 2 + fontSize / 3);
		BALLZIO.ctx.restore();
	}

	get square() {
		return this._square;
	}

	get x() {
		return this._x;
	}

	set x(x) {
		this._x = x;
		this._square.x = x;
	}

	set y(y) {
		this._y = y;
		this._square.y = y;
	}
}
