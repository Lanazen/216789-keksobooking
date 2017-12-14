'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_MAIN_HEIGHT = 68;
  var PIN_MAIN_WIDTH = 65;
  var MAIN_ARROW_HEIGHT = 22;
  var MAP_WIDTH = 1200;
  var BORDER_BOTTOM = 100;
  var BORDER_TOP = 500;
  var COORD_BORDER = {
    minY: BORDER_BOTTOM - PIN_MAIN_HEIGHT / 2 - MAIN_ARROW_HEIGHT,
    maxY: BORDER_TOP - PIN_MAIN_HEIGHT / 2 - MAIN_ARROW_HEIGHT,
    minX: PIN_MAIN_WIDTH / 2,
    maxX: MAP_WIDTH - PIN_MAIN_WIDTH / 2
  };
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');

  // Функция активации карты для пользователя
  var openMap = function () {
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
      var offers = window.data;
      window.pin.renderPins(offers);
      window.card.appendPopupElement(offers);
      window.form.activateForm();
      pinMain.setAttribute('draggable', 'true');
      map.setAttribute('dropzone', 'move');
    }
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

    var inputAddress = window.form.noticeForm.querySelector('#address');
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

      if (coordX >= COORD_BORDER.minX && coordX <= COORD_BORDER.maxX && coordY >= COORD_BORDER.minY && coordY <= COORD_BORDER.maxY) {
        pinMain.style.top = coordY + 'px';
        pinMain.style.left = coordX + 'px';
        inputAddress.value = 'x: ' + coordX + ', y: ' + (coordY + PIN_MAIN_HEIGHT / 2 + MAIN_ARROW_HEIGHT);
      }
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
