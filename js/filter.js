'use strict';

(function () {

  var MAX_PIN_AMOUNT = 5;
  var PriceValue = {
    LOW: 10000,
    HIGH: 50000
  };
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

  // Функция применяет фильтр к полям выбора типа жилья, количества комнат и гостей
  var selectFilter = function (option) {
    var data = option.name.substr(8);
    if (option.value !== 'any') {
      loadedOffers = loadedOffers.filter(function (object) {
        return object.offer[data].toString() === option.value;
      });
    }
  };

  // Функция применяет фильтр к полям выбора цены
  var selectPriceFilter = function (price) {
    loadedOffers = loadedOffers.filter(function (object) {
      if (price.value === 'middle') {
        return object.offer.price <= PriceValue.HIGH && object.offer.price >= PriceValue.LOW;
      } else if (price.value === 'low') {
        return object.offer.price < PriceValue.LOW;
      } else if (price.value === 'high') {
        return object.offer.price > PriceValue.HIGH;
      }
      return true;
    });
  };

  // Функция применяет фильтр к выбору удобств
  var selectCheckboxFilter = function (items) {
    [].forEach.call(items, function (checkbox) {
      if (checkbox.checked) {
        loadedOffers = loadedOffers.filter(function (object) {
          return object.offer.features.indexOf(checkbox.value) !== -1;
        });
      }
    });
  };

  // Функция очищает карту от всех пинов, кроме pin_main
  var clearMap = function () {
    pinsContainer.innerHTML = '';
    pinsContainer.appendChild(pinMain);
  };

  // Функция для применения фильтров и отрисовки подходящих пинов на карте
  var updatePins = function () {
    clearMap();
    selectFilter(housingType, 'type');
    selectFilter(housingRooms, 'rooms');
    selectFilter(housingGuests, 'guests');
    selectPriceFilter(housingPrice);
    selectCheckboxFilter(housingFeatures);
    if (loadedOffers.length > MAX_PIN_AMOUNT) {
      loadedOffers = loadedOffers.slice(0, MAX_PIN_AMOUNT);
    } window.pin.render(loadedOffers);
  };

  window.filter = {
    loadedData: [],
    start: function (loadedData) {
      this.loadedData = loadedData.slice();

      // Функция-обработчик для применения фильтров
      function onSelectTypeChange() {
        loadedOffers = window.filter.loadedData.slice();
        updatePins();
        window.debounce(updatePins);
      }

      filterForm.addEventListener('change', onSelectTypeChange);
    }
  };
})();
