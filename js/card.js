'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var typeOfferValue = {
    bungalo: 'Лачуга',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };
  var popupTemplate = document.querySelector('template').content.querySelector('.map__card');
  var popup = popupTemplate.cloneNode(true);
  var popupCloseButton = popup.querySelector('.popup__close');
  var popupAvatar = popup.querySelector('.popup__avatar');
  var popupTitle = popup.querySelector('h3');
  var popupAddress = popup.querySelector('p small');
  var popupPrice = popup.querySelector('.popup__price');
  var popupType = popup.querySelector('h4');
  var popupRooms = popup.querySelector('p:nth-of-type(3)');
  var popupTime = popup.querySelector('p:nth-of-type(4)');
  var popupFeatures = popup.querySelector('.popup__features');
  var popupDescription = popup.querySelector('p:nth-of-type(5)');

  // Функция для занесения рандомных списков удобства в элементы списка li
  var getFeaturesList = function (features) {
    var featuresElement = '';
    features.forEach(function (item) {
      featuresElement += '<li class="feature feature--' + item + '"></li>';
    });
    return featuresElement;
  };

  // Функция находит нужные селекторы в клонированном шаблоне и заполняет их соответствующими данными
  var createPopup = function (object) {
    popupAvatar.setAttribute('src', object.author.avatar);
    popupTitle.textContent = object.offer.title;
    popupAddress.textContent = object.offer.address;
    popupPrice.textContent = object.offer.price + '\u20BD/ночь';
    popupType.textContent = typeOfferValue[object.offer.type];
    popupRooms.textContent = object.offer.rooms + ' для ' + object.offer.guests + ' гостей';
    popupTime.textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    popupFeatures.innerHTML = '';
    popupFeatures.insertAdjacentHTML('beforeEnd', getFeaturesList(object.offer.features));
    popupDescription.textContent = object.offer.description;
    popup.classList.remove('hidden');
    return popup;
  };

  // Функция закрытия попапа
  var closePopup = function () {
    popup.classList.add('hidden');
    window.pin.deactivate();
  };

  // Функция закрытия попапа с помощью esc
  var onPressEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  // Функция закрытия попапа мышкой
  var onPopupCloseClick = function () {
    closePopup();
  };

  // Функция закрытия попапа с помощью enter
  var onPopupClosePressEnter = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };

  // Закрытие попапа с помощью esc
  document.addEventListener('keydown', onPressEsc);

  // Закрытие попапа мышкой
  popupCloseButton.addEventListener('click', onPopupCloseClick);

  // Закрытие попапа с клавиатуры
  popupCloseButton.addEventListener('keydown', onPopupClosePressEnter);

  window.card = {
    // Функция отрисовывает карточку объявления на основе первого объекта в массиве offers и добавляет ее в документ
    append: function (map) {
      map.appendChild(popup);
      popup.classList.add('hidden');
    },

    // Функция заполняет карточку объявления данными и открывает ее, присваивая пину активный класс
    open: function (currentPinItem, currentOffer) {
      window.pin.activate(currentPinItem);
      createPopup(currentOffer);
      popup.classList.remove('hidden');
    }
  };
})();
