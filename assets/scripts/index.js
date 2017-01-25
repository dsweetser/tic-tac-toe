'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
const gameLogic = require('./game-logic');

const createBoard = function () {
  gameLogic.board = ['', '', '', '', '', '', '', '', ''];
  gameLogic.turnCounter = 0;
  for (let i = 0; i < 9; i++) {
    $('#board').append('<div class="col-xs-4" id="square'+i+'"></div>');
  }
};

createBoard();

$(() => {
  setAPIOrigin(location, config);
  // createBoard();

  //on click, turns div to X or O and checks triggerEndGame
  //  $().on('click')

});

// use require with a reference to bundle the file and use it in this file
// const example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

// require('./game-logic');

const authEvents = require('./auth/events.js');

// on document ready

$(() => {
  authEvents.addHandlers();
});
