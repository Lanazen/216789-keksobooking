'use strict';

(function () {
  var FEATURES_OFFER = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  window.utils = {
    // Функция для нахождения случайного числа; max не включен в диапазон => прибавляем 1
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Функция для создания массива случайной длины из уникальных элементов
    getRandomArray: function () {
      var resultFeatures = [];
      var featuresOfferCopy = FEATURES_OFFER.slice();
      var randomArrayLength = window.utils.getRandomNumber(0, featuresOfferCopy.length - 1);
      for (var i = 0; i <= randomArrayLength; i++) {
        var indexRandom = this.getRandomNumber(0, featuresOfferCopy.length - 1);
        resultFeatures[i] = featuresOfferCopy.splice(indexRandom, 1).toString();
      }
      return resultFeatures;
    }
  };
})();
