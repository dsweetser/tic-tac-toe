'use strict';

const api = require('./auth/api');
//const store = require('./store');

let game = {
  game: {
  cell:{
    index:'',
    value:'',},
    over: false
  }
};

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
    console.log('X Wins!');
    return ('X');
  } else if
      (((board[0] === 'o') && (board[1] === 'o') && (board[2] === 'o')) ||
      ((board[3] === 'o') && (board[4] === 'o') && (board[5] === 'o')) ||
      ((board[6] === 'o') && (board[7] === 'o') && (board[8] === 'o')) ||
      ((board[0] === 'o') && (board[3] === 'o') && (board[6] === 'o')) ||
      ((board[1] === 'o') && (board[4] === 'o') && (board[7] === 'o')) ||
      ((board[2] === 'o') && (board[5] === 'o') && (board[8] === 'o')) ||
      ((board[0] === 'o') && (board[4] === 'o') && (board[8] === 'o')) ||
      ((board[2] === 'o') && (board[4] === 'o') && (board[6] === 'o'))) {
    console.log('O Wins!');
    return ('O');
  } else if (turnCounter > 8) {
    console.log('Nobody Wins');
    return ('Nobody');
  }
};

//determines if click is X or O, sets the board position num to that value and
//increments turnCounter
const turnOrder = function (num) {
  if (board[num] !== '') {
    console.log('Invalid Move!');
    return 'Invalid Move';
  }

  if (turnCounter % 2 === 0) {
    board[num] = 'x';
  } else {
    board[num] = 'o';
  }

  turnCounter++;
};

const createBoard = function () {
  $('#board').html('<div class="container board" id="board"></div>');
  for (let i = 0; i < 9; i++) {
    $('#board').append('<div class="col-xs-4" id="' + i + '"></div>');
    if (board[i] === 'x') {
      $('#' + i).text('X');
    } else if (board[i] === 'o') {
      $('#' + i).text('O');
    }
  }
};

//x or o to server
const activePlayer = function () {
  if (turnCounter % 2 === 0) {
  return 'x';
} else {
  return 'o';
}
};

const testLogic = function (square) {
  game.game.cell.index = square;
  game.game.cell.value = activePlayer();
  turnOrder(square);
  console.log(board);
  console.log(game);
  if (triggerEndGame(board) === 'X') {
    $('#board').html('<div class="container board" id="board"></div>');
    $('#board').append('<div class="col-xs-12"><p>X WINS</p></div>');
    game.game.over = true;
  } else if (triggerEndGame(board) === 'O') {
    $('#board').html('<div class="container board" id="board"></div>');
    $('#board').append('<div class="col-xs-12"><p>O WINS</p></div>');
    game.game.over = true;
  } else if (triggerEndGame(board) === 'Nobody') {
    $('#board').html('<div class="container board" id="board"></div>');
    $('#board').append('<div class="col-xs-12"><p>nobody wins...</p></div>');
    game.game.over = true;
  } else {
    api.updateBoard(game); //id will need to change
    createBoard();
  }
};

module.exports = {
  triggerEndGame,
  turnCounter,
  turnOrder,
  board,
  testLogic,
  createBoard,
};

// sample testing arrays ['x','o','x','o','o','x','x','x','o'], ['x','','','','x','','','','x']
