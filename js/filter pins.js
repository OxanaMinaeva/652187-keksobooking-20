'use strict';

(function () {
  window.filterPins = function (pins) {
    var MAX_PINS = 5;
    var elementType = document.querySelector('#housing-type');
    var samePinsOfferType = [];
    if (elementType.value !== 'any') {
      samePinsOfferType = pins.filter(function (pin) {
        return pin.offer.type === elementType.value;
      });
    } else {
      samePinsOfferType = pins;
    }

    samePinsOfferType.splice(MAX_PINS);
    window.filterForm();
    return samePinsOfferType;
  };
})();
