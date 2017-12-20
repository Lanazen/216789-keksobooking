'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout;

  window.debounce = {
    funcDebounce: function (functionToDebounce) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(functionToDebounce, DEBOUNCE_INTERVAL);
    }
  };
})();
