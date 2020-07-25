'use strict';

(function () {

  window.popup = function (cards) {
    var mapPins = document.querySelectorAll('.map__pin');

    var onPopupCloseClick = function (evt) {
      if (evt.type === 'click') {
        closePopup(evt.target.parentElement);
      }
    };

    var onDocumentKeydown = function (evt) {
      if (evt.key === 'Escape') {
        var mapCardPopup = document.querySelector('.map__card.popup');
        closePopup(mapCardPopup);
      }
    };

    var openPopup = function (mapPin, card) {
      mapPin.addEventListener('click', function () {
        var mapCardPopup = window.renderPopup(card);
        mapPin.classList.add('map__pin--active');
        var popupClose = mapCardPopup.querySelector('.popup__close');
        popupClose.addEventListener('click', onPopupCloseClick);
        document.addEventListener('keydown', onDocumentKeydown);

      });
    };

    var closePopup = function (mapCardPopup) {
      mapCardPopup.remove();
      if (document.querySelector('.map__pin--active')) {
        var mapPinActive = document.querySelector('.map__pin--active');
        mapPinActive.classList.remove('map__pin--active');
      }
      document.removeEventListener('keydown', onDocumentKeydown);
    };

    for (var i = 1; i < mapPins.length; i++) {
      openPopup(mapPins[i], cards[i - 1]);
    }
    return mapPins;
  };
})();
