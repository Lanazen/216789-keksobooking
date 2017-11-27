'use strict';

/* var TITLEOFFER = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPEOFFER = [
  'flat',
  'house',
  'bungalo'
];

var TIMEOFFER = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURESOFFER = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

// Нахождение случайного числа, max не включен в диапазон, поэтому прибавляем 1
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создание массива случайной длины
var getRandomArray = function () {
  var randomFeature = [];
  for (var i = 0; i < getRandomNumber(1, FEATURESOFFER.length - 1); i++) {
    randomFeature[i] = FEATURESOFFER[getRandomNumber(0, FEATURESOFFER.length - 1)];
  }
  return randomFeature;
};

// Создание массива объектов
var generateOfferList = function () {
  var offer = [];
  for (var i = 0; i < 8; i++) {
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);
    offer[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': TITLEOFFER[i],
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(1000, 1000000),
        'type': TYPEOFFER[getRandomNumber(0, TYPEOFFER.length - 1)],
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 5),
        'checkin': TIMEOFFER[getRandomNumber(0, TIMEOFFER.length - 1)],
        'checkout': TIMEOFFER[getRandomNumber(0, TIMEOFFER.length - 1)],
        'features': getRandomArray(),
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
