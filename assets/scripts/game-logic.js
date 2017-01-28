'use strict';

const api = require('./auth/api');
const gameVar = require('./gameVar');

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

const triggerEndGame = function () {
  if (((gameVar.board[0] === 'x') && (gameVar.board[1] === 'x') && (gameVar.board[2] === 'x')) ||
      ((gameVar.board[3] === 'x') && (gameVar.board[4] === 'x') && (gameVar.board[5] === 'x')) ||
      ((gameVar.board[6] === 'x') && (gameVar.board[7] === 'x') && (gameVar.board[8] === 'x')) ||
      ((gameVar.board[0] === 'x') && (gameVar.board[3] === 'x') && (gameVar.board[6] === 'x')) ||
      ((gameVar.board[1] === 'x') && (gameVar.board[4] === 'x') && (gameVar.board[7] === 'x')) ||
      ((gameVar.board[2] === 'x') && (gameVar.board[5] === 'x') && (gameVar.board[8] === 'x')) ||
      ((gameVar.board[0] === 'x') && (gameVar.board[4] === 'x') && (gameVar.board[8] === 'x')) ||
      ((gameVar.board[2] === 'x') && (gameVar.board[4] === 'x') && (gameVar.board[6] === 'x'))) {
    console.log('X Wins!');
    return ('X');
  } else if
      (((gameVar.board[0] === 'o') && (gameVar.board[1] === 'o') && (gameVar.board[2] === 'o')) ||
      ((gameVar.board[3] === 'o') && (gameVar.board[4] === 'o') && (gameVar.board[5] === 'o')) ||
      ((gameVar.board[6] === 'o') && (gameVar.board[7] === 'o') && (gameVar.board[8] === 'o')) ||
      ((gameVar.board[0] === 'o') && (gameVar.board[3] === 'o') && (gameVar.board[6] === 'o')) ||
      ((gameVar.board[1] === 'o') && (gameVar.board[4] === 'o') && (gameVar.board[7] === 'o')) ||
      ((gameVar.board[2] === 'o') && (gameVar.board[5] === 'o') && (gameVar.board[8] === 'o')) ||
      ((gameVar.board[0] === 'o') && (gameVar.board[4] === 'o') && (gameVar.board[8] === 'o')) ||
      ((gameVar.board[2] === 'o') && (gameVar.board[4] === 'o') && (gameVar.board[6] === 'o'))) {
    console.log('O Wins!');
    return ('O');
  } else if (gameVar.turnCounter > 8) {
    console.log('Nobody Wins');
    return ('Nobody');
  }
};

//determines if click is X or O, sets the board position num to that value and
//increments turnCounter
const turnOrder = function (num) {
  if (gameVar.board[num] !== '') {
    console.log('Invalid Move!');
    return 'Invalid Move';
  }

  if (gameVar.turnCounter % 2 === 0) {
    gameVar.board[num] = 'x';
  } else {
    gameVar.board[num] = 'o';
  }

  gameVar.turnCounter++;
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
  console.log('repainted');
};

//x or o to server
const activePlayer = function () {
  if (gameVar.turnCounter % 2 === 0) {
    return 'x';
  } else {
    return 'o';
  }
};

const gg = function () {
  game.game.over = true;
  api.updateBoard(game);
};

const testLogic = function (square) {
  if (!gameVar.board) {
    gameVar.board = ['', '', '', '', '', '', '', '', ''];
  }
  if (!gameVar.turnCounter) {
    gameVar.turnCounter = 0;
  }
  game.game.cell.index = square;
  game.game.cell.value = activePlayer();
  turnOrder(square);
  // console.log(board);
  // console.log(game);
  if (triggerEndGame(gameVar.board) === 'X') {
    $('#board').html('<div class="container board" id="board"></div>');
    $('#board').append('<div class="col-xs-12"><p>X WINS</p></div>');
    gg();
  } else if (triggerEndGame(gameVar.board) === 'O') {
    $('#board').html('<div class="container board" id="board"></div>');
    $('#board').append('<div class="col-xs-12"><p>O WINS</p></div>');
    gg();
  } else if (triggerEndGame(gameVar.board) === 'Nobody') {
    $('#board').html('<div class="container board" id="board"></div>');
    $('#board').append('<div class="col-xs-12"><p>nobody wins...</p></div>');
    gg();
  } else {
    api.updateBoard(game); //id will need to change
    createBoard();
  }
};

module.exports = {
  triggerEndGame,
//  turnCounter,
  turnOrder,
//  board,
  testLogic,
  createBoard,
};

// sample testing arrays ['x','o','x','o','o','x','x','x','o'], ['x','','','','x','','','','x']
