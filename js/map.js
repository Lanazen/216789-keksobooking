'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  window.map = {
    // Функция активации карты для пользователя
    openMap: function () {
      map.classList.remove('map--faded');
      var offers = window.data.generateOffers();
      window.pin.renderPins(offers);
      window.card.renderPopupCards(offers);
      window.form.activateForm();
    }
  };
  // Функция активации карты мышкой
  var onPinMainClick = function () {
    window.map.openMap();
  };

  // Функция активации карты клавиатурой
  var onPinMainPressEnter = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.map.openMap();
    }
  };

  // Активация карты мышкой
  pinMain.addEventListener('mouseup', onPinMainClick);

  // Активация карты клавиатурой
  pinMain.addEventListener('keydown', onPinMainPressEnter);
})();
