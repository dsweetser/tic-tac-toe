'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
const gameLogic = require('./game-logic');
const handlers = require('./handlers.js');

$(() => {
  setAPIOrigin(location, config);

  //creates board

  gameLogic.createBoard();
});

// use require with a reference to bundle the file and use it in this file
// const example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

const authEvents = require('./auth/events.js');

// on document ready

$(() => {
  authEvents.addHandlers();
  handlers.addGameHandlers();
});
