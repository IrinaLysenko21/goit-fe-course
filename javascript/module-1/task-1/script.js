'use strict'
const ADMIN_PASSWORD = 'm4ng0h4ckz';
const userInput = prompt('Введите пароль');

if (userInput === null) {
  alert('Отменено пользователем!');
} else if (userInput === '') {
  alert('Пароль не был введен!');
} else if (userInput === ADMIN_PASSWORD) {
  alert('Добро пожаловать!');
} else {
  alert('Доступ запрещен, неверный пароль!');
}

/*
То же самое тернарным оператором
*/

// const ADMIN_PASSWORD = 'm4ng0h4ckz';
// const userInput = prompt('Введите пароль');
// let message = '';

// message = userInput === null ? 'Отменено пользователем!':
//           userInput === '' ? 'Пароль не был введен!':
//           userInput === ADMIN_PASSWORD ? 'Добро пожаловать!':
//           'Доступ запрещен, неверный пароль!';

// alert(message);
