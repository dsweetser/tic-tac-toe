'use strict';

const config = require('../config');
const store = require('../store');

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data,
  });
};

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data,
  });
};

const changePassword = function (data) {
  return $.ajax({
    url: `${config.apiOrigin}/change-password/${store.user.id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};

const signOut = function () {
  return $.ajax({
    url: `${config.apiOrigin}/sign-out/${store.user.id}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

// NEW THINGS
const get = function () {
  return $.ajax({
    url: `${config.apiOrigin}/games/`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

const getGame = function (id) {
  return $.ajax({
    url: `${config.apiOrigin}/games/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

const nova = function () {
  return $.ajax({
    url: `${config.apiOrigin}/games/`,
    method: 'POST',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
  });
};

const updateBoard = function (data) {
  return $.ajax({
    url: `${config.apiOrigin}/games/${store.gameId}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${store.user.token}`,
    },
    data,
  });
};

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  get,
  updateBoard,
  nova,
  getGame,
};
