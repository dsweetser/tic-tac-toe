'use strict';

const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');

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
      for (let i = 0, max = store.games.length; i < max; i++) {
        if (store.games[i].over === false) {
          g.push(store.games[i].id);
        }

        $('#getGames').parent().parent().append('<div class="col-xs-11">Your Active Games are: ' +
        g + '.</div>');
      }//console.log(store);
    })
    .then(ui.success)
    .catch(ui.failure);
  };

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('submit', onSignOut);
  $('#getGames').on('submit', getActiveGames);
};

module.exports = {
  addHandlers,
};
