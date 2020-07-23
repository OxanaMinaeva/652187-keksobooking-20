'use strict';

(function () {
  window.filterPins = function (pins) {
    var MAX_PINS = 5;
    var MAX_RANK = 4;

    // Тип жилья
    var filterType = document.querySelector('#housing-type');
    var filterPrice = document.querySelector('#housing-price');
    var filterRooms = document.querySelector('#housing-rooms');
    var filterGuests = document.querySelector('#housing-guests');

    var getRank = function (pin) {
      var rank = 0;
      if (pin.offer.type === filterType.value || filterType.value === 'any') {
        rank += 1;
      }

      if (filterPrice.value === 'any') {
        rank += 1;
      } else if (filterPrice.value === 'middle' && (pin.offer.price >= 10000 && pin.offer.price <= 50000)) {
        rank += 1;
      } else if (filterPrice.value === 'low' && pin.offer.price <= 10000) {
        rank += 1;
      } else if (filterPrice.value === 'high' && pin.offer.price >= 50000) {
        rank += 1;
      }

      if (pin.offer.rooms.toString() === filterRooms.value || filterRooms.value === 'any') {
        rank += 1;
      }
      if (pin.offer.guests.toString() === filterGuests.value || filterGuests.value === 'any') {
        rank += 1;
      }

      if (checkedFeatures.length > 0) {
        checkedFeatures.forEach(function (checkedFeature) {
          if (pin.offer.features.indexOf(checkedFeature) >= 0) {
            rank += 1;
          }
        });
      }
      return rank;
    };


    var mapFeatures = document.querySelector('.map__features');
    var inputsFeatures = mapFeatures.querySelectorAll('input[name=features]');
    var checkedFeatures = [];

    inputsFeatures.forEach(function (inputFeature) {
      if (inputFeature.checked) {
        checkedFeatures.push(inputFeature.value);
      }
    });

    var samePinsOffer = [];
    pins.forEach(function (pin) {
      var pinRank = getRank(pin);
      if (pinRank === MAX_RANK + checkedFeatures.length) {
        samePinsOffer.push(pin);
      }
    });


    samePinsOffer.splice(MAX_PINS);
    window.filterForm();
    return samePinsOffer;
  };
})();
