'use strict';

let input;
const numbers = [];

do {
  input = prompt('Введите число!');
  if (input === null) break;
  let userNum = Number(input);

  if (isNaN(userNum) === true) {
    alert('Было введено не число, попробуйте ещё раз!');
  } else {
    numbers.push(userNum);
  }
} while (input !== null);

console.log(numbers);

let total = 0;

for (let i = 0; i < numbers.length; i += 1) {
  total += numbers[i];
}

if (numbers.length !== 0) {
  console.log(`Общая сумма чисел равна ${total}.`);
}