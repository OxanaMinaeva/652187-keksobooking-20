'use strict';


(function () {
  window.load = function () {

    var closeSuccess = function (success) {
      window.inactiveState();
      success.remove();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeydown);
    };


    var onDocumentClick = function () {
      var successMessage = document.querySelector('.success');
      closeSuccess(successMessage);
    };


    var closeError = function (error) {
      error.remove();
      document.removeEventListener('keydown', onDocumentKeydown);

    };

    var onErrorClick = function (evt) {
      if (evt.target.classList.contains('error__button')) {
        closeError(evt.target.parentElement);
      } else {
        closeError(evt.target);
      }
    };

    var onDocumentKeydown = function (evt) {
      if (evt.key === 'Escape') {
        if (document.querySelector('.success')) {
          var successMessage = document.querySelector('.success');
          closeSuccess(successMessage);
        } else {
          var errorMessage = document.querySelector('.error');
          closeError(errorMessage);
        }
      }
    };

    var onLoad = function () {
      var fragment = document.createDocumentFragment();
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var promo = document.querySelector('.promo');
      var successMessage = successTemplate.cloneNode(true);
      fragment.appendChild(successMessage);
      promo.before(fragment);

      document.addEventListener('click', onDocumentClick);
      document.addEventListener('keydown', onDocumentKeydown);
    };

    var onError = function (error) {
      var fragment = document.createDocumentFragment();
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var promo = document.querySelector('.promo');
      var errorMessage = errorTemplate.cloneNode(true);
      errorMessage.querySelector('.error__message').textContent = error;
      fragment.appendChild(errorMessage);
      promo.before(fragment);

      errorMessage.addEventListener('click', onErrorClick);
      document.addEventListener('keydown', onDocumentKeydown);
      var errorButton = errorMessage.querySelector('.error__button');
      errorButton.addEventListener('click', onErrorClick);
    };

    return {
      onLoad: onLoad,
      onError: onError
    };
  };

})();
