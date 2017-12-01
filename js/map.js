'use strict';

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

var TYPE_OFFER_VALUE = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};

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

var offerList = generateOfferList();

// Убираем класс у карты
var mapImage = document.querySelector('.map');
mapImage.classList.remove('map--faded');

// Создание меток на карте и заполнение их данными из массива
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var generatePins = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.style.left = offer.location.x + 'px';
  pinElement.style.top = offer.location.y + 'px';
  pinImage.src = offer.author.avatar;
  return pinElement;
};


// Отрисовка меток и добавление полученных фрагментов в документ
var fillMapPins = function (offers) {
  var fragment = document.createDocumentFragment();
  offers.forEach(function (currentOffer) {
    fragment.appendChild(generatePins(currentOffer));
  });
  var pinsContainer = document.querySelector('.map__pins');
  pinsContainer.appendChild(fragment);
};

fillMapPins(offerList);

// Функция для отрисовки удобств в элементы списка
var getFeaturesElement = function (features) {
  var featuresElement = '';
  features.forEach(function (item) {
    featuresElement += '<li class="feature feature--' + item + '"></li>';
  });
  return featuresElement;
};

// Создание элементов объявления на основе шаблона и заполнение их данными из объекта
var offerTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderOfferList = function (object) {
  var offerElement = offerTemplate.cloneNode(true);
  offerElement.querySelector('.popup__avatar').setAttribute('src', object.author.avatar);
  offerElement.querySelector('h3').textContent = object.offer.title;
  offerElement.querySelector('p small').textContent = object.offer.address;
  offerElement.querySelector('.popup__price').textContent = object.offer.price + '\u20BD/ночь';
  offerElement.querySelector('h4').textContent = TYPE_OFFER_VALUE[object.offer.type];
  offerElement.querySelector('p:nth-of-type(3)').textContent = object.offer.rooms + ' для ' + object.offer.guests + ' гостей';
  offerElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  offerElement.querySelector('.popup__features').innerHTML = '';
  offerElement.querySelector('.popup__features').insertAdjacentHTML('beforeEnd', getFeaturesElement(object.offer.features));
  offerElement.querySelector('p:nth-of-type(5)').textContent = object.offer.description;
  return offerElement;
};

// Отрисовка похожих объявлений и добавление их в документ
var fillMapOffers = function (adverts) {
  var offerContainer = document.querySelector('.map');
  offerContainer.appendChild(renderOfferList(adverts));
};

fillMapOffers(offerList[0]);
