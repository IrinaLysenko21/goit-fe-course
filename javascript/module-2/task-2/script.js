'use strict';

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attemptsLeft = 3;
let warning;

const userInput = prompt('Введите пароль');

if (userInput !== null) {
  if (userInput === '') {
    alert('Пароль не был введен!');
  } else if (!passwords.includes(userInput)) {
    do {
      warning = prompt(`Неверный пароль, у вас осталось ${attemptsLeft} попыток!`);
      if (!passwords.includes(warning)) {
        while (warning === '') {
          alert('Пароль не был введен!');
          attemptsLeft += 1;
          break;
        }
        attemptsLeft -= 1;
        if (attemptsLeft === 0) {
        alert('У вас закончились попытки, аккаунт заблокирован!');
        break;
        }
      } else {
        alert('Добро пожаловать!');
        break;
      }
    } while (warning !== null);
  } else {
    alert('Добро пожаловать!');
  }
} else {
  alert('Вы нажали отмену!');
}