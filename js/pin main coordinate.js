'use strict';

(function () {

  window.pinMainCoordinates = function () {
    var mapPinMain = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var mapOffsetLeft = map.offsetLeft;

    var left = Number(mapPinMain.style.left.replace(/px/, ''));
    var top = Number(mapPinMain.style.top.replace(/px/, ''));
    var width = Number(mapPinMain.clientWidth);
    var height = Number(mapPinMain.clientHeight);
    var heightAfter = Number(getComputedStyle(mapPinMain, '::after').height.replace(/px/, ''));

    var centerLeft = Math.round(mapOffsetLeft + left + width / 2);
    var centerTop = Math.round(top + (heightAfter + height) / 2);
    var spearheadTop = Math.round(top + height + heightAfter);

    var addressInactiveMap = (centerLeft + ', ' + centerTop);
    var addressActiveMap = (centerLeft + ', ' + spearheadTop);

    return {
      x: centerLeft,
      y: spearheadTop,
      addressInactiveMap: addressInactiveMap,
      addressActiveMap: addressActiveMap,
      height: height,
      heightAfter: heightAfter,
      width: width,
      left: left,
      top: top

    };
  };

})();
