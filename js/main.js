'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');

  var adFormSubmit = document.querySelector('.ad-form__submit');

  var roomsSelect = document.querySelector('.ad-form__element select[name=rooms]');
  var capacitySelect = document.querySelector('.ad-form__element select[name=capacity]');


  mapPinMain.addEventListener('mousedown', function (evt) {
    window.onMousedown(evt);
  });
  mapPinMain.addEventListener('keydown', function (evt) {
    window.onEnterClick(evt);
  });

  capacitySelect.addEventListener('change', function () {
    window.onChangeControl(roomsSelect, capacitySelect);
  });
  adFormSubmit.addEventListener('click', function () {
    window.onChangeControl(roomsSelect, capacitySelect);
  });

  window.load();

})();
