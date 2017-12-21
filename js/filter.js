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
  var selectFilter = function (filter, data) {
    if (filter.value !== 'any') {
      loadedOffers = loadedOffers.filter(function (object) {
        return object.offer[data].toString() === filter.value;
      });
    }
  };

  // Функция применяет фильтр к полям выбора цены
  var priceFilter = function (price) {
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
  var checkboxFilter = function (checkbox) {
    checkbox.forEach(function (item) {
      if (item.checked) {
        loadedOffers = loadedOffers.filter(function (object) {
          return object.offer.features.indexOf(item.value) !== -1;
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
    priceFilter(housingPrice);
    checkboxFilter(housingFeatures);
    if (loadedOffers.length > MAX_PIN_AMOUNT) {
      loadedOffers = loadedOffers.slice(0, MAX_PIN_AMOUNT);
    } window.pin.render(loadedOffers);
  };

  window.filtering = {
    loadedData: [],
    start: function (loadedData) {
      this.loadedData = loadedData.slice();

      // Функция-обработчик для применения фильтров
      function onSelectTypeChange() {
        loadedOffers = window.filtering.loadedData.slice();
        updatePins();
        window.debounce(updatePins);
      }

      filterForm.addEventListener('change', onSelectTypeChange);
    }
  };
})();
