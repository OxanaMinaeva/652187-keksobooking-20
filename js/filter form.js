'use strict';

(function () {
  // Операции с формой фильтрации
  window.filterForm = function () {
    var mapFilters = document.querySelector('.map__filters');
    var selectHousingType = mapFilters.querySelector('#housing-type');

    var onSelectChange = function () {
      var mapPins = document.querySelector('.map__pins');

      while (mapPins.lastChild.type === 'button') {
        mapPins.lastChild.remove();
      }

      var noticeElement = document.querySelector('.notice');
      noticeElement.classList.add('hidden');

      window.backend().load();

      selectHousingType.removeEventListener('change', onSelectChange);
    };

    selectHousingType.addEventListener('change', onSelectChange);
  };
})();
