'use strict';

(function () {
  var PIN_HEIGHT = 48;
  var ARROW_HEIGHT = 18;
  var ENTER_KEYCODE = 13;
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinsContainer = document.querySelector('.map__pins');
  var pinFragment = document.createDocumentFragment();
  var currentActivePin = false;

  // Функция клонирует ноду пина из шаблона и заполняет её данными
  var generatePin = function (offer) {
    var pinItem = pinTemplate.cloneNode(true);

    // Открытие попапа мышкой
    pinItem.addEventListener('click', onPinItemClick.bind(null, pinItem, offer));

    // Открытие попапа с клавиатуры
    pinItem.addEventListener('keydown', onPinItemPress.bind(null, pinItem, offer));

    var pinImage = pinItem.querySelector('img');
    pinItem.style.left = offer.location.x + 'px';
    pinItem.style.top = offer.location.y - PIN_HEIGHT / 2 - ARROW_HEIGHT + 'px';
    pinImage.src = offer.author.avatar;
    return pinItem;
  };

  // Функция открытия попапа мышкой
  var onPinItemClick = function (currentPinItem, currentOffer) {
    window.card.openPopup(currentPinItem, currentOffer);
  };

  // Функция открытия попапа с клавиатуры
  var onPinItemPress = function (evt, currentPinItem, currentOffer) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.card.openPopup(currentPinItem, currentOffer);
    }
  };

  window.pin = {
    // Функция отрисовывает каждый пин на карте и передает готовую ноду в функцию generatePin
    renderPins: function (items) {
      items.forEach(function (currentItem) {
        pinFragment.appendChild(generatePin(currentItem));
      });
      pinsContainer.appendChild(pinFragment);
    },

    // Функция проверяет наличие предыдущего активного пина
    activatePin: function (pin) {
      if (currentActivePin === false) {
        pin.classList.add('map__pin--active');
      } else {
        currentActivePin.classList.remove('map__pin--active');
        pin.classList.add('map__pin--active');
      }
      currentActivePin = pin;
    },

    deactivatePin: function () {
      if (currentActivePin !== false) {
        currentActivePin.classList.remove('map__pin--active');
        currentActivePin = false;
      }
    }
  };
})();
