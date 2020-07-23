'use strict';

(function () {
  // Операции с формой фильтрации
  window.filterForm = function () {
    var mapFilters = document.querySelector('.map__filters');

    // Тип жилья
    var selectHousingType = mapFilters.querySelector('#housing-type');
    var selectHousingPrice = mapFilters.querySelector('#housing-price');
    var selectHousingRooms = document.querySelector('#housing-rooms');
    var selectHousingGuests = document.querySelector('#housing-guests');
    var mapFeatures = document.querySelector('.map__features');


    var updatePins = function () {
      var mapPins = document.querySelector('.map__pins');

      while (mapPins.lastChild.type === 'button') {
        mapPins.lastChild.remove();
      }

      if (document.querySelector('.map__card.popup')) {
        var mapCardPopup = document.querySelector('.map__card.popup');
        mapCardPopup.remove();
      }

      var filteredResponse = window.filterPins(window.xhrResponse);
      window.pin(filteredResponse, filteredResponse.length);
      window.popup(filteredResponse);
    };
    var onSelectChange = function () {
      window.debounce(updatePins);

      selectHousingType.removeEventListener('change', onSelectChange);
      selectHousingPrice.removeEventListener('change', onSelectChange);
      selectHousingRooms.removeEventListener('change', onSelectChange);
      selectHousingGuests.removeEventListener('change', onSelectChange);
      mapFeatures.removeEventListener('change', onSelectChange);
    };

    selectHousingType.addEventListener('change', onSelectChange);
    selectHousingPrice.addEventListener('change', onSelectChange);
    selectHousingRooms.addEventListener('change', onSelectChange);
    selectHousingGuests.addEventListener('change', onSelectChange);
    mapFeatures.addEventListener('change', onSelectChange);

  };
})();
