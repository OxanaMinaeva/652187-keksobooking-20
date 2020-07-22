'use strict';

(function () {
  // Адрес

  window.pinMainCoordinates = function () {
    var mapPinMain = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var mapOffsetLeft = map.offsetLeft;

    var mapPinMainLeft = Number(mapPinMain.style.left.replace(/px/, ''));
    var mapPinMainTop = Number(mapPinMain.style.top.replace(/px/, ''));
    var mapPinMainWidth = Number(mapPinMain.clientWidth);
    var mapPinMainHeight = Number(mapPinMain.clientHeight);
    var mapPinMainHeightAfter = Number(getComputedStyle(mapPinMain, '::after').height.replace(/px/, ''));

    var pinMainCoordinateCenterLeft = Math.round(mapOffsetLeft + mapPinMainLeft + mapPinMainWidth / 2);
    var pinMainCoordinateCenterTop = Math.round(mapPinMainTop + (mapPinMainHeightAfter + mapPinMainHeight) / 2);
    var pinMainCoordinateSpearheadTop = Math.round(mapPinMainTop + mapPinMainHeight + mapPinMainHeightAfter);

    var addressInactiveMap = (pinMainCoordinateCenterLeft + ', ' + pinMainCoordinateCenterTop);
    var addressActiveMap = (pinMainCoordinateCenterLeft + ', ' + pinMainCoordinateSpearheadTop);

    return {
      pinMainCoordinateX: pinMainCoordinateCenterLeft,
      pinMainCoordinateY: pinMainCoordinateSpearheadTop,
      addressInactiveMap: addressInactiveMap,
      addressActiveMap: addressActiveMap,
      mapPinMainHeight: mapPinMainHeight,
      mapPinMainHeightAfter: mapPinMainHeightAfter,
      mapPinMainWidth: mapPinMainWidth

    };
  };

})();
