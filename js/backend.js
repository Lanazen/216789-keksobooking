'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) { // Код запроса, при котором он выполнится
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  window.backend = {
    // Функция подгрузки данных с сервера
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    // Функция загрузки данных на сервер
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },

    // Функция вывода сообщения об ошибке
    error: function (errorMessage) {
      var errorPopup = document.createElement('div');
      errorPopup.style.position = 'fixed';
      errorPopup.style.top = '35%';
      errorPopup.style.left = '50%';
      errorPopup.style.transform = 'translate(-50%, -35%)';
      errorPopup.style.width = '500px';
      errorPopup.style.height = '30px';
      errorPopup.style.padding = '25px';
      errorPopup.style.textAlign = 'center';
      errorPopup.style.fontSize = '20px';
      errorPopup.style.fontWeight = '700';
      errorPopup.textContent = errorMessage;
      errorPopup.style.backgroundColor = '#ffffff';
      errorPopup.style.border = '2px solid #000000';
      errorPopup.style.borderRadius = '10px';
      errorPopup.style.zIndex = '10';
      document.body.insertAdjacentElement('afterBegin', errorPopup);
      setTimeout(function () {
        document.body.removeChild(errorPopup);
      }, 5000);
    }
  };
})();
