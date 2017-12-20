'use strict';

(function () {

  var houseFilter = document.querySelector('#housing-type');
  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var pinMain = map.querySelector('.map__pin--main');
  var filterForm = map.querySelector('.map__filters');
  var loadedOffers = [];

  // Копируем массив с предложениями из полученных данных для его последующего преобразования
  var filteredOffers = loadedOffers.slice();

  // Функция применяет фильтр к полям выбора типа жилья
  var houseTypeFilter = function () {
    if (houseFilter.value !== 'any') {
      filteredOffers = filteredOffers.filter(function (object) {
        return object.offer.type === houseFilter.value;
      });
    }
  };

  // Функция очищает карту от всех пинов, кроме pin_main
  var clearMap = function () {
    pinsContainer.innerHTML = '';
    pinsContainer.appendChild(pinMain);
  };

  // Функция для применения фильтров и отрисовки подходящих пинов на карте
  var updatePins = function () {
    clearMap();
    houseTypeFilter();
    window.pin.renderPins(filteredOffers);
  };

  // Функция-обработчик для применения фильтров
  var onSelectTypeChange = function () {
    updatePins();
  };

  // Выбор типа жилья
  filterForm.addEventListener('change', onSelectTypeChange);
})();
