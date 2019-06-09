'use strict'
const userInput = prompt('Введите название вашей страны.');
let country = '';
let cost;

if (userInput === null) {
  alert('Отменено пользователем!');
} else if (userInput === '') {
  alert('Введите название страны!');
} else {
  switch (userInput.toLowerCase()) {

    case 'китай':
      country = 'Китай';
      cost = 100;
      alert(`Доставка в ${country} будет стоить ${cost} кредитов.`);
      break;

    case 'южная америка':
      country = 'Южную Америку';
      cost = 250;
      alert(`Доставка в ${country} будет стоить ${cost} кредитов.`);
      break;

    case 'австралия':
      country = 'Австралию';
      cost = 170;
      alert(`Доставка в ${country} будет стоить ${cost} кредитов.`);
      break;

    case 'индия':
      country = 'Индию';
      cost = 80;
      alert(`Доставка в ${country} будет стоить ${cost} кредитов.`);
      break;

    case 'ямайка':
        country = 'Ямайку';
        cost = 120;
        alert(`Доставка в ${country} будет стоить ${cost} кредитов.`);
        break;

    default:
      alert('В вашей стране доставка не доступна.');
  }
}

// if (userInput === null) {
//   alert('Отменено пользователем!');
// } else {
//   switch (userInput.toLowerCase()) {

//     case 'китай':
//       country = 'Китай';
//       cost = 100;
//       alert(`Доставка в ${country} будет стоить ${cost} кредитов.`);
//       break;

//     case 'южная америка':
//       country = 'Южную Америку';
//       cost = 250;
//       alert(`Доставка в ${country} будет стоить ${cost} кредитов.`);
//       break;

//     case 'австралия':
//       country = 'Австралию';
//       cost = 170;
//       alert(`Доставка в ${country} будет стоить ${cost} кредитов.`);
//       break;

//     case 'индия':
//       country = 'Индию';
//       cost = 80;
//       alert(`Доставка в ${country} будет стоить ${cost} кредитов.`);
//       break;

//     case 'ямайка':
//         country = 'Ямайку';
//         cost = 120;
//         alert(`Доставка в ${country} будет стоить ${cost} кредитов.`);
//         break;

//     default:
//       alert('В вашей стране доставка не доступна.');
//   }
// }