const STATE = {
	NONE: -1,
	WAVE: 0,
	FIRE: 1
};

class Ballzio {
	constructor () {
		this._canvas = createCanvas(width, height, true);
		this._ctx = this._canvas.getContext('2d');

		this._ballzer = null;
		this._scene = null;

		this._ticks = 0;
		this._tps = 0;
		this._tticks = 0;
		this._lastTime = 0;
	}

	run() {
		const scale = width / 7;
		const space = 0;

		const ballzerR = 5;
		const ballzerX = Math.max(ballzerR, Math.min(randomInt(10, width - 10), width - ballzerR));
		const ballzerY = height - height / 6;

		const sceneX = space;
		const sceneY = 50;
		const sceneWidth = width - 2 * space;
		const sceneHeight = ballzerY - sceneY;

		const updateInterval = 1000 / 60;

		EVENT_MANAGER.add(this, EVENT.WAVE);
		EVENT_MANAGER.add(this, EVENT.FIRE);

		this._ballzer = new Ballzer(ballzerX, ballzerY, ballzerR);
		this._scene = new Scene(sceneX, sceneY, sceneWidth, sceneHeight, space, scale);

		window.setInterval(this.onTick.bind(this), updateInterval);
	}

	onWave() {
		this._state = STATE.WAVE;
	}

	onFire() {
		this._state = STATE.FIRE;
	}

	onTick() {
		EVENT_MANAGER.fire(EVENT.TICK);

		this.onUpdate();
		this.onRender();

		if (Date.now() - this._lastTime) {
			this._tps = this._tticks;
			this._tticks = 0;
		}

		this._tticks++;
		this._ticks++;
	}

	onUpdate() {
		this._scene.onUpdate();
		this._ballzer.onUpdate();
	}

	onRender() {
		this._ctx.save();
		this._ctx.clearRect(0, 0, width, height);

		this._ctx.save();

		BALLZIO.ctx.fillStyle = '#303030';

		this._ctx.fillRect(0, 0, width, height);
		this._ctx.restore();

		this._ctx.save();

		this._ctx.fillStyle = '#383838';

		this._ctx.fillRect(0, 0, width, 50);
		this._ctx.restore();

		this._ctx.save();

		this._ctx.fillStyle = '#FFFFFF';
		this._ctx.font = '30px arial';

		this._ctx.fillText(this._ballzer.ballCount, width / 2 - this._ctx.measureText(this._ballzer.ballCount).width / 2, 25 + 10);

		this._ctx.restore();

		this._scene.onRender();
		this._ballzer.onRender();

		this._ctx.restore();
	}

	get ballzer() {
		return this._ballzer;
	}

	get scene() {
		return this._scene;
	}

	get state() {
		return this._state;
	}

	get ticks() {
		return this._ticks;
	}

	get ctx() {
		return this._ctx;
	}

	get canvas() {
		return this._canvas;
	}
}
