'use strict';

(function () {

  window.inactiveState = function () {
    var elemMap = document.querySelector('.map');
    var mapFiltersForm = document.querySelector('.map__filters');
    var mapFilters = document.querySelectorAll('.map__filter');

    var adForm = document.querySelector('.ad-form');
    var adFormHeader = adForm.querySelector('.ad-form-header');
    var adFormElements = adForm.querySelectorAll('.ad-form__element');

    if (window.mapPinMain) {
      adForm.reset();

      var imgAvatar = adForm.querySelector('.ad-form-header__preview img');
      imgAvatar.src = window.imgSrcDefault;

      if (adForm.querySelector('.ad-form__photo img')) {
        var imgFoto = adForm.querySelector('.ad-form__photo img');
        imgFoto.remove();
      }

      if (document.querySelector('.map__card.popup')) {
        var mapCardPopup = document.querySelector('.map__card.popup');
        mapCardPopup.remove();
      }

      var mapPinMain = document.querySelector('.map__pin--main');
      mapPinMain.style.top = window.mapPinMain.top + 'px';
      mapPinMain.style.left = window.mapPinMain.left + 'px';

      var mapPins = document.querySelector('.map__pins');

      // Удаление меток
      while (mapPins.lastChild.type === 'button') {
        mapPins.lastChild.remove();
      }
    }

    mapFiltersForm.reset();
    mapFilters.forEach(function (mapFilter) {
      mapFilter.setAttribute('disabled', 'true');
    });

    adFormElements.forEach(function (adFormElement) {
      adFormElement.setAttribute('disabled', 'true');
    });

    adFormHeader.setAttribute('disabled', 'true');

    elemMap.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    window.form('inactive');

    return elemMap;
  };

})();
