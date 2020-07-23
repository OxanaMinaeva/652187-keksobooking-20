'use strict';

(function () {
  window.formValidation = function (formElement, firstElement, secondElement) {

    if (formElement === 'capacity') {
      var roomsSelectValue = firstElement.value;
      var capacitySelectValue = secondElement.value;

      if (roomsSelectValue !== '100' && (roomsSelectValue < capacitySelectValue || capacitySelectValue === '0')) {
        secondElement.setCustomValidity('Количество гостей должно быть не более ' + roomsSelectValue);

      } else if (roomsSelectValue === '100' && capacitySelectValue !== '0') {
        secondElement.setCustomValidity('Количество мест должно быть "не для гостей"');
      } else {
        secondElement.setCustomValidity('');
      }
    }

    if (formElement === 'type') {
      var typePriceMap = {
        'bungalo': '0',
        'flat': '1000',
        'house': '5000',
        'palace': '10000'
      };
      var typeSelectValue = firstElement.value;
      var priceElementValue = secondElement.value;
      if (priceElementValue < Number(typePriceMap[typeSelectValue])) {
        secondElement.setCustomValidity('Минимальная цена за ночь должна быть не менее ' + typePriceMap[typeSelectValue] + '₽/ночь');
      } else {
        secondElement.setCustomValidity('');
      }
    }

    if (formElement === 'timein' || formElement === 'timeout') {
      var timeinSelectValue = firstElement.value;
      var timeoutSelectValue = secondElement.value;
      if (formElement === 'timein') {
        secondElement.value = timeinSelectValue;
      } else {
        firstElement.value = timeoutSelectValue;
      }
    }

  };
})();
