class Ball {
	constructor (x, y, r, dir) {
		this._x = x;
		this._y = y;
		this._r = r;
		this._dir = dir;

		this._vel = -8;
		this._velX = this._vel * Math.cos(this._dir);
		this._velY = this._vel * Math.sin(this._dir);

		this._circle = new Circle(this._x, this._y, this._r);
	}

	collide(brick) {
		return this._circle.collide(brick.square);
	}

	dir(obj) {
		return Math.atan2(this._y - obj.y, this._x - obj.x);
	}

	onUpdate() {
		BALLZIO.scene.bricks.forEach(function (brick) {
			const mtv = this.collide(brick);

			if (mtv) {
				// var dirX = Math.abs(mtv.i) / mtv.i;
				// var dirY = Math.abs(mtv.j) / mtv.j;
				var dir = Math.atan2(-Math.max(mtv.j, 1), -Math.max(mtv.i, 1));
				console.log(mtv.i, mtv.j)

				brick.hit();

				// this._velX = mtv.i !== 0 ? Math.abs(this._velX) * dirX : this._velX;
				// this._velY = mtv.j !== 0 ? Math.abs(this._velY) * dirY : this._velY;
				this._velX = mtv.i !== 0 ? this._vel * Math.cos(dir) : this._velX;
				this._velY = mtv.j !== 0 ? this._vel * Math.sin(dir) : this._velY;
			}
		}.bind(this));

		if (this._x <= 0 || this._x >= width) {
			this._velX = -this._velX;
		}

		if (this._y <= BALLZIO.scene.y) {
			this._velY = -this._velY;
		}

		if (this._y >= BALLZIO.ballzer.y) {
			this.x = lerp(this._x, BALLZIO.ballzer.x, 1 / 15);
			this.y = BALLZIO.ballzer.y;
			this._velX = 0;
			this._velY = 0;
		} else {
			this.x = this._x + this._velX;
			this.y = this._y + this._velY;
		}
	}

	onRender() {
		BALLZIO.ctx.save();

		BALLZIO.ctx.fillStyle = 'red';
		BALLZIO.ctx.strokeStyle = 'red';

		this._circle.draw(BALLZIO.ctx);

		BALLZIO.ctx.restore();
	}

	get x() {
		return this._x;
	}

	set x(x) {
		this._x = x;
		this._circle.x = x;
	}

	get y() {
		return this._y;
	}

	set y(y) {
		this._y = y;
		this._circle.y = y;
	}
}
