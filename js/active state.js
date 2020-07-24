'use strict';

(function () {

  window.activeState = function () {

    var elemMap = document.querySelector('.map');
    var adForm = document.querySelector('.ad-form');

    if (elemMap.classList.contains('map--faded') || adForm.classList.contains('ad-form--disabled')) {
      var mapFilters = document.querySelectorAll('.map__filter');
      var adFormHeader = adForm.querySelector('.ad-form-header');
      var adFormElements = adForm.querySelectorAll('.ad-form__element');
      var img = adForm.querySelector('.ad-form-header__preview img');
      window.imgSrcDefault = img.src;

      mapFilters.forEach(function (mapFilter) {
        mapFilter.removeAttribute('disabled');
      });

      adFormHeader.removeAttribute('disabled');
      adFormElements.forEach(function (adFormElement) {
        adFormElement.removeAttribute('disabled');
      });

      elemMap.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      // Отображение меток
      var filteredResponse = window.filterPins(window.xhrResponse);
      window.pin(filteredResponse, filteredResponse.length);
      window.popup(filteredResponse);
    }
    window.form('active');

    return elemMap;
  };

})();
