'use strict';
(function () {

  window.pinMove = function () {
    var Coordinate = {
      Y_MIN: 130,
      Y_MAX: 630
    };
    var mapPinMain = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var mapOffsetWidth = map.offsetWidth;
    var mapOffsetLeft = map.offsetLeft;

    var onPinMainMouseDown = function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.pageX,
        y: evt.pageY
      };

      var onPinMainMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.pageX,
          y: startCoords.y - moveEvt.pageY
        };

        startCoords = {
          x: moveEvt.pageX,
          y: moveEvt.pageY
        };

        var pinMainCoordinates = window.pinMainCoordinates();
        if (pinMainCoordinates.y < Coordinate.Y_MIN) {
          mapPinMain.style.top = (Coordinate.Y_MIN - pinMainCoordinates.heightAfter - pinMainCoordinates.height) + 'px';
        } else if (pinMainCoordinates.y > Coordinate.Y_MAX) {
          mapPinMain.style.top = (Coordinate.Y_MAX - pinMainCoordinates.heightAfter - pinMainCoordinates.height) + 'px';
        } else {
          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        }

        if (startCoords.x > mapOffsetWidth + mapOffsetLeft) {
          mapPinMain.style.left = (mapOffsetWidth - pinMainCoordinates.width / 2) + 'px';
        } else if (startCoords.x < mapOffsetLeft) {
          mapPinMain.style.left = (-pinMainCoordinates.width / 2) + 'px';
        } else {
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        }
      };

      var onPinMainMouseUp = function (upEvt) {
        upEvt.preventDefault();

        window.activeState();

        document.removeEventListener('mousemove', onPinMainMouseMove);
        document.removeEventListener('mouseup', onPinMainMouseUp);
      };

      document.addEventListener('mousemove', onPinMainMouseMove);
      document.addEventListener('mouseup', onPinMainMouseUp);

    };
    mapPinMain.addEventListener('mousedown', onPinMainMouseDown);

    return mapPinMain;
  };
})();
