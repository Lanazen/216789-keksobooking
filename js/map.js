'use strict';

/*
var titleOffer = [
  'Большая уютная квартира red',
  'Маленькая неуютная квартира blue',
  'Огромный прекрасный дворец black',
  'Маленький ужасный дворец white',
  'Красивый гостевой домик green',
  'Некрасивый негостеприимный домик yellow',
  'Уютное бунгало далеко от моря pink',
  'Неуютное бунгало по колено в воде gray'
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
  return Math.floor(Math.random() * (max - min) + min);
};

// Нахождение индекса случайного элемента в массиве
var getRandomIndex = function (array) {
  return Math.floor(Math.random() * array.length);
};

// Получение случайного и не повторяющегося элемента в массиве
var getRandomTitle = function () {
  var randomIndex = getRandomIndex(titleOffer); // рандомный индекс массива - число
  var randomTitle = titleOffer[randomIndex]; // рандомное значение массива
  titleOffer.splice(randomIndex, 1); // делаем рандомное значение уникальным
  return randomTitle;
};

// Создание массива случайной длины
var getRandomItem = function (array) {
  return array.splice(getRandomNumber(0, array.length - 1));
};

var generateArray = function () {
  var featuresArray = [];
  var arrayCopy = featuresOffer.slice();

  for (var i = 0; i < getRandomNumber(0, featuresOffer.length); i++) {
    featuresArray[i] = getRandomItem(arrayCopy);
    featuresOffer.splice(i, 1);
  }
  return featuresArray;
};

// Создание массива объектов на основе полученных данных
var generateObject = function () {
  var objectList = [];
  var randomType = typeOffer[getRandomIndex()];
  var roomAmount = getRandomNumber(1, 5);
  var randomTime = timeOffer[getRandomIndex()];
  var locationX = getRandomNumber(300, 900);
  var locationY = getRandomNumber(100, 500);

  for (var i = 0; i < 8; i++) {
    var object = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': getRandomTitle(titleOffer),
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(1000, 1000000),
        'type': randomType,
        'rooms': roomAmount,
        'guests': roomAmount * 2,
        'checkin': randomTime,
        'checkout': randomTime,
        'features': generateArray(featuresOffer),
        'description': '',
        'photos': []
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
  }
  return objectList;
};

// Убираем класс у карты
var mapImage = document.querySelector('.map');
mapImage.classList.remove('.map--faded');

// Создание меток на карте и заполнение их данными из массива
var generatePins = function (objectList) {
  var pinItem = document.createElement('button');
  var pinImage = document.createElement('img');

  pinItem.className = 'map__pin';
  pinItem.style.left = objectList.location.x - 40 / 2 + 'px';
  pinItem.style.top = objectList.location.y - 40 + 'px';

  pinImage.width = '40';
  pinImage.height = '40';
  pinImage.src = objectList.author.avatar;
  pinImage.draggable = 'false';

  pinItem.appendChild(pinImage);

  return generatePins;
};

// Отрисовка и добавление сгенерированных элементов в один блок
var pinsFragment = document.createDocumentFragment('.map-pins');
var appendPinsFragment = function (objectList) {
  for (var i = 0; i < objectList.length; i++) {
    pinsFragment.appendChild(generatePins[i]);
  }
  return appendPinsFragment(generateObject());
};

// Функция для вывода типа жилья

var getTypeHouse = function (type) {
  if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  }
  return 'Дом';
};

// Создание элементов объявления на основе шаблона и заполнение их данными из объекта

var generatePinsList = function (object) {
  var offerTemplate = document.querySelector('template').content.querySelector('.map-card');
  var template = offerTemplate.cloneNode(true);
  template.querySelector('h3').textContent = object.offer.title;
  template.querySelector('p small').textContent = object.offer.address;
  template.querySelector('.popup__price').textContent = object.offer.price + '&#x20bd;/ночь';
  template.querySelector('h4').textContent = getTypeHouse();
  template.querySelector('p:nth-of-type(3)').textContent = object.offer.rooms + ' для ' + object.offer.guests + ' гостей';
  template.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
  template.querySelector('.popup__features');
  template.querySelector('p:nth-of-type(5)').textContent = object.offer.description;
  return offerTemplate;
};
*/
