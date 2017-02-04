'use strict';

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

const signUpYes = () => {
  $('#sign-up').append(
  '<div class="row"><div class="col-xs-10" id="temp">New User Created!</div></div>');
  $('#sign-up')[0].reset();
};

const signUpNo = () => {
  if ($('.col-xs-10')) {
    $('.col-xs-10').remove();
  }
  $('#sign-up').append(
  '<div class="row"><div class="col-xs-10 red" id="temp">Username already taken</div></div>');
};

const changePasswordYes = () =>{
  $('#change-password').append(
  '<div class="row"><div class="col-xs-10" id="temp">Password Successfully Changed!</div></div>');
    $('#change-password')[0].reset();
};

const changePasswordNo = () =>{
  if ($('.col-xs-10')) {
    $('.col-xs-10').remove();
  }
  $('#change-password').append(
  '<div class="row"><div class="col-xs-10 red" id="temp">Bad Password, Please Retry</div></div>');
};

const signInNo = () =>{
  $('#sign-in').append(
    '<div class="row"><div class="col-xs-10 red" id="temp">Invalid Username or Password</div></div>');
};

module.exports = {
  failure,
  success,
  signUpYes,
  signUpNo,
  changePasswordYes,
  changePasswordNo,
  signInNo,
};
