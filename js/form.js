'use strict';

(function () {
  // Операции с формой
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

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
  var adFormReset = document.querySelector('.ad-form__reset');

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

  // Отправка формы
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend().submit(new FormData(adForm), window.load());
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    documentReset();
  });

  var documentReset = function () {
    var mapFilters = document.querySelector('.map__filters');
    mapFilters.reset();
    adForm.reset();

    if (document.querySelector('.map__card.popup')) {
      var mapCardPopup = document.querySelector('.map__card.popup');
      mapCardPopup.remove();
    }

    mapPinMain.style.top = window.mapPinMain.mapPinMainTop + 'px';
    mapPinMain.style.left = window.mapPinMain.mapPinMainLeft + 'px';
    window.inactiveState();
  };

})();
