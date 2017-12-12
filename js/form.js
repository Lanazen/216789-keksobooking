'use strict';

(function () {

  /* ======== Константы ======== */

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
    numberOfGuests[0].setAttribute('hidden', 'true');
    numberOfGuests[1].setAttribute('hidden', 'true');
    numberOfGuests[2].setAttribute('selected', 'true');
    numberOfGuests[3].setAttribute('hidden', 'true');
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
    timeSync(selectTimein, selectTimeout);
  };

  // Синхронизация поля «время заезда» при введенном поле «время выезда»
  var onChangeCheckout = function (evt) {
    selectTimein.value = evt.target.value;
  };

  // Функция для синхронизации поля «Тип жилья» с минимальной ценой
  var onChangeType = function () {
    inputMinPrice.min = HOUSE_TYPE_MIN_PRICE[selectHouseType.value];
    inputMinPrice.placeholder = inputMinPrice.min;
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

  // Функция синхронизации количества комнат с количеством гостей
  var onChangeRoomNumber = function (evt) {
    numberOfGuests.forEach(function (item) {
      item.selected = ~ROOMS_CAPACITY[evt.target.value].indexOf(item.value);
      item.hidden = !~ROOMS_CAPACITY[evt.target.value].indexOf(item.value);
    });
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

  window.form = {
    activateForm: function () {
      noticeForm.classList.remove('notice__form--disabled');
      formFieldset.forEach(function (item) {
        item.removeAttribute('disabled');
      });
    }
  };
})();