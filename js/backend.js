'use strict';

// Функции взаимодействия удалённым сервером через XHR
(function () {

  window.backend = function () {
    var load = function (loadFunction) {
      var URL = 'https://javascript.pages.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 10000;
      xhr.open('GET', URL);
      xhr.send();

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            // Вызов фильтрации
            window.xhrResponse = xhr.response;
            var filteredResponse = window.filterPins(xhr.response);
            window.pin(filteredResponse, filteredResponse.length);
            window.popup(filteredResponse);
            break;
          case 500:
            error = 'Произошла ошибка соединения с сервером! ' + xhr.statusText;
            break;
          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          loadFunction.onError(error);
        }
      });

      xhr.addEventListener('timeout', function () {
        loadFunction.onError('Ожидание от сервера более ' + xhr.timeout + 'мс.');

      });

      return xhr;
    };

    var submit = function (data, submitFunction) {
      var URL = 'https://javascript.pages.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case 200:
            submitFunction.onLoad();
            break;
          case 500:
            error = 'Произошла ошибка соединения с сервером! ' + xhr.statusText;
            break;
          default:
            error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          submitFunction.onError(error);
        }

      });

      xhr.open('POST', URL);
      xhr.send(data);

    };

    return {
      load: load,
      submit: submit
    };

  };


})();

