'use strict';

(function () {
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
    'bungalo',
    'palace'
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
  var offers = [];

  // Генерация массива объектов недвижимости
  for (var i = 0; i < PINS_AMOUNT; i++) {
    var locationX = window.utils.getRandomNumber(LOCATION.X.MIN, LOCATION.X.MAX);
    var locationY = window.utils.getRandomNumber(LOCATION.Y.MIN, LOCATION.Y.MAX);
    offers[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': TITLE_OFFER[i],
        'address': locationX + ', ' + locationY,
        'price': window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': TYPE_OFFER[window.utils.getRandomNumber(0, TYPE_OFFER.length - 1)],
        'rooms': window.utils.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        'guests': window.utils.getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        'checkin': TIME_OFFER[window.utils.getRandomNumber(0, TIME_OFFER.length - 1)],
        'checkout': TIME_OFFER[window.utils.getRandomNumber(0, TIME_OFFER.length - 1)],
        'features': window.utils.getRandomArray(FEATURES_OFFER),
        'description': '',
        'photos': []
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }

  window.data = offers;
})();
