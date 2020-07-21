'use strict';

(function () {

  window.popup = function (cards) {
    var mapPins = document.querySelectorAll('.map__pin');

    var onPopupCloseClick = function (evt) {
      var mapCardPopup = document.querySelector('.map__card.popup');

      if (evt.type === 'click' || (evt.type === 'keydown' && evt.key === 'Escape')) {
        closePopup(mapCardPopup);
      }
    };


    var openPopup = function (mapPin, card) {
      mapPin.addEventListener('click', function () {
        var mapCardPopup = window.renderPopup(card);
        var popupClose = mapCardPopup.querySelector('.popup__close');

        popupClose.addEventListener('click', onPopupCloseClick);
        document.addEventListener('keydown', onPopupCloseClick);

      });
    };

    var closePopup = function (mapCardPopup) {
      mapCardPopup.remove();
      document.removeEventListener('keydown', onPopupCloseClick);
    };

    for (var i = 1; i < mapPins.length; i++) {
      openPopup(mapPins[i], cards[i - 1]);
    }
    return mapPins;
  };
})();
