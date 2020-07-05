'use strict';

(function () {
  window.capacityValidation = function (roomsSelect, capacitySelect) {
    var roomsSelectValue = roomsSelect.value;
    var capacitySelectValue = capacitySelect.value;

    if (roomsSelectValue !== '100' && (roomsSelectValue < capacitySelectValue || capacitySelectValue === '0')) {
      capacitySelect.setCustomValidity('Количество гостей должно быть не более ' + roomsSelectValue);

    } else if (roomsSelectValue === '100' && capacitySelectValue !== '0') {
      capacitySelect.setCustomValidity('Количество мест должно быть "не для гостей"');
    } else {
      capacitySelect.setCustomValidity('');
    }

  };
})();
