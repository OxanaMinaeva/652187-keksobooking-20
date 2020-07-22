'use strict';

(function () {
  // Операции с формой
  var mapPinMain = document.querySelector('.map__pin--main');

  // Установка адреса в зависимости от состояния
  window.form = function (state) {
    var addressInput = document.querySelector('.ad-form__element input[name=address]');
    if (state === 'inactive') {
      addressInput.value = window.pinMainCoordinates().addressInactiveMap;
    } else {
      addressInput.value = window.pinMainCoordinates().addressActiveMap;
    }

    return addressInput;
  };

  var adFormSubmit = document.querySelector('.ad-form__submit');

  var roomsSelect = document.querySelector('.ad-form__element select[name=rooms]');
  var capacitySelect = document.querySelector('.ad-form__element select[name=capacity]');

  var typeSelect = document.querySelector('.ad-form__element select[name=type]');
  var priceInput = document.querySelector('.ad-form__element input[name=price]');

  var timeinSelect = document.querySelector('.ad-form__element select[name=timein]');
  var timeoutSelect = document.querySelector('.ad-form__element select[name=timeout]');

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
