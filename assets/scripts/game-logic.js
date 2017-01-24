'use strict';

let cells = ['', '', '', '', '', '', '', '', ''];

const triggerEndGame = function (board) {
  if ((board[0] && board[1] && board[2] === 'x') || (board[3] && board[4] && board[5] === 'x') ||
      (board[6] && board[7] && board[8] === 'x') || (board[0] && board[4] && board[8] === 'x') ||
      (board[2] && board[4] && board[6] === 'x')) {
    console.log('X Wins!');
  } else if ((board[0] && board[1] && board[2] === 'o') || (board[3] && board[4] &&
      board[5] === 'o') || (board[6] && board[7] && board[8] === 'o') || (board[0] &&
        board[4] && board[8] === 'o') || (board[2] && board[4] && board[6] === 'o')) {
    console.log('O Wins!');
  }
};

triggerEndGame(cells);

// sample testing arrays ['x','','','x','','','x','',''], ['x','','','','x','','','','x']
