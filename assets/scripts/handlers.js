'use strict';

const gameLogic = require('./game-logic');

const run = function (event) {
  event.preventDefault();
  let square = parseInt(event.target.id);
  gameLogic.testLogic(square);
};

const addGameHandlers = () => {
  $('#board').on('click', run);
};

module.exports = { addGameHandlers,
};
