'use strict';

// Функции взаимодействия удалённым сервером через XHR
(function () {

  var ParameterXhr = {
    URL_LOAD: 'https://javascript.pages.academy/keksobooking/data',
    URL_SUBMIT: 'https://javascript.pages.academy/keksobooking',
    TIMEOUT: 1000
  };

  var Code = {
    SUCCESS: 200,
    ERROR: 500
  };

  var errorText = {
    CONNECTION: 'Произошла ошибка соединения с сервером! ',
    TIMEOUT: 'Ожидание от сервера более ',
    BY_DEFAULT: 'Cтатус ответа: '
  };

  window.backend = function () {
    var load = function (loadFunction) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = ParameterXhr.TIMEOUT;
      xhr.open('GET', ParameterXhr.URL_LOAD);
      xhr.send();

      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case Code.SUCCESS:
            // Вызов фильтрации
            window.xhrResponse = xhr.response;
            break;
          case Code.ERROR:
            error = errorText.CONNECTION + xhr.statusText;
            break;
          default:
            error = errorText.BY_DEFAULT + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          loadFunction.onError(error);
        }
      });

      xhr.addEventListener('timeout', function () {
        loadFunction.onError(errorText.TIMEOUT + xhr.timeout + 'мс.');

      });

      return xhr;
    };

    var submit = function (data, submitFunction) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var error;
        switch (xhr.status) {
          case Code.SUCCESS:
            submitFunction.onLoad();
            break;
          case Code.ERROR:
            error = errorText.CONNECTION + xhr.statusText;
            break;
          default:
            error = errorText.BY_DEFAULT + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
          submitFunction.onError(error);
        }

      });

      xhr.open('POST', ParameterXhr.URL_SUBMIT);
      xhr.send(data);

    };

    return {
      load: load,
      submit: submit
    };

  };


})();

