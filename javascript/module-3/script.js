'use strict';

const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];
const userInput = prompt('Введите пароль');

/*
Обычные функции
*/

const isLoginValid = function(login) {
  return login.length >= 4 && login.length <= 16;
};

const isLoginUnique = function(allLogins, login) {
  return allLogins.includes(login);
};

const addLogin = function(allLogins, login) {
  if (isLoginValid(login)) {
    if(!isLoginUnique(allLogins, login)) {
      alert('Логин успешно добавлен!');
      allLogins.push(login);
    } else {
      alert('Такой логин уже используется!');
    }
  } else {
    alert('Ошибка! Логин должен быть от 4 до 16 символов');
  }
};

addLogin(logins, userInput);
console.log(logins);

/*
 Стрелочные функции + тернарный оператор:
 */

// const isLoginValid = (login) => login.length >= 4 && login.length <= 16 ? true : false;

// const isLoginUnique = (allLogins, login) => allLogins.includes(login) ? true : false;

// const addLogin = (allLogins, login) => {
//   if (isLoginValid(login)) {
//     !isLoginUnique(allLogins, login) ? allLogins.push(login) && alert('Логин успешно добавлен!') :
//     alert('Такой логин уже используется!');
//   } else {
//     alert('Ошибка! Логин должен быть от 4 до 16 символов');
//   }
// };

// addLogin(logins, userInput);
// console.log(logins);

