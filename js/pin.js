'use strict';

(function () {
  var PIN_HEIGHT = 44;
  var ARROW_HEIGHT = 18;
  var ENTER_KEYCODE = 13;
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinsContainer = document.querySelector('.map__pins');
  var pinFragment = document.createDocumentFragment();
  var currentActivePin = false;

  window.pin = {
    // Функция клонирует ноду пина из шаблона и заполняет её данными
    generatePin: function (offer) {
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
    },

    // Функция отрисовыает каждый пин на карте и передает готовую ноду в функцию generatePin
    renderPins: function (items) {
      items.forEach(function (currentItem) {
        pinFragment.appendChild(window.pin.generatePin(currentItem));
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
      currentActivePin.classList.remove('map__pin--active');
      currentActivePin = false;
    }
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
})();
