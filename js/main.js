'use strict';
(function () {

  var mapPinMainCoordinates = window.pinMainCoordinates();
  window.mapPinMain = {
    mapPinMainLeft: mapPinMainCoordinates.mapPinMainLeft,
    mapPinMainTop: mapPinMainCoordinates.mapPinMainTop,
    addressInactiveMap: mapPinMainCoordinates.addressInactiveMap
  };

  window.backend().load(window.load());
  window.pinMove();
})();
