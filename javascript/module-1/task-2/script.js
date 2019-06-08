'use strict'
const credits = 23580;
const pricePerDroid = 3000;
let quantity = Number(prompt('Какое количество дроидов вы хотите приобрести?'));
const totalPrice = quantity * pricePerDroid;
const balance = credits - quantity * pricePerDroid;
let message = '';

if (quantity === 0) {
  message = 'Отменено пользователем!';
  alert(message);
} else if (totalPrice > credits) {
  message = 'Недостаточно средств на счету!';
  alert(message);
} else if (totalPrice <= credits) {
  message = `Вы купили ${quantity} дроидов, на счету осталось ${balance} кредитов.`;
  alert(message);
} else {
  message = 'Введите число!';
  alert(message);
}

// То же самое тернарным опреатором

// message = quantity === 0 ? 'Отменено пользователем!':
//           totalPrice > credits ? 'Недостаточно средств на счету!':
//           totalPrice <= credits ? `Вы купили ${quantity} дроидов, на счету осталось ${balance} кредитов.`:
//           'Введите число!';

// alert(message);