'use strict';

/* ======== Константы ======== */

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

/* ======== Переменные ======== */

var offers = [];
var map = document.querySelector('.map');
var pinsContainer = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinMain = map.querySelector('.map__pin--main');
var pinFragment = document.createDocumentFragment();
var currentPin = false;
var activePin = map.querySelector('.map__pin--active');
var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
var card = cardTemplate.cloneNode(true);
var cardCloseButton = card.querySelector('.popup__close');
var noticeForm = document.querySelector('.notice__form');

/* ======== Функции ======== */

// Функция для нахождения случайного числа; max не включен в диапазон => прибавляем 1
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для создания массива случайной длины из уникальных элементов
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

// Функция для создания рандомно полученные списки удобства в элементы списка li
var getFeaturesList = function (features) {
  var featuresElement = '';
  features.forEach(function (item) {
    featuresElement += '<li class="feature feature--' + item + '"></li>';
  });
  return featuresElement;
};

// Функция для генерации массива объектов недвижимости
var generateOffers = function () {
  for (var i = 0; i < PINS_AMOUNT; i++) {
    var locationX = getRandomNumber(LOCATION.X.MIN, LOCATION.X.MAX);
    var locationY = getRandomNumber(LOCATION.Y.MIN, LOCATION.Y.MAX);
    offers[i] = {
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
  return offers;
};

/* Функция принимает на вход элемент массива offers, соответствующий объявлению,
клонирует ноду пина из шаблона, вставляет координаты и изображение, назначает пину обработчик клика,
который передает элемент массива в функцию, изменяющую содержимое карточки */
var generatePin = function (offer) {
  var pinItem = pinTemplate.cloneNode(true);

  // Функция присваивает пину класс map__pin--active для открытия карточки объявления
  var openCard = function () {
    pinItem.classList.add('map__pin--active');
    createCard(offer);
    card.classList.remove('hidden');
  };

  // Открытие попапа мышкой
  var onPinItemClick = function () {
    openCard();
  };

  pinItem.addEventListener('click', onPinItemClick);

  // Открытие попапа с клавиатуры
  var onPinItemPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openCard();
    }
  };

  pinItem.addEventListener('keydown', onPinItemPress);

  var pinImage = pinItem.querySelector('img');
  pinItem.style.left = offer.location.x + 'px';
  pinItem.style.top = offer.location.y - PIN_HEIGHT / 2 + ARROW_HEIGHT + 'px';
  pinImage.src = offer.author.avatar;
  return pinItem;
};

/* Функция принимает на вход элемент массива offers,
отрисовыает каждый пин на карте в рандомном месте
и передает фрагмент каждого пина в функцию generatePin,
функция возовращает уже сформированную и готовую для вставки в разметку ноду */
var renderPins = function (items) {
  items.forEach(function (currentItem) {
    pinFragment.appendChild(generatePin(currentItem));
  });
};

/* Функция принимает на вход данные массива offers,
находит нужные селекторы в клонированном шаблоне и заполняет их соответствующими
данными из объекта в массиве offers, возвращает готовую карточку объявления */
var createCard = function (object) {
  card.querySelector('.popup__avatar').setAttribute('src', object.author.avatar);
  card.querySelector('h3').textContent = object.offer.title;
  card.querySelector('p small').textContent = object.offer.address;
  card.querySelector('.popup__price').textContent = object.offer.price + '\u20BD/ночь';
  card.querySelector('h4').textContent = TYPE_OFFER_VALUE[object.offer.type];
  card.querySelector('p:nth-of-type(3)').textContent = object.offer.rooms + ' для ' + object.offer.guests + ' гостей';
  card.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').insertAdjacentHTML('beforeEnd', getFeaturesList(object.offer.features));
  card.querySelector('p:nth-of-type(5)').textContent = object.offer.description;
  return card;
};

// Функция отрисовывает карточку объявления на основе первого объекта в массиве offers и добавляет ее в документ
var renderCards = function () {
  createCard(offers[0]);
  map.appendChild(card);
  card.classList.add('hidden');
};

// Функция проверяет наличие активных пинов, и удаляет у них класс map__pin--active
var deactivatePin = function () {
  if (currentPin !== false) {
    currentPin.classList.remove('map__pin--active');
    currentPin = false;
  }
};

/* ======== Функции - обработчики событий ======== */

// Функция активации карты для пользователя
var openMap = function () {
  map.classList.remove('map--faded');
  pinsContainer.appendChild(pinFragment);
  noticeForm.classList.remove('notice__form--disabled');
};

// Функция активации карты мышкой
var onPinMainClick = function () {
  openMap();
};

// Функция активации карты клавиатурой
var onPinMainPressEnter = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMap();
  }
};

// Функция закрытия попапа
var closeCard = function () {
  card.classList.add('hidden');
  activePin.classList.remove('map__pin--active');
};

// Функция закрытия попапа с помощью esc
var onPressEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeCard();
  }
};

// Функция закрытия попапа мышкой
var onCardCloseClick = function () {
  closeCard();
};

// Функция закрытия попапа с помощью enter
var onCardClosePressEnter = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeCard();
  }
};

/* ======== Логика работы ======== */

// Генерация массива объектов недвижимости
offers = generateOffers();

// Отрисовка пинов на карте
renderPins(offers);

// Заполнение карточек объявлений данными массива
renderCards(offers);

/* ======== Обработка событий ======== */

// Активация карты мышкой
pinMain.addEventListener('mouseup', onPinMainClick);

// Активация карты клавиатурой
pinMain.addEventListener('keydown', onPinMainPressEnter);

// Закрытие попапа с помощью esc
document.addEventListener('keydown', onPressEsc);

// Закрытие попапа мышкой
cardCloseButton.addEventListener('click', onCardCloseClick);

// Закрытие попапа с клавиатуры
cardCloseButton.addEventListener('keydown', onCardClosePressEnter);

// Убирает активный класс у пина
pinsContainer.addEventListener('click', function () {
  deactivatePin();
});

// Убирает активный класс у пина
pinsContainer.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    deactivatePin();
  }
});
