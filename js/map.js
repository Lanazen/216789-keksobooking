'use strict';

/* ======== Константы ======== */

var TYPE_OFFER_VALUE = {
  bungalo: 'Лачуга',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец'
};
var PIN_HEIGHT = 44;
var ARROW_HEIGHT = 18;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

/* ======== Переменные ======== */

var map = document.querySelector('.map');
var pinsContainer = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinMain = map.querySelector('.map__pin--main');
var pinFragment = document.createDocumentFragment();
var currentActivePin = false;
var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
var card = cardTemplate.cloneNode(true);
var cardCloseButton = card.querySelector('.popup__close');

/* ======== Функции ======== */

// Функция для создания рандомно полученные списки удобства в элементы списка li
var getFeaturesList = function (features) {
  var featuresElement = '';
  features.forEach(function (item) {
    featuresElement += '<li class="feature feature--' + item + '"></li>';
  });
  return featuresElement;
};

/* Функция принимает на вход элемент массива offers, соответствующий объявлению,
клонирует ноду пина из шаблона, вставляет координаты и изображение, назначает пину обработчик клика,
который передает элемент массива в функцию, изменяющую содержимое карточки */
var generatePin = function (offer) {
  var pinItem = pinTemplate.cloneNode(true);

  // Открытие попапа мышкой
  pinItem.addEventListener('click', onPinItemClick.bind(null, pinItem, offer));

  // Открытие попапа с клавиатуры
  pinItem.addEventListener('keydown', onPinItemPress.bind(null, pinItem, offer));

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

/* Функция проверяет наличие предыдущего активного пина, удаляет у него класс map__pin--active
и присваивает этот класс новому текущему активному пину */
var activatePin = function (pin) {
  if (currentActivePin === false) {
    pin.classList.add('map__pin--active');
  } else {
    currentActivePin.classList.remove('map__pin--active');
    pin.classList.add('map__pin--active');
  }
  currentActivePin = pin;
};

/* ======== Функции - обработчики событий ======== */

// Функция активации карты для пользователя
var openMap = function () {
  map.classList.remove('map--faded');
  pinsContainer.appendChild(pinFragment);
  window.form.activateForm();
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

/* Функция присваивает текущему пину класс map__pin--active, заполняет карточку
объявления данными, соответствующими этому пину, и открывает ее */
var openCard = function (currentPinItem, currentOffer) {
  activatePin(currentPinItem);
  createCard(currentOffer);
  card.classList.remove('hidden');
};

// Функция открытия попапа мышкой
var onPinItemClick = function (currentPinItem, currentOffer) {
  openCard(currentPinItem, currentOffer);
};

// Функция открытия попапа с клавиатуры
var onPinItemPress = function (evt, currentPinItem, currentOffer) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openCard(currentPinItem, currentOffer);
  }
};

// Функция закрытия попапа
var closeCard = function () {
  card.classList.add('hidden');
  currentActivePin.classList.remove('map__pin--active');
  currentActivePin = false;
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
var offers = window.data.generateOffers();

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
