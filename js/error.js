'use strict';

(function () {
  var ERROR_POPUP_TIMEOUT = 5000;
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
  errorPopup.style.backgroundColor = '#ffffff';
  errorPopup.style.border = '2px solid #000000';
  errorPopup.style.borderRadius = '10px';
  errorPopup.style.zIndex = '10';
  errorPopup.classList.add('hidden');
  document.body.insertAdjacentElement('afterBegin', errorPopup);

  window.error = {
    showPopup: function (errorMessage) {
      errorPopup.textContent = errorMessage;
      errorPopup.classList.remove('hidden');
      setTimeout(function () {
        errorPopup.classList.add('hidden');
      }, ERROR_POPUP_TIMEOUT);
    }
  };
})();
