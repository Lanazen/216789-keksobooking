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
var PIN_HEIGHT = 44;
var ARROW_HEIGHT = 18;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

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
var mapImage = document.querySelector('.map');
var pinsContainer = document.querySelector('.map__pins');
var mainPinElement = mapImage.querySelector('.map__pin--main');
var fragment = document.createDocumentFragment();
var noticeForm = document.querySelector('.notice__form');

// Создание меток на карте и заполнение их данными из массива
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var generatePins = function (offer) {
  var pinElement = pinTemplate.cloneNode(true);

  // Открытие попапа
  var openPopup = function () {
    pinElement.classList.add('map__pin--active');
    fillMapOffers(offerList[0]);
  };

  // Открытие попапа мышкой
  pinElement.addEventListener('mouseup', function () {
    openPopup();
  });

  // Открытие попапа с клавиатуры
  pinElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  var pinImage = pinElement.querySelector('img');
  pinElement.style.left = offer.location.x + 'px';
  pinElement.style.top = offer.location.y - PIN_HEIGHT / 2 + ARROW_HEIGHT + 'px';
  pinImage.src = offer.author.avatar;
  return pinElement;
};

// Отрисовка меток на карте
var fillMapPins = function (offers) {
  offers.forEach(function (currentOffer) {
    fragment.appendChild(generatePins(currentOffer));
  });
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
var offerElement = offerTemplate.cloneNode(true);
var popupCloseButton = offerElement.querySelector('.popup__close');

var renderOfferList = function (object) {
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

var offerContainer = document.querySelector('.map');

// Отрисовка похожих объявлений и добавление их в документ
var fillMapOffers = function (adverts) {
  offerContainer.appendChild(renderOfferList(adverts));
};

// Делаем карту активной для пользователя
var openMap = function () {
  mapImage.classList.remove('map--faded');
  pinsContainer.appendChild(fragment);
  noticeForm.classList.remove('notice__form--disabled');
};

// Активация карты мышкой
mainPinElement.addEventListener('mouseup', function () {
  openMap();
});

// Активация карты клавиатурой
mainPinElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMap();
  }
});

// Закрытие попапа
var closePopup = function () {
  offerElement.classList.add('hidden');
  var pinActive = mapImage.querySelector('.map__pin--active');
  pinActive.classList.remove('map__pin--active');
};

// Закрытие попапа с помощью esc
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
});

// Закрытие попапа мышкой
popupCloseButton.addEventListener('mouseup', function () {
  closePopup();
});

// Закрытие попапа с клавиатуры
popupCloseButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
