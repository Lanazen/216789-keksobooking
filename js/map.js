'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_MAIN_HEIGHT = 65;
  // PIN_MAIN_TAIL_HEIGHT = 22px;
  var noticeForm = document.querySelector('.notice__form');
  var inputAddress = noticeForm.querySelector('#address');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  pinMain.setAttribute('draggable', 'true');
  map.setAttribute('dropzone', 'move');

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

  // Функция обработки события начала перетаскивания главного пина
  var onPinMainMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Обработка события перемещения мыши
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordY = pinMain.offsetTop - shift.y;
      var coordX = pinMain.offsetLeft - shift.x;

      if (coordY >= 100 + PIN_MAIN_HEIGHT && coordY <= 500 + PIN_MAIN_HEIGHT) {
        pinMain.style.top = coordY + 'px';
      }
      pinMain.style.left = coordX + 'px';
      inputAddress.value = 'x: ' + coordX + ', y: ' + coordY;
    };

    // Прекращение обработки событий при отпускании мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Активация карты мышкой
  pinMain.addEventListener('mouseup', onPinMainClick);

  // Активация карты клавиатурой
  pinMain.addEventListener('keydown', onPinMainPressEnter);

  // Активация перетаскивания главного пина
  pinMain.addEventListener('mousedown', onPinMainMouseDown);
})();
