'use strict';

(function () {
  // Операции с формой
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinMainLeft = Number(mapPinMain.style.left.replace(/px/, ''));
  var mapPinMainTop = Number(mapPinMain.style.top.replace(/px/, ''));
  var mapPinMainWidth = Number(mapPinMain.firstElementChild.width);
  var mapPinMainHeight = Number(mapPinMain.firstElementChild.height);
  var mapPinMainHeightAfter = Number(getComputedStyle(mapPinMain, '::after').height.replace(/px/, ''));

  var pinMainCoordinateCenterLeft = Math.round(mapPinMainLeft + mapPinMainWidth / 2);
  var pinMainCoordinateCenterTop = Math.round(mapPinMainTop + (mapPinMainHeightAfter + mapPinMainHeight) / 2);
  var pinMainCoordinateSpearheadTop = Math.round(mapPinMainTop + mapPinMainHeight + mapPinMainHeightAfter);

  var addressInactiveMap = (pinMainCoordinateCenterLeft + ', ' + pinMainCoordinateCenterTop);
  var addressActiveMap = (pinMainCoordinateCenterLeft + ', ' + pinMainCoordinateSpearheadTop);

  // Установка адреса в зависимости от состояния
  window.form = function (state) {
    var addressInput = document.querySelector('.ad-form__element input[name=address]');
    if (state === 'inactive') {
      addressInput.value = addressInactiveMap;
    } else {
      addressInput.value = addressActiveMap;
    }
  };

  var adFormSubmit = document.querySelector('.ad-form__submit');

  var roomsSelect = document.querySelector('.ad-form__element select[name=rooms]');
  var capacitySelect = document.querySelector('.ad-form__element select[name=capacity]');

  var typeSelect = document.querySelector('.ad-form__element select[name=type]');
  var priceInput = document.querySelector('.ad-form__element input[name=price]');

  var timeinSelect = document.querySelector('.ad-form__element select[name=timein]');
  var timeoutSelect = document.querySelector('.ad-form__element select[name=timeout]');

  mapPinMain.addEventListener('mousedown', function (evt) {
    window.onMousedown(evt);
  });
  mapPinMain.addEventListener('keydown', function (evt) {
    window.onEnterClick(evt);
  });

  capacitySelect.addEventListener('change', function () {
    window.formValidation('capacity', roomsSelect, capacitySelect);
  });
  adFormSubmit.addEventListener('click', function () {
    window.formValidation('capacity', roomsSelect, capacitySelect);
  });

  // Тип жилья и Цена
  typeSelect.addEventListener('change', function () {
    window.formValidation('type', typeSelect, priceInput);
  });
  adFormSubmit.addEventListener('click', function () {
    window.formValidation('type', typeSelect, priceInput);
  });
  // Время заезда и выезда
  timeinSelect.addEventListener('change', function () {
    window.formValidation('timein', timeinSelect, timeoutSelect);
  });
  timeoutSelect.addEventListener('change', function () {
    window.formValidation('timeout', timeinSelect, timeoutSelect);
  });

})();
