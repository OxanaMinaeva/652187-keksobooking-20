'use strict';

(function () {

  window.inactiveState = function () {
    var elemMap = document.querySelector('.map');
    var mapFilters = document.querySelector('.map__filters');

    var adForm = document.querySelector('.ad-form');
    var adFormHeader = adForm.querySelector('.ad-form-header');
    var adFormElements = adForm.querySelectorAll('.ad-form__element');

    if (window.mapPinMain) {
      adForm.reset();
      var mapPinMain = document.querySelector('.map__pin--main');
      mapPinMain.style.top = window.mapPinMain.mapPinMainTop + 'px';
      mapPinMain.style.left = window.mapPinMain.mapPinMainLeft + 'px';
    }

    mapFilters.reset();
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].setAttribute('disabled', 'true');
    }

    adFormHeader.setAttribute('disabled', 'true');
    for (var l = 0; l < adFormElements.length; l++) {
      adFormElements[l].setAttribute('disabled', 'true');
    }

    elemMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    window.form('inactive');

    return elemMap;
  };

})();
