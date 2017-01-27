'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
const gameLogic = require('../game-logic');

const store = require('../store');

const onSignUp = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
    .then(ui.success)
    .catch(ui.failure);
};

const onSignIn = function (event) {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
    .then((response) => {
      store.user = response.user;
      console.log(store);
      return store.user;
    })
    .then(ui.success)
    .catch(ui.failure);
};

const onChangePassword = function (event) {
  event.preventDefault();

  let data = getFormFields(event.target);
  console.log(data);
  api.changePassword(data)
    .then(ui.success)
    .catch(ui.failure);
};

const onSignOut = function (event) {
  event.preventDefault();

  api.signOut()
    .then(() => {
      delete store.user;
      return store;
    })
    .then(ui.success)
    .catch(ui.failure);
};

//NEW STUFF BELOW

const getActiveGames = function (event) {
    event.preventDefault();
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
              '<div class="col-xs-11" id="temp">You Have No Open Games out of ' +
                total + ' games played!</div>');
          } else {
            $('#getGames').parent().parent().append(
              '<div class="col-xs-11" id="temp">Your Active Games are: ' + g +
                ' out of '+ (total-g.length) + ' games played.</div>');
          }
        }//console.log(store);
      })
  .then(ui.success)
  .catch(ui.failure);
  };

const newGame = function () {
  event.preventDefault();
  api.nova()
    .then((response) => {
      store.gameId = response.game.id;
    });
    console.log(store.game);
  //store.gameId = game.gameId;
  gameLogic.turnCounter = 0;
  gameLogic.board = ['', '', '', '', '', '', '', '', ''];
  gameLogic.createBoard();
};

const changeGame = function () {
  event.preventDefault();
  let data = getFormFields(event.target);
  store.gameId = data.GameId;

  api.getGame(store.gameId)
    .then((response) =>
  store.games = response.games);
  console.log(store.games);
  for (let i = 0, max = store.games.length; i < max; i++) {
    console.log(store.games[i].cells);
    // finds the matching game ID

    if (store.games[i].id === store.gameId) {
      gameLogic.board = store.games[i].cells;
      for (let i = 0; i < 9; i++) {

      }
      console.log(gameLogic.board);
    }
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
