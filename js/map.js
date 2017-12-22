'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_MAIN_HEIGHT = 68;
  var PIN_MAIN_WIDTH = 65;
  var MAIN_ARROW_HEIGHT = 22;
  var MAP_WIDTH = 1200;
  var BORDER_BOTTOM = 100;
  var BORDER_TOP = 500;
  var MAX_PIN_AMOUNT = 5;
  var CoordBorder = {
    MIN_Y: BORDER_BOTTOM - PIN_MAIN_HEIGHT / 2 - MAIN_ARROW_HEIGHT,
    MAX_Y: BORDER_TOP - PIN_MAIN_HEIGHT / 2 - MAIN_ARROW_HEIGHT,
    MIN_X: PIN_MAIN_WIDTH / 2,
    MAX_X: MAP_WIDTH - PIN_MAIN_WIDTH / 2
  };
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var pinX = pinMain.offsetLeft;
  var pinY = pinMain.offsetTop + PIN_MAIN_HEIGHT / 2 + MAIN_ARROW_HEIGHT;
  var offers = [];

  // Функция активации карты для пользователя
  var openMap = function () {
    map.classList.remove('map--faded');
    window.pin.render(offers.slice(0, MAX_PIN_AMOUNT));
    window.card.append(map);
    window.form.activate();
    window.form.setAddress(pinX, pinY);
    pinMain.setAttribute('draggable', 'true');
    map.setAttribute('dropzone', 'move');
  };

  // Функция делает страницу доступной для пользователя при успешной загрузки данных с сервера
  var onSuccessLoad = function (loadedAds) {
    offers = loadedAds;
    openMap();
    window.filter.start(loadedAds);
  };

  // Функция выводит сообщение при ошибке соединения
  var onErrorLoad = function (errorMessage) {
    window.error.showPopup(errorMessage);
  };

  // Функция активации карты мышкой
  var onPinMainMouseUp = function () {
    if (map.classList.contains('map--faded')) {
      window.backend.load(onSuccessLoad, onErrorLoad);
    }
  };

  // Функция активации карты клавиатурой
  var onPinMainPressEnter = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE && map.classList.contains('map--faded')) {
      window.backend.load(onSuccessLoad, onErrorLoad);
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

      var coordX = pinMain.offsetLeft - shift.x;
      var coordY = pinMain.offsetTop - shift.y;
      var coordPinY = coordY + PIN_MAIN_HEIGHT / 2 + MAIN_ARROW_HEIGHT;

      if (coordX >= CoordBorder.MIN_X && coordX <= CoordBorder.MAX_X && coordY >= CoordBorder.MIN_Y && coordY <= CoordBorder.MAX_Y) {
        pinMain.style.top = coordY + 'px';
        pinMain.style.left = coordX + 'px';
        window.form.setAddress(coordX, coordPinY);
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
  pinMain.addEventListener('mouseup', onPinMainMouseUp);

  // Активация карты клавиатурой
  pinMain.addEventListener('keydown', onPinMainPressEnter);

  // Активация перетаскивания главного пина
  pinMain.addEventListener('mousedown', onPinMainMouseDown);
})();
