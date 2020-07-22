'use strict';

// Функции взаимодействия удалённым сервером через XHR
(function () {

  var onError = function (errorMessage) {
    var error = document.createElement('div');
    error.style = 'text-align: center;';
    error.style.fontSize = '26px';
    error.style.fontWeight = 'bold';
    error.textContent = 'Произшла ошибка! ' + errorMessage + ' Попробуйте позже.';
    var mapPins = document.querySelector('.map__pins');

    mapPins.append(error);
    document.querySelector('.map__pin').classList.add('hidden');
    document.querySelector('.promo').classList.add('hidden');
    document.querySelector('.map__title').textContent = '';
  };


  window.load = function () {
    var URL = 'https://javascript.pages.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open('GET', URL);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        // Вызов фильтрации
        var filteredResponse = window.filterPins(xhr.response);
        window.pin(filteredResponse, filteredResponse.length);
        window.popup(filteredResponse);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText + '.');
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Ожидание от сервера более ' + xhr.timeout + 'мс.');

    });

    return xhr;
  };


})();

