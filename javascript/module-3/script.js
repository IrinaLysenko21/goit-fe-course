'use strict';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];
const userInput = prompt('Введите пароль');

const isLoginValid = function(login) {
  let result;
  if (login.length >= 4 && login.length <= 16) {
    result = true;
  } else {
    result = false;
  }
  return result;
};

const isLoginUnique = function(allLogins, login) {
  let result;
  if (!allLogins.includes(login)) {
    result = true;
  } else {
    result = false;
  }
  return result;
};

const addLogin = function(allLogins, login) {
  let result = isLoginValid(login);
  if (result !== false) {
    result = isLoginUnique(allLogins, login);
    if (result === true) {
      allLogins.push(login);
      alert('Логин успешно добавлен!');
    } else {
      alert('Такой логин уже используется!');
    }
  } else {
    alert('Ошибка! Логин должен быть от 4 до 16 символов');
  }
};

addLogin(logins, userInput);

console.log(logins);