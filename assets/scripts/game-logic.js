'use strict';

let turnCounter = 0;
let board = ['', '', '', '', '', '', '', '', ''];

const triggerEndGame = function (board) {
  if (((board[0] === 'x') && (board[1] === 'x') && (board[2] === 'x')) ||
      ((board[3] === 'x') && (board[4] === 'x') && (board[5] === 'x')) ||
      ((board[6] === 'x') && (board[7] === 'x') && (board[8] === 'x')) ||
      ((board[0] === 'x') && (board[3] === 'x') && (board[6] === 'x')) ||
      ((board[1] === 'x') && (board[4] === 'x') && (board[7] === 'x')) ||
      ((board[2] === 'x') && (board[5] === 'x') && (board[8] === 'x')) ||
      ((board[0] === 'x') && (board[4] === 'x') && (board[8] === 'x')) ||
      ((board[2] === 'x') && (board[4] === 'x') && (board[6] === 'x'))) {
    return ('X Wins!');
  } else if
      (((board[0] === 'o') && (board[1] === 'o') && (board[2] === 'o')) ||
      ((board[3] === 'o') && (board[4] === 'o') && (board[5] === 'o')) ||
      ((board[6] === 'o') && (board[7] === 'o') && (board[8] === 'o')) ||
      ((board[0] === 'o') && (board[3] === 'o') && (board[6] === 'o')) ||
      ((board[1] === 'o') && (board[4] === 'o') && (board[7] === 'o')) ||
      ((board[2] === 'o') && (board[5] === 'o') && (board[8] === 'o')) ||
      ((board[0] === 'o') && (board[4] === 'o') && (board[8] === 'o')) ||
      ((board[2] === 'o') && (board[4] === 'o') && (board[6] === 'o'))) {
    return ('O Wins!');
  } else if (turnCounter > 8) {
    return ('Nobody Wins!');
  }
};

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

// this function tests the above logic, will need to be reimplemented elsewhere
const testLogic = function (square) {
  turnOrder(square);
  console.log(board);
  return triggerEndGame(board);
};

testLogic();

module.exports = {
  triggerEndGame,
};

// sample testing arrays ['x','o','x','o','o','x','x','x','o'], ['x','','','','x','','','','x']
