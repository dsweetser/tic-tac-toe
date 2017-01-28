'use strict';

const api = require('./auth/api');
const gameVar = require('./gameVar');
const store = require('./store');

//const store = require('./store');

let game = {
  game: {
    cell: {
      index: '',
      value: '',
    },
    over: false,
  },
};

// let turnCounter = 0;
// let board = ['', '', '', '', '', '', '', '', ''];

const gg = function () {
  if (store.user) {
    game.game.over = true;
    api.updateBoard(game);
  }
};

const createBoard = function () {
  $('#board').html('<div class="container board" id="board"></div>');
  for (let i = 0; i < 9; i++) {
    $('#board').append('<div class="col-xs-4" id="' + i + '"></div>');
    if (gameVar.board[i] === 'x') {
      $('#' + i).text('X');
    } else if (gameVar.board[i] === 'o') {
      $('#' + i).text('O');
    }
  }
};

const triggerEndGame = function () {
  let board = gameVar.board;
  let turnCounter = gameVar.turnCounter;
  console.log(board);
  if (((board[0] === 'x') && (board[1] === 'x') && (board[2] === 'x')) ||
      ((board[3] === 'x') && (board[4] === 'x') && (board[5] === 'x')) ||
      ((board[6] === 'x') && (board[7] === 'x') && (board[8] === 'x')) ||
      ((board[0] === 'x') && (board[3] === 'x') && (board[6] === 'x')) ||
      ((board[1] === 'x') && (board[4] === 'x') && (board[7] === 'x')) ||
      ((board[2] === 'x') && (board[5] === 'x') && (board[8] === 'x')) ||
      ((board[0] === 'x') && (board[4] === 'x') && (board[8] === 'x')) ||
      ((board[2] === 'x') && (board[4] === 'x') && (board[6] === 'x'))) {
    $('#board').html('<div class="container board" id="board"></div>');
    $('#board').append('<div class="col-xs-12"><p>X WINS</p></div>');
    gg();
  } else if
      (((board[0] === 'o') && (board[1] === 'o') && (board[2] === 'o')) ||
      ((board[3] === 'o') && (board[4] === 'o') && (board[5] === 'o')) ||
      ((board[6] === 'o') && (board[7] === 'o') && (board[8] === 'o')) ||
      ((board[0] === 'o') && (board[3] === 'o') && (board[6] === 'o')) ||
      ((board[1] === 'o') && (board[4] === 'o') && (board[7] === 'o')) ||
      ((board[2] === 'o') && (board[5] === 'o') && (board[8] === 'o')) ||
      ((board[0] === 'o') && (board[4] === 'o') && (board[8] === 'o')) ||
      ((board[2] === 'o') && (board[4] === 'o') && (board[6] === 'o'))) {
    $('#board').html('<div class="container board" id="board"></div>');
    $('#board').append('<div class="col-xs-12"><p>O WINS</p></div>');
    gg();
  } else if (turnCounter > 8) {
    $('#board').html('<div class="container board" id="board"></div>');
    $('#board').append('<div class="col-xs-12"><p>nobody wins...</p></div>');
    gg();
  } else {
    createBoard();
  }
};

//determines if click is X or O, sets the board position num to that value and
//increments turnCounter
const turnOrder = function (num) {
  if (gameVar.board[num] !== '') {
    return 'Invalid Move';
  }

  if (gameVar.turnCounter % 2 === 0) {
    gameVar.board[num] = 'x';
  } else {
    gameVar.board[num] = 'o';
  }

  gameVar.turnCounter++;
};

//x or o to server
const activePlayer = function () {
  if (gameVar.turnCounter % 2 === 0) {
    return 'x';
  } else {
    return 'o';
  }
};

const testLogic = function (square) {
  if (!gameVar.board) {
    console.log('should not be happening');
    gameVar.board = ['', '', '', '', '', '', '', '', ''];
  }

  if (!gameVar.turnCounter) {
    gameVar.turnCounter = 0;
  }

  game.game.cell.index = square;
  game.game.cell.value = activePlayer();
  turnOrder(square);
  triggerEndGame();
  if (store.user) {
    api.updateBoard(game);
  }
};

module.exports = {
  triggerEndGame,
  turnOrder,
  testLogic,
  createBoard,
};
