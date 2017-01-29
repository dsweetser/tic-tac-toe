'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

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
  api.signUp(data);
  $('.login').hide();
  $('.userstuff').show();

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
      return store.user;
    });
    $('.login').hide();
    $('.userstuff').show();
};

const onChangePassword = function (event) {
  event.preventDefault();
  if ($('.col-xs-10')) {
    $('.col-xs-10').remove();
  }

  let data = getFormFields(event.target);
  api.changePassword(data);

  // .then(ui.success)
  // .catch(ui.failure);

};

const onSignOut = function (event) {
  event.preventDefault();
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

  if (store.user) {
    let data = getFormFields(event.target);
    store.gameId = data.GameId;

    api.getGame(store.gameId)
    .then((response) =>
    store.games = response.games);
    for (let i = 0, max = store.games.length; i < max; i++) {

      // finds the matching game ID

      if (store.games[i].id.toString() === store.gameId.toString()) {
        gameVar.board = store.games[i].cells;
        let num = 0;
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
