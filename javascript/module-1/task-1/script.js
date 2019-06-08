'use strict'
const ADMIN_PASSWORD = 'm4ng0h4ckz';
const userInput = prompt('Введите пароль');
let message = '';


if (userInput === null) {
  message = 'Отменено пользователем!';
  alert(message);
} else if (userInput === ADMIN_PASSWORD) {
  message = 'Добро пожаловать!';
  alert(message);
} else {
  message = 'Доступ запрещен, неверный пароль!';
  alert(message);
}


// То же самое тренарным опреатором


// message = userInput === null ? 'Отменено пользователем!' :
//           userInput === ADMIN_PASSWORD ? 'Добро пожаловать!' :
//           'Доступ запрещен, неверный пароль!';
// alert(message);
