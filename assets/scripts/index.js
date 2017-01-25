'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');

let turnCounter = 0;
let board = ['', '', '', '', '', '', '', '', ''];

//determines if click is X or O, sets the board position num to that value and
//increments turnCounter
const turnOrder = function (num) {
  if (turnCounter % 2 === 0) {
    board[num] = 'x';
  } else {
    board[num] = 'o';
  }

  turnCounter++;
};

$(() => {
  setAPIOrigin(location, config);
  turnOrder();

  //on click, turns div to X or O and checks triggerEndGame
  //  $().on('click')

});

// use require with a reference to bundle the file and use it in this file
// const example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');
