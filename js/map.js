'use strict';

(function () {

  window.inactiveState();
  // Обработчик Enter на активизацию
  window.onEnterClick = function (evt) {
    if (evt.keyCode === 13) {
      window.activeState();
    }
  };
})();
