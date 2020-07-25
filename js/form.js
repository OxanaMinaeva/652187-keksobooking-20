'use strict';

(function () {

  // Операции с формой
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  var addressInput = document.querySelector('.ad-form__element input[name=address]');

  var adFormSubmit = document.querySelector('.ad-form__submit');
  var adFormReset = document.querySelector('.ad-form__reset');

  var roomsSelect = document.querySelector('.ad-form__element select[name=rooms]');
  var capacitySelect = document.querySelector('.ad-form__element select[name=capacity]');

  var typeSelect = document.querySelector('.ad-form__element select[name=type]');
  var priceInput = document.querySelector('.ad-form__element input[name=price]');

  var timeinSelect = document.querySelector('.ad-form__element select[name=timein]');
  var timeoutSelect = document.querySelector('.ad-form__element select[name=timeout]');

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var fotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var adFormFoto = document.querySelector('.ad-form__photo');

  var mapFilters = document.querySelector('.map__filters');

  var elementNameMap = {
    capacitySelect: 'capacity',
    typeSelect: 'type',
    timeinSelect: 'timein',
    timeoutSelect: 'timeout'
  };

  // Установка адреса в зависимости от состояния
  window.form = function (state) {
    if (state === 'inactive') {
      addressInput.value = window.pinMainCoordinates().addressInactiveMap;
    } else {
      addressInput.value = window.pinMainCoordinates().addressActiveMap;
    }

    return addressInput;
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    window.onEnterClick(evt);
  });

  capacitySelect.addEventListener('change', function () {
    window.formValidation(elementNameMap.capacitySelect, roomsSelect, capacitySelect);
  });
  adFormSubmit.addEventListener('click', function () {
    window.formValidation(elementNameMap.capacitySelect, roomsSelect, capacitySelect);
  });

  // Тип жилья и Цена
  typeSelect.addEventListener('change', function () {
    window.formValidation(elementNameMap.typeSelect, typeSelect, priceInput);
  });
  adFormSubmit.addEventListener('click', function () {
    window.formValidation(elementNameMap.typeSelect, typeSelect, priceInput);
  });
  // Время заезда и выезда
  timeinSelect.addEventListener('change', function () {
    window.formValidation(elementNameMap.timeinSelect, timeinSelect, timeoutSelect);
  });
  timeoutSelect.addEventListener('change', function () {
    window.formValidation(elementNameMap.timeoutSelect, timeinSelect, timeoutSelect);
  });

  // Аватар
  avatarChooser.addEventListener('change', function () {
    window.foto(avatarChooser, avatarPreview, FILE_TYPES);
  });

  // Фото жилья
  fotoChooser.addEventListener('change', function () {
    var imgFoto;
    if (!adFormFoto.querySelector('img')) {
      imgFoto = new Image(adFormFoto.clientWidth, adFormFoto.clientHeight);
      adFormFoto.appendChild(imgFoto);
    } else {
      imgFoto = adFormFoto.querySelector('img');
    }
    window.foto(fotoChooser, imgFoto, FILE_TYPES);
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
    mapFilters.reset();
    adForm.reset();

    mapPinMain.style.top = window.mapPinMain.top + 'px';
    mapPinMain.style.left = window.mapPinMain.left + 'px';
    window.inactiveState();
  };

})();
