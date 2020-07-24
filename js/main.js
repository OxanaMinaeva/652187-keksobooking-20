'use strict';
(function () {

  var mapPinMainCoordinates = window.pinMainCoordinates();
  window.mapPinMain = {
    left: mapPinMainCoordinates.left,
    top: mapPinMainCoordinates.top,
    addressInactiveMap: mapPinMainCoordinates.addressInactiveMap
  };

  window.backend().load(window.load());
  window.pinMove();
})();
