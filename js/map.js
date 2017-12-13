'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  // Функция активации карты для пользователя
  var openMap = function () {
    map.classList.remove('map--faded');
    var offers = window.data;
    window.pin.renderPins(offers);
    window.card.appendPopupElement(offers);
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

  // Активация карты мышкой
  pinMain.addEventListener('mouseup', onPinMainClick);

  // Активация карты клавиатурой
  pinMain.addEventListener('keydown', onPinMainPressEnter);
})();
