'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);
const ui = require('./ui');
const api = require('./api');

// const ui = require('./ui');

const gameLogic = require('../game-logic');
const gameVar = require('../gameVar.js');

const store = require('../store');

const onSignUp = function (event) {
  event.preventDefault();
  if ($('.col-xs-10')) {
    $('.col-xs-10').remove();
  }

  let data = getFormFields(event.target);
  $('#sign-up')[0].reset();

  api.signUp(data)
    .then(ui.signUpYes)
    .catch(ui.signUpNo);

  // $('.login').hide();
  // $('.userstuff').show();

};

const onSignIn = function (event) {
  event.preventDefault();
  if ($('.col-xs-10')) {
    $('.col-xs-10').remove();
  }

  let data = getFormFields(event.target);
  api.signIn(data)
    .then((response) => {
      store.user = response.user;
    $('#sign-in')[0].reset();
    $('.login').hide();
    $('.userstuff').show();
 })
    .catch(ui.signInNo);
    $('#sign-in')[0].reset();
};

const onChangePassword = function (event) {
  event.preventDefault();
  if ($('.col-xs-10')) {
    $('.col-xs-10').remove();
  }

  let data = getFormFields(event.target);
  $('#change-password')[0].reset();
  api.changePassword(data)
  .then(ui.changePasswordYes)
  .catch(ui.changePasswordNo);


  // .then(ui.success)
  // .catch(ui.failure);

};

const onSignOut = function (event) {
  event.preventDefault();
  $('#board').html('<div class="container board" id="board"></div>');
  $('.login').show();
  $('.userstuff').hide();
  if ($('.col-xs-10')) {
    $('.col-xs-10').remove();
  }

  api.signOut()
    .then(() => {
      delete store.user;
      return store;
    });

};

//NEW STUFF BELOW

const getActiveGames = function (event) {
    event.preventDefault();
    if ($('.col-xs-10')) {
      $('.col-xs-10').remove();
    }

    if (store.user) {
      api.get()
      .then((response) => {
        store.games = response.games;
        let g = [];
        let total = store.games.length;
        for (let i = 0, max = store.games.length; i < max; i++) {
          if (store.games[i].over === false) {
            g.push(store.games[i].id);
          }

          if ($('#temp')) {
            $('#temp').remove();
          }

          if (g[0] === undefined) {
            $('#getGames').parent().parent().append(
              '<div class="row"><div class="col-xs-10" id="temp">You Have No Open Games out of ' +
                total + ' games played!</div></div>');
          } else {
            $('#getGames').parent().parent().append(
              '<div class="row"><div class="col-xs-10" id="temp">Your Active Games are: ' + g +
                ' out of ' + (total - g.length) + ' games played.</div></div>');
          }
        }
      });

      // .then(ui.success)
      // .catch(ui.failure);

    } else {
      $('#getGames').parent().parent().append(
      '<div class="row"><div class="col-xs-10">You must be logged in to do this!</div></div>');
    }
  };

const newGame = function () {
  event.preventDefault();
  if ($('.col-xs-10')) {
    $('.col-xs-10').remove();
  }

  if (store.user) {
    api.nova()
    .then((response) => {
      store.gameId = response.game.id;
    });
  }

  gameVar.turnCounter = 0;
  gameVar.board = ['', '', '', '', '', '', '', '', ''];
  gameLogic.createBoard();
};

const changeGame = function () {
  event.preventDefault();
  if ($('.col-xs-10')) {
    $('.col-xs-10').remove();
  }

// if the user is logged in

  if (store.user) {

// gets the game that was entered in and stores it as store.gameId

    let data = getFormFields(event.target);
    store.gameId = data.GameId;

// saves the data the API sends back as store.games

    api.getGame(store.gameId)
    .then((response) =>
    store.games = response.games);
    for (let i = 0, max = store.games.length; i < max; i++) {

      // goes through list of games to find the matching game ID

      if (store.games[i].id.toString() === store.gameId.toString()) {
        gameVar.board = store.games[i].cells;
        let num = 0;

        // calculates turn counter

        for (let j = 0; j < 9; j++) {
          if (gameVar.board[j] !== '') {
            num++;
          }

          // matches the found game state

          gameVar.turnCounter = num;
          gameLogic.createBoard();
        }
      }
    }
  } else {
    $('#SwitchGame').parent().parent().append(
      '<div class="col-xs-10 warning">You must be logged in to do this!</div>');
  }
  $('#SwitchGame')[0].reset();
};

const run = function (event) {
  event.preventDefault();
  let square = parseInt(event.target.id);
  gameLogic.testLogic(square);
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('submit', onSignOut);
  $('#getGames').on('submit', getActiveGames);
  $('#SwitchGame').on('submit', changeGame);
  $('#reset').on('click', newGame);
  $('#board').on('click', run);
};

module.exports = {
  addHandlers,
};
