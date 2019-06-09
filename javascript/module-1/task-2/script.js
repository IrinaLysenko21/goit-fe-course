'use strict'
const credits = 23580;
const pricePerDroid = 3000;
let quantity = Number(prompt('Какое количество дроидов вы хотите приобрести?'));
const totalPrice = quantity * pricePerDroid;
const balance = credits - quantity * pricePerDroid;

if (quantity === 0) {
  alert('Отменено пользователем!');
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

/*
 Без switch
*/

// if (quantity === 0) {
//   alert('Отменено пользователем!');
// } else if (totalPrice > credits) {
//   alert('Недостаточно средств на счету!');
// } else if (totalPrice <= credits) {
//   alert(`Вы купили ${quantity} дроидов, на счету осталось ${balance} кредитов.`);
// } else {
//   alert('Введите число!');
// }

/*
То же самое тернарным опреатором
*/

// message = quantity === 0 ? 'Отменено пользователем!':
//           totalPrice > credits ? 'Недостаточно средств на счету!':
//           totalPrice <= credits ? `Вы купили ${quantity} дроидов, на счету осталось ${balance} кредитов.`:
//           'Введите число!';

// alert(message);