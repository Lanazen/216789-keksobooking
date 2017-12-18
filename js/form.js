'use strict';

(function () {

  /* ======== Константы ======== */

  var PIN_MAIN_HEIGHT = 68;
  var MAIN_ARROW_HEIGHT = 22;
  var HOUSE_TYPE_MIN_PRICE = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  /* ======== Переменные ======== */

  var noticeForm = document.querySelector('.notice__form');
  var formFieldset = noticeForm.querySelectorAll('fieldset');
  var inputTitle = noticeForm.querySelector('#title');
  var inputAddress = noticeForm.querySelector('#address');
  var selectTimein = noticeForm.querySelector('#timein');
  var selectTimeout = noticeForm.querySelector('#timeout');
  var selectHouseType = noticeForm.querySelector('#type');
  var inputMinPrice = noticeForm.querySelector('#price');
  var selectRoomNumber = noticeForm.querySelector('#room_number');
  var selectCapacity = noticeForm.querySelector('#capacity');
  var numberOfGuests = selectCapacity.querySelectorAll('option');
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var startMainPinCoords = {
    addressX: pinMain.offsetLeft,
    addressY: pinMain.offsetTop + PIN_MAIN_HEIGHT / 2 + MAIN_ARROW_HEIGHT
  };

  /* ======== Функции ======== */

  var setNoticeForm = function () {
    formFieldset.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
    noticeForm.setAttribute('action', 'https://js.dump.academy/keksobooking');
    noticeForm.setAttribute('type', 'multipart/form-data');
    inputAddress.setAttribute('required', 'true');
    inputAddress.setAttribute('readonly', 'true');
    inputAddress.setAttribute('placeholder', 'Поставьте метку для установки координат');
    inputTitle.setAttribute('required', 'true');
    inputTitle.setAttribute('minlength', '30');
    inputTitle.setAttribute('maxlength', '100');
    inputMinPrice.setAttribute('required', 'true');
    inputMinPrice.setAttribute('type', 'number');
    inputMinPrice.setAttribute('min', '0');
    inputMinPrice.setAttribute('max', '1000000');
    inputMinPrice.setAttribute('value', '1000');
    numberOfGuests[0].setAttribute('disabled', 'true');
    numberOfGuests[1].setAttribute('disabled', 'true');
    numberOfGuests[2].setAttribute('selected', 'true');
    numberOfGuests[3].setAttribute('disabled', 'true');
  };

  setNoticeForm();

  /* ======== Функции - обработчики событий ======== */

  // Функция для синхронизации полей «время заезда» и «время выезда»
  var timeSync = function (inputField, inputValue) {
    var selectInput = false;
    selectInput = inputField.value;
    inputValue.value = selectInput;
  };

  // Синхронизация поля «время выезда» при введенном поле «время заезда»
  var onChangeCheckin = function () {
    window.synchronizeFields(selectTimein, selectTimeout, timeSync);
  };

  // Синхронизация поля «время заезда» при введенном поле «время выезда»
  var onChangeCheckout = function () {
    window.synchronizeFields(selectTimeout, selectTimein, timeSync);
  };

  // Функция для синхронизации поля «Тип жилья» с минимальной ценой
  var HousePriceSync = function () {
    inputMinPrice.min = HOUSE_TYPE_MIN_PRICE[selectHouseType.value];
    inputMinPrice.placeholder = inputMinPrice.min;
  };

  // Синхронизация поля «Тип жилья» с минимальной ценой
  var onChangeType = function () {
    window.synchronizeFields(inputMinPrice, selectHouseType, HousePriceSync);
  };

  // Функция синхронизации количества комнат с количеством гостей
  var RoomGuestsSync = function () {
    numberOfGuests.forEach(function (item) {
      item.selected = ~ROOMS_CAPACITY[selectRoomNumber.value].indexOf(item.value);
      item.disabled = !~ROOMS_CAPACITY[selectRoomNumber.value].indexOf(item.value);
    });
  };

  // Синхронизация количества комнат и гостей
  var onChangeRoomNumber = function () {
    window.synchronizeFields(selectRoomNumber, numberOfGuests, RoomGuestsSync);
  };

  // Функция проверки на валидность заголовка объявления
  var onInvalidTitle = function (evt) {
    inputTitle.style.borderColor = 'red';
    if (inputTitle.validity.tooShort || evt.target.value.length < 30) {
      inputTitle.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Пожалуйста, заполните это поле');
    } else {
      inputTitle.setCustomValidity('');
      inputTitle.style.borderColor = 'none';
    }
  };

  // Функция проверки ввода минимальной цены
  var onInvalidMinPrice = function () {
    inputMinPrice.style.borderColor = 'red';
    if (inputMinPrice.validity.rangeUnderflow) {
      inputMinPrice.setCustomValidity('Стоимость жилья меньше допустимой');
    } else if (inputMinPrice.validity.rangeOverflow) {
      inputMinPrice.setCustomValidity('Стоимость жилья выше допустимой');
    } else if (inputMinPrice.validity.valueMissing) {
      inputMinPrice.setCustomValidity('Пожалуйста, заполните это поле');
    } else {
      inputMinPrice.setCustomValidity('');
      inputMinPrice.style.borderColor = 'none';
    }
  };

  var onSuccessSend = function () {
    noticeForm.reset();
    pinMain.style.top = startMainPinCoords.addressY + 'px';
    pinMain.style.left = startMainPinCoords.addressX + 'px';
  };

  var onErrorSend = function (errorMessage) {
    window.backend.error(errorMessage);
  };

  var onButtonSubmit = function (evt) {
    window.backend.save(new FormData(noticeForm), onSuccessSend, onErrorSend);
    evt.preventDefault();
  };

  /* ======== Обработка событий ======== */

  // Выбор времени заезда
  selectTimein.addEventListener('change', onChangeCheckin);

  // Выбор времени выезда
  selectTimeout.addEventListener('change', onChangeCheckout);

  // Выбор типа жилья
  selectHouseType.addEventListener('change', onChangeType);

  // Проверка ввода заголовка объявления
  inputTitle.addEventListener('invalid', onInvalidTitle);

  // Проверка ввода минимальной цены
  inputMinPrice.addEventListener('invalid', onInvalidMinPrice);

  // Выбор количества комнат
  selectRoomNumber.addEventListener('change', onChangeRoomNumber);

  // Отправка данных формы на сервер
  noticeForm.addEventListener('submit', onButtonSubmit);

  window.form = {
    noticeForm: document.querySelector('.notice__form'),

    activateForm: function () {
      noticeForm.classList.remove('notice__form--disabled');
      formFieldset.forEach(function (item) {
        item.removeAttribute('disabled');
      });
    }
  };
})();
