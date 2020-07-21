'use strict';

(function () {
  var elemMap = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');

  var adForm = document.querySelector('.ad-form');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');

  // Делаем неактивной карту и форму
  var makeInactiveMapAndForm = function () {
    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].setAttribute('disabled', 'true');
    }

    adFormHeader.setAttribute('disabled', 'true');
    for (var l = 0; l < adFormElements.length; l++) {
      adFormElements[l].setAttribute('disabled', 'true');
    }
    window.form('inactive');
  };

  // Неактивная карта по умолчанию
  makeInactiveMapAndForm();

  // Делаем активной карту и форму
  window.activeMapAndForm = function () {

    for (var i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute('disabled');
    }
    adFormHeader.removeAttribute('disabled');
    for (var l = 0; l < adFormElements.length; l++) {
      adFormElements[l].removeAttribute('disabled');
    }
    elemMap.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form('active');
  };

  // Обработчик клавиши на активизацию
  window.onMousedown = function (evt) {
    if (evt.which === 1) {
      window.activeMapAndForm();
    }
  };
  // Обработчик Enter на активизацию
  window.onEnterClick = function (evt) {
    if (evt.keyCode === 13) {
      window.activeMapAndForm();
    }
  };
})();
