'use strict';

const gameLogic = require('./game-logic');

const run = function (event) {
  event.preventDefault();
  let square = parseInt(event.target.id);
  gameLogic.testLogic(square);
};

const clear = function () {
  gameLogic.turnCounter = 0;
  gameLogic.board = ['', '', '', '', '', '', '', '', ''];
  gameLogic.createBoard();
};

const addGameHandlers = () => {
  $('#board').on('click', run);
  $('#reset').on('click', clear);
};

module.exports = { addGameHandlers,
};
