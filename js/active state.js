'use strict';

(function () {

  window.activeState = function () {

    var elemMap = document.querySelector('.map');
    var adForm = document.querySelector('.ad-form');

    if (elemMap.classList.contains('map--faded') || adForm.classList.contains('ad-form--disabled')) {
      var mapFilters = document.querySelector('.map__filters');
      var adFormHeader = adForm.querySelector('.ad-form-header');
      var adFormElements = adForm.querySelectorAll('.ad-form__element');

      for (var i = 0; i < mapFilters.length; i++) {
        mapFilters[i].removeAttribute('disabled');
      }
      adFormHeader.removeAttribute('disabled');
      for (var l = 0; l < adFormElements.length; l++) {
        adFormElements[l].removeAttribute('disabled');
      }
      elemMap.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
    }
    window.form('active');

    return elemMap;
  };

})();
