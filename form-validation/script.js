"use strict";

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const checkPassword = document.getElementById("check-password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

const checkInputs = function () {
  // get the values from the inputs
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const checkPasswordValue = checkPassword.value.trim();

  // Check Username
  if (usernameValue === "") {
    setErroFor(username, "Username cannot be blank");
  } else {
    setSuccessFor(username);
  }

  // Check Email
  if (emailValue === "") {
    setErroFor(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    setErroFor(email, "Email is not valid");
  } else {
    setSuccessFor(email);
  }

  // Check Password
  if (passwordValue === "") {
    setErroFor(password, "Password cannot be blank");
  } else {
    setSuccessFor(password);
  }

  // Check if Password match
  if (checkPasswordValue === "") {
    setErroFor(checkPassword, "Check Password cannot be blank");
  } else if (checkPasswordValue !== passwordValue) {
    setErroFor(checkPassword, "Passwords does not match");
  } else {
    setSuccessFor(checkPassword);
  }
};

const setErroFor = function (input, message) {
  const formInput = input.parentElement; // .form-input
  const small = formInput.querySelector("small");

  // add error message inside small
  small.innerText = message;

  // add error class
  formInput.className = "form-input error";
};

const setSuccessFor = function (input, message) {
  const formInput = input.parentElement; // .form-input

  // add success class
  formInput.className = "form-input success";
};

// Check if email input is valid
const isEmail = function (email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};
