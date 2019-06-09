'use strict'
const credits = 23580;
const pricePerDroid = 3000;
const userInput = prompt('Какое количество дроидов вы хотите приобрести?');
const quantity = Number(userInput);
const totalPrice = quantity * pricePerDroid;
const balance = credits - quantity * pricePerDroid;

if (userInput === null) {
  alert('Отменено пользователем!');
} else if (userInput === '') {
  alert('Введите количество!');
} else {

  switch (true) {
    case totalPrice > credits:
      alert('Недостаточно средств на счету!');
      break;

    case totalPrice <= credits:
      alert(`Вы купили ${quantity} дроидов, на счету осталось ${balance} кредитов.`);
      break;

    default:
      alert('Введите число!');
  }
}