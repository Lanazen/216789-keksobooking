'use strict';

(function () {
  var TYPE_OFFER_VALUE = {
    bungalo: 'Лачуга',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');
  var popupTemplate = document.querySelector('template').content.querySelector('.map__card');
  var popup = popupTemplate.cloneNode(true);
  var popupCloseButton = popup.querySelector('.popup__close');

  window.card = {
    // Функция для занесения рандомных списков удобства в элементы списка li
    getFeaturesList: function (features) {
      var featuresElement = '';
      features.forEach(function (item) {
        featuresElement += '<li class="feature feature--' + item + '"></li>';
      });
      return featuresElement;
    },

    // Функция находит нужные селекторы в клонированном шаблоне и заполняет их соответствующими данными
    createPopup: function (object) {
      popup.querySelector('.popup__avatar').setAttribute('src', object.author.avatar);
      popup.querySelector('h3').textContent = object.offer.title;
      popup.querySelector('p small').textContent = object.offer.address;
      popup.querySelector('.popup__price').textContent = object.offer.price + '\u20BD/ночь';
      popup.querySelector('h4').textContent = TYPE_OFFER_VALUE[object.offer.type];
      popup.querySelector('p:nth-of-type(3)').textContent = object.offer.rooms + ' для ' + object.offer.guests + ' гостей';
      popup.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
      popup.querySelector('.popup__features').innerHTML = '';
      popup.querySelector('.popup__features').insertAdjacentHTML('beforeEnd', this.getFeaturesList(object.offer.features));
      popup.querySelector('p:nth-of-type(5)').textContent = object.offer.description;
      popup.classList.remove('hidden');
      return popup;
    },

    // Функция отрисовывает карточку объявления на основе первого объекта в массиве offers и добавляет ее в документ
    renderPopupCards: function (offers) {
      this.createPopup(offers[0]);
      map.appendChild(popup);
      popup.classList.add('hidden');
    },

    // Функция заполняет карточку объявления данными и открывает ее, присваивая пину активный класс
    openPopup: function (currentPinItem, currentOffer) {
      window.pin.activatePin(currentPinItem);
      this.createPopup(currentOffer);
      popup.classList.remove('hidden');
    },

    // Функция закрытия попапа
    closePopup: function () {
      popup.classList.add('hidden');
      window.pin.deactivatePin();
    }
  };

  // Функция закрытия попапа с помощью esc
  var onPressEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.closePopup();
    }
  };

  // Функция закрытия попапа мышкой
  var onPopupCloseClick = function () {
    window.card.closePopup();
  };

  // Функция закрытия попапа с помощью enter
  var onPopupClosePressEnter = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.card.closePopup();
    }
  };

  // Закрытие попапа с помощью esc
  document.addEventListener('keydown', onPressEsc);

  // Закрытие попапа мышкой
  popupCloseButton.addEventListener('click', onPopupCloseClick);

  // Закрытие попапа с клавиатуры
  popupCloseButton.addEventListener('keydown', onPopupClosePressEnter);
})();
