'use strict';

(function () {
  window.formValidation = function (formElement, firstElement, secondElement) {
    var typePriceMap = {
      'bungalo': '0',
      'flat': '1000',
      'house': '5000',
      'palace': '10000'
    };

    var elementNameMap = {
      'capacity': 'capacity',
      'type': 'type',
      'timein': 'timein',
      'timeout': 'timeout'
    };

    var MAX_ROOMS = '100';
    var MIN_CAPACITY = '0';

    if (formElement === elementNameMap['capacity']) {
      var roomsSelectValue = firstElement.value;
      var capacitySelectValue = secondElement.value;

      if (roomsSelectValue !== MAX_ROOMS && (roomsSelectValue < capacitySelectValue || capacitySelectValue === MIN_CAPACITY)) {
        secondElement.setCustomValidity('Количество гостей должно быть не более ' + roomsSelectValue);

      } else if (roomsSelectValue === MAX_ROOMS && capacitySelectValue !== MIN_CAPACITY) {
        secondElement.setCustomValidity('Количество мест должно быть "не для гостей"');
      } else {
        secondElement.setCustomValidity('');
      }
    }

    if (formElement === elementNameMap['type']) {
      var typeSelectValue = firstElement.value;
      var priceElementValue = secondElement.value;
      if (priceElementValue < Number(typePriceMap[typeSelectValue])) {
        secondElement.setCustomValidity('Минимальная цена за ночь должна быть не менее ' + typePriceMap[typeSelectValue] + '₽/ночь');
      } else {
        secondElement.setCustomValidity('');
      }
    }

    if (formElement === elementNameMap['timein'] || formElement === elementNameMap['timeout']) {
      var timeinSelectValue = firstElement.value;
      var timeoutSelectValue = secondElement.value;
      if (formElement === elementNameMap['timein']) {
        secondElement.value = timeinSelectValue;
      } else {
        firstElement.value = timeoutSelectValue;
      }
    }

  };
})();
