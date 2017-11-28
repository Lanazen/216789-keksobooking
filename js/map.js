'use strict';

/*
var TITLE_OFFER = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPE_OFFER = [
  'flat',
  'house',
  'bungalo'
];

var TIME_OFFER = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES_OFFER = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var LOCATION = {
  X: {
    MIN: 300,
    MAX: 900
  },
  Y: {
    MIN: 100,
    MAX: 500
  }
};

var PINS_AMOUNT = 8;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 5;

// Нахождение случайного числа, max не включен в диапазон, поэтому прибавляем 1
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создание массива случайной длины из уникальных элементов
var getRandomArray = function () {
  var resultFeatures = [];
  var featuresOfferCopy = FEATURES_OFFER.slice();
  var randomArrayLength = getRandomNumber(0, featuresOfferCopy.length - 1);
  for (var i = 0; i <= randomArrayLength; i++) {
    var indexRandom = getRandomNumber(0, featuresOfferCopy.length - 1);
    resultFeatures[i] = featuresOfferCopy.splice(indexRandom, 1).toString();
  }
  return resultFeatures;
};

// Создание массива объектов
var generateOfferList = function () {
  var offer = [];
  for (var i = 0; i < PINS_AMOUNT; i++) {
    var locationX = getRandomNumber(LOCATION.X.MIN, LOCATION.X.MAX);
    var locationY = getRandomNumber(LOCATION.Y.MIN, LOCATION.Y.MAX);
    offer[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': TITLE_OFFER[i],
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': TYPE_OFFER[getRandomNumber(0, TYPE_OFFER.length - 1)],
        'rooms': getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        'checkin': TIME_OFFER[getRandomNumber(0, TIME_OFFER.length - 1)],
        'checkout': TIME_OFFER[getRandomNumber(0, TIME_OFFER.length - 1)],
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
