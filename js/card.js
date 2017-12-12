'use strict';

(function () {
  var TYPE_OFFER_VALUE = {
    bungalo: 'Лачуга',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);

  window.cardModule = {
    // Функция для создания рандомно полученные списки удобства в элементы списка li
    getFeaturesList: function (features) {
      var featuresElement = '';
      features.forEach(function (item) {
        featuresElement += '<li class="feature feature--' + item + '"></li>';
      });
      return featuresElement;
    },

    // Функция находит нужные селекторы в клонированном шаблоне и заполняет их соответствующими данными
    createCard: function (object) {
      card.querySelector('.popup__avatar').setAttribute('src', object.author.avatar);
      card.querySelector('h3').textContent = object.offer.title;
      card.querySelector('p small').textContent = object.offer.address;
      card.querySelector('.popup__price').textContent = object.offer.price + '\u20BD/ночь';
      card.querySelector('h4').textContent = TYPE_OFFER_VALUE[object.offer.type];
      card.querySelector('p:nth-of-type(3)').textContent = object.offer.rooms + ' для ' + object.offer.guests + ' гостей';
      card.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
      card.querySelector('.popup__features').innerHTML = '';
      card.querySelector('.popup__features').insertAdjacentHTML('beforeEnd', this.getFeaturesList(object.offer.features));
      card.querySelector('p:nth-of-type(5)').textContent = object.offer.description;
      card.classList.remove('hidden');
      return card;
    },

    // Функция отрисовывает карточку объявления на основе первого объекта в массиве offers и добавляет ее в документ
    renderCards: function (offers) {
      this.createCard(offers[0]);
      map.appendChild(card);
      card.classList.add('hidden');
    },

    openCard: function (currentPinItem, currentOffer) {
      window.pin.activatePin(currentPinItem);
      this.createCard(currentOffer);
      card.classList.remove('hidden');
    }
  };
})();
