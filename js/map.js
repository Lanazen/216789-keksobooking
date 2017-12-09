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
  'bungalo',
  'palace'
];
var TYPE_OFFER_VALUE = {
  bungalo: 'Лачуга',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец'
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
var currentActivePin = false;
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
  noticeForm.classList.remove('notice__form--disabled');
  formFieldset.forEach(function (item) {
    item.removeAttribute('disabled');
  });
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

/* ======== ВАЛИДАЦИЯ ФОРМЫ ======== */

/* ======== Переменные ======== */

var formFieldset = noticeForm.querySelectorAll('fieldset');
var inputTitle = noticeForm.querySelector('#title');
var inputAddress = noticeForm.querySelector('#address');
var selectTimein = noticeForm.querySelector('#timein');
var selectTimeout = noticeForm.querySelector('#timeout');
var selectHouseType = noticeForm.querySelector('#type');
var inputMinPrice = noticeForm.querySelector('#price');
var houseTypeMinPrice = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};
var selectRoomNumber = noticeForm.querySelector('#room_number');
var selectCapacity = noticeForm.querySelector('#capacity');
var numberOfGuests = selectCapacity.querySelectorAll('option');
var RoomsCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

/* ======== Функции ======== */

var setNoticeForm = function () {
  formFieldset.forEach(function (item) {
    item.setAttribute('disabled', 'true');
  });
  noticeForm.setAttribute('action', 'https://js.dump.academy/keksobooking');
  noticeForm.setAttribute('type', 'multipart/form-data');
  inputAddress.setAttribute('required', 'true');
  inputAddress.setAttribute('readonly', 'true');
  inputAddress.setAttribute('placeholder', 'Поставьте метку для установки координат');
  inputTitle.setAttribute('required', 'true');
  inputTitle.setAttribute('minlength', '30');
  inputTitle.setAttribute('maxlength', '100');
  inputMinPrice.setAttribute('required', 'true');
  inputMinPrice.setAttribute('type', 'number');
  inputMinPrice.setAttribute('min', '0');
  inputMinPrice.setAttribute('max', '1000000');
  inputMinPrice.setAttribute('value', '1000');
};

setNoticeForm();

/* ======== Функции - обработчики событий ======== */

// Функция для синхронизации полей «время заезда» и «время выезда»
var timeSync = function (inputField, inputValue) {
  var selectInput = false;
  selectInput = inputField.value;
  inputValue.value = selectInput;
};

// Синхронизация поля «время выезда» при введенном поле «время заезда»
var onChangeCheckin = function () {
  timeSync(selectTimein, selectTimeout);
};

// Синхронизация поля «время заезда» при введенном поле «время выезда»
var onChangeCheckout = function (evt) {
  selectTimein.value = evt.target.value;
};

// Функция для синхронизации поля «Тип жилья» с минимальной ценой
var onChangeType = function () {
  inputMinPrice.min = houseTypeMinPrice[selectHouseType.value];
  inputMinPrice.placeholder = inputMinPrice.min;
};

// Функция проверки на валидность заголовка объявления
var onInvalidTitle = function (evt) {
  inputTitle.style.borderColor = 'red';
  if (inputTitle.validity.tooShort || evt.target.value.length < 30) {
    inputTitle.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (inputTitle.validity.tooLong) {
    inputTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('Пожалуйста, заполните это поле');
  } else {
    inputTitle.setCustomValidity('');
    inputTitle.style.borderColor = 'none';
  }
};

// Функция проверки ввода минимальной цены
var onInvalidMinPrice = function () {
  inputMinPrice.style.borderColor = 'red';
  if (inputMinPrice.validity.rangeUnderflow) {
    inputMinPrice.setCustomValidity('Стоимость жилья меньше допустимой');
  } else if (inputMinPrice.validity.rangeOverflow) {
    inputMinPrice.setCustomValidity('Стоимость жилья выше допустимой');
  } else if (inputMinPrice.validity.valueMissing) {
    inputMinPrice.setCustomValidity('Пожалуйста, заполните это поле');
  } else {
    inputMinPrice.setCustomValidity('');
    inputMinPrice.style.borderColor = 'none';
  }
};

/* Функция синхронизации количества комнат с количеством гостей:
с помощью записи (RoomsCapacity[evt.target.value].indexOf(numberOfGuests[i].value)) получаем
значения option, которые соответствуют индексам элементов для каждого массива свойств
объекта RoomsCapacity, затем переводим эти значения на противоположные и ставим им класс select.
Для того, чтобы скрыть ненужные option используем оператор !, которые возвращает значение true
и присваивает класс hidden, если не находит элемент в массиве, и false, если элемент есть в массиве */
var onChangeRoomNumber = function (evt) {
  numberOfGuests.forEach(function (item) {
    item.selected = (~RoomsCapacity[evt.target.value].indexOf(item.value));
    item.hidden = !(~RoomsCapacity[evt.target.value].indexOf(item.value));
  });
};

/* ======== Обработка событий ======== */

// Выбор времени заезда
selectTimein.addEventListener('change', onChangeCheckin);

// Выбор времени выезда
selectTimeout.addEventListener('change', onChangeCheckout);

// Выбор типа жилья
selectHouseType.addEventListener('change', onChangeType);

// Проверка ввода заголовка объявления
inputTitle.addEventListener('invalid', onInvalidTitle);

// Проверка ввода минимальной цены
inputMinPrice.addEventListener('invalid', onInvalidMinPrice);

// Выбор количества комнат
selectRoomNumber.addEventListener('change', onChangeRoomNumber);
