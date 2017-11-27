'use strict';

/* var titleOffer = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var typeOffer = [
  'flat',
  'house',
  'bungalo'
];

var timeOffer = [
  '12:00',
  '13:00',
  '14:00'
];

var featuresOffer = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

// Нахождение случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создание массива объектов
var generateOfferList = function () {
  var offer = [];
  for (var i = 0; i < 8; i++) {
    var locationX = getRandomNumber(300, 900) + 40 / 2;
    var locationY = getRandomNumber(100, 500) + 40;
    offer[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': titleOffer[i],
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(1000, 1000000),
        'type': typeOffer[getRandomNumber(0, 2)],
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 5),
        'checkin': timeOffer[getRandomNumber(0, 2)],
        'checkout': timeOffer[getRandomNumber(0, 2)],
        'features': '',
        'description': '',
        'photos': []
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }
  return offer;
};
console.log(generateOfferList());
*/
