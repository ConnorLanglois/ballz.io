class Ballzer {
	constructor (x, y, r) {
		this._x = x;
		this._y = y;
		this._r = r;

		this._dir = Math.PI / 2;

		this._maxPower = 20;
		this._power = 0;

		this._ballCount = 1;
		this._ballR = 5;
		this._balls = [];
		this._ballsFired = 0;

		EVENT_MANAGER.add(this, EVENT.MOUSEDOWN);
		EVENT_MANAGER.add(this, EVENT.MOUSEMOVE);
		EVENT_MANAGER.add(this, EVENT.MOUSEUP);

		EVENT_MANAGER.add(this, EVENT.TICK);
		EVENT_MANAGER.add(this, EVENT.WAVE);
	}

	onTick() {
		if (BALLZIO.state === STATE.FIRE && this._ballsFired !== this._ballCount && (BALLZIO.ticks % 4 === 0 || this._ballsFired === 0)) {
			this.addBall(this._x, this._y - 1, this._ballR, this._dir);

			this._ballsFired++;
		}
	}

	onWave() {
		this._x = Math.max(this._r, Math.min(randomInt(10, width - 10), width - this._r));
	}

	fire(dir) {
		this._dir = dir;

		if (BALLZIO.state !== STATE.FIRE) {
			EVENT_MANAGER.fire(EVENT.FIRE);
		}
	}

	addBall(x, y, r, dir) {
		this._balls.push(new Ball(x, y, r, dir));
	}

	removeBall(ball) {
		this._balls.splice(this._balls.indexOf(ball), 1);
	}

	onMousedown(e) {
		if (e.button === 0) {
			this._mouseX = e.offsetX;
			this._mouseY = e.offsetY;
		}
	}

	onMousemove(e) {
		if (e.buttons === 1 && e.button === 0) {
			this._power = Math.min(distance(this._mouseX, this._mouseY, e.offsetX, e.offsetY), this._maxPower);
			this._dir = Math.atan2(e.offsetY - this._mouseY, e.offsetX - this._mouseX);
		}
	}

	onMouseup(e) {
		if (e.button === 0) {
			this.fire(this._dir);

			this._power = 0;
		}
	}

	onUpdate() {
		this._balls.forEach(function (ball) {
			if (Math.round(ball.x) === Math.round(this._x) && Math.round(ball.y) === Math.round(this._y)) {
				this.removeBall(ball);
			} else {
				ball.onUpdate();
			}
		}.bind(this));

		if (BALLZIO.state === STATE.FIRE && this._balls.length === 0) {
			EVENT_MANAGER.fire(EVENT.WAVE);

			this._ballsFired = 0;
		}
	}

	onRender() {
		BALLZIO.ctx.save();
		BALLZIO.ctx.save();

		BALLZIO.ctx.fillStyle = '#383838';

		BALLZIO.ctx.fillRect(0, this._y + this._r, width, height - this._y);

		BALLZIO.ctx.restore();

		BALLZIO.ctx.save();

		BALLZIO.ctx.fillStyle = 'red';
		BALLZIO.ctx.strokeStyle = 'red';

		BALLZIO.ctx.beginPath();
		BALLZIO.ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI);
		BALLZIO.ctx.fill();
		BALLZIO.ctx.stroke();
		BALLZIO.ctx.closePath();
		BALLZIO.ctx.restore();

		this._balls.forEach(function (ball) {
			ball.onRender();
		});

		if (BALLZIO.state !== STATE.FIRE) {
			BALLZIO.ctx.save();

			BALLZIO.ctx.globalAlpha = 0.8;
			BALLZIO.ctx.fillStyle = '#FFFFFF';
			BALLZIO.ctx.strokeStyle = '#FFFFFF';

			for (var i = 1; i < 20; i++) {
				var x = this._power * i * Math.cos(this._dir);
				var y = this._power * i * Math.sin(this._dir);
				var r = this._power / 5;

				BALLZIO.ctx.beginPath();
				BALLZIO.ctx.arc(this._x - x, this._y - y, r, 0, 2 * Math.PI);
				BALLZIO.ctx.fill();
				BALLZIO.ctx.stroke();
				BALLZIO.ctx.closePath();
			}

			BALLZIO.ctx.restore();
		}

		BALLZIO.ctx.fillStyle = '#FFFFFF';

		BALLZIO.ctx.fillText('x' + (this._ballCount - this._ballsFired), this._x, this._y);

		BALLZIO.ctx.restore();
	}

	get ballCount() {
		return this._ballCount;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}
}

