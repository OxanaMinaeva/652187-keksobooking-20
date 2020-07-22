'use strict';

(function () {

  window.inactiveState = function () {

    var elemMap = document.querySelector('.map');
    var mapFilters = document.querySelector('.map__filters');

    var adForm = document.querySelector('.ad-form');
    var adFormHeader = adForm.querySelector('.ad-form-header');
    var adFormElements = adForm.querySelectorAll('.ad-form__element');

    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].setAttribute('disabled', 'true');
    }

    adFormHeader.setAttribute('disabled', 'true');
    for (var l = 0; l < adFormElements.length; l++) {
      adFormElements[l].setAttribute('disabled', 'true');
    }
    window.form('inactive');

    return elemMap;
  };

})();
