'use strict';

(function () {
// Самостоятельный модуль
// Отрисовка объектов меток

  window.pin = function (mapPings, adsCount) {

    var mapPinsElement = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    var mapPin;
    for (var j = 0; j < adsCount; j++) {
      if (mapPings[j].offer) {
        mapPin = mapPinTemplate.cloneNode(true);
        mapPin.setAttribute('style', 'left: ' + mapPings[j].location.x + 'px; top: ' + mapPings[j].location.y + 'px;');
        mapPin.firstChild.src = mapPings[j].author.avatar;
        mapPin.firstChild.alt = mapPings[j].offer.title;

        fragment.appendChild(mapPin);
      }
    }

    mapPinsElement.appendChild(fragment);
    return mapPinsElement;
  };
})();
