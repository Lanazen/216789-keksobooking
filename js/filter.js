'use strict';

(function () {

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('#housing-features input[type="checkbox"]');
  var map = document.querySelector('.map');
  var pinsContainer = document.querySelector('.map__pins');
  var pinMain = map.querySelector('.map__pin--main');
  var filterForm = map.querySelector('.map__filters');

  // Полная копия массива данных перед началом каждой фильтрации
  var loadedOffers = [];

  // Функция применяет фильтр к полям выбора типа жилья
  var selectHouseTypeFilter = function () {
    if (housingType.value !== 'any') {
      loadedOffers = loadedOffers.filter(function (object) {
        return object.offer.type === housingType.value;
      });
    }
  };

  var selectPriceFilter = function (price) {
    if (housingPrice.value === 'middle') {
      return (price >= 10000) && (price < 50000);
    } else if (housingPrice.value === 'low') {
      return price < 10000;
    } else if (housingPrice.value === 'high') {
      return price >= 50000;
    } else {
      return true;
    }
  };

  var selectRoomsFilter = function () {
    if (housingRooms.value !== 'any') {
      loadedOffers = loadedOffers.filter(function (object) {
        return object.offer.rooms === housingRooms.value;
      });
    }
  };

  var selectGuestsFilter = function () {
    if (housingGuests.value !== 'any') {
      loadedOffers = loadedOffers.filter(function (object) {
        return object.offer.guests === housingGuests.value;
      });
    }
  };

  var checkboxFilter = function (checkbox) {
    checkbox.forEach(function (item) {
      if (item.checked) {
        loadedOffers = loadedOffers.filter(function (object) {
          return object.offer.features.indexOf(item.value) !== -1;
        });
      }
    });
    return loadedOffers;
  };

  // Функция очищает карту от всех пинов, кроме pin_main
  var clearMap = function () {
    pinsContainer.innerHTML = '';
    pinsContainer.appendChild(pinMain);
  };

  // Функция для применения фильтров и отрисовки подходящих пинов на карте
  var updatePins = function () {
    clearMap();
    selectRoomsFilter();
    selectGuestsFilter();
    selectHouseTypeFilter();
    selectPriceFilter(housingPrice);
    checkboxFilter(housingFeatures);
    window.pin.renderPins(loadedOffers);
  };

  window.filtering = {
    loadedData: [],
    start: function (loadedData) {
      this.loadedData = loadedData.slice();

      // Функция-обработчик для применения фильтров
      function onSelectTypeChange() {
        loadedOffers = window.filtering.loadedData.slice();
        updatePins();
        window.debounce.funcDebounce(updatePins);
      }

      filterForm.addEventListener('change', onSelectTypeChange);
    }
  };
})();
