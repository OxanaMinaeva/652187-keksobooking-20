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
  window.address = function (state) {
    var addressInput = document.querySelector('.ad-form__element input[name=address]');
    if (state === 'inactive') {
      addressInput.value = addressInactiveMap;
    } else {
      addressInput.value = addressActiveMap;
    }
  };
})();
