'use strict';

var width = 1440 / 4;
var height = 2560 / 4;

const BALLZIO = new Ballzio();
const EVENT_MANAGER = new EventManager(BALLZIO.canvas);

BALLZIO.run();
