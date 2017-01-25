'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');
const gameLogic = require('./game-logic');

const createBoard = function () {
  $('#board').html('<div class="container board" id="board"></div>');
  for (let i = 0; i < 9; i++) {
    $('#board').append('<div class="col-xs-4" id="' + i + '"></div>');
    if (gameLogic.board[i] === 'x') {
      $('#' + i).text('X');
    } else if (gameLogic.board[i] === 'o') {
      $('#' + i).text('O');
    }
  }
};

// this function tests the above logic, will need to be reimplemented elsewhere
const testLogic = function (event) {
  event.preventDefault();
  gameLogic.turnOrder(parseInt(event.target.id));
  console.log(gameLogic.board);
  return gameLogic.triggerEndGame(gameLogic.board);
};

const addHandlers = () => {
  $('#0').on('click', testLogic);
  $('#1').on('click', testLogic);
  $('#2').on('click', testLogic);
  $('#3').on('click', testLogic);
  $('#4').on('click', testLogic);
  $('#5').on('click', testLogic);
  $('#6').on('click', testLogic);
  $('#7').on('click', testLogic);
  $('#8').on('click', testLogic);
};

$(() => {
  setAPIOrigin(location, config);

  //on click, turns div to X or O and checks triggerEndGame
  //  $().on('click')

  createBoard();
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
  addHandlers();
});
