'use strict';

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attemptsLeft = 3;

let userInput = prompt('Введите пароль');

if (userInput !== null) {
  if (!passwords.includes(userInput)) {
    while (userInput !== null) {
      userInput = prompt(`Неверный пароль, у вас осталось ${attemptsLeft} попыток!`);
      if (userInput === null) break;
      if (!passwords.includes(userInput)) {
        attemptsLeft -= 1;
        if (attemptsLeft === 0) {
        alert('У вас закончились попытки, аккаунт заблокирован!');
        break;
        }
      } else {
        alert('Добро пожаловать!');
        break;
      }
    }
  } else {
    alert('Добро пожаловать!');
  }
} else {
  alert('Вы нажали отмену!');
}