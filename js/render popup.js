'use strict';

(function () {

  // тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.
  var popupTypeMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var MIN_VALUE = 0;

  // Отрисовка удобств
  var getPopupFeature = function (mapCardPopup, card) {
    var popupAllFeatures = mapCardPopup.querySelectorAll('.popup__feature');
    var popupAllFeaturesArr = Array.from(popupAllFeatures);
    var features = card.offer.features;
    var featuresClasses = [];

    features.forEach(function (feature) {
      featuresClasses.push('popup__feature popup__feature--' + feature);
    });
    popupAllFeaturesArr.forEach(function (feature) {
      if (featuresClasses.indexOf(feature.className) === -1) {
        mapCardPopup.querySelector('.popup__features').removeChild(feature);
      }
    });
  };

  // Отрисовка картинок
  var getPopupPhotos = function (mapCardPopup, card) {
    var popupPhotos = mapCardPopup.querySelector('.popup__photo');
    popupPhotos.src = card.offer.photos[0];

    for (var k = 0; k < card.offer.photos.length - 1; k++) {
      var popupPhotoImg = popupPhotos.cloneNode(true);
      popupPhotos.src = card.offer.photos[k + 1];
      popupPhotos.before(popupPhotoImg);
    }
  };

  window.renderPopup = function (card) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    var mapCardPopupTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var mapCardPopup = document.querySelector('.map__card.popup');

    if (mapCardPopup) {
      mapCardPopup.remove();
    }

    if (document.querySelector('.map__pin--active')) {
      var mapPinActive = document.querySelector('.map__pin--active');
      mapPinActive.classList.remove('map__pin--active');
    }

    mapCardPopup = mapCardPopupTemplate.cloneNode(true);

    var removeElem = function (elemClass) {
      mapCardPopup.querySelector(elemClass).remove();
    };

    var setCardBlock = function (elem, elemClass, str) {
      if (elem) {
        mapCardPopup.querySelector(elemClass).textContent = elem + str;
      } else {
        removeElem(elemClass);
      }
    };

    setCardBlock(card.offer.title, '.popup__title', '');
    setCardBlock(card.offer.address, '.popup__text--address', '');
    setCardBlock(card.offer.price, '.popup__text--price', '₽/ночь');
    setCardBlock(popupTypeMap[card.offer.type], '.popup__type', '');


    if (card.offer.rooms !== MIN_VALUE && card.offer.guests !== MIN_VALUE) {
      mapCardPopup.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты ' + card.offer.guests + ' гостей';
    } else {
      removeElem('.popup__text--capacity');
    }

    if (card.offer.checkin && card.offer.checkout) {
      mapCardPopup.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    } else {
      removeElem('.popup__text--time');
    }

    if (card.offer.features.length > MIN_VALUE) {
      getPopupFeature(mapCardPopup, card);
    } else {
      removeElem('.popup__features');
    }

    setCardBlock(card.offer.description, '.popup__description', '');

    if (card.offer.photos.length > MIN_VALUE) {
      getPopupPhotos(mapCardPopup, card);
    } else {
      removeElem('.popup__photos');
    }

    if (card.author.avatar) {
      mapCardPopup.querySelector('.popup__avatar').src = card.author.avatar;
    } else {
      removeElem('.popup__avatar');
    }

    fragment.appendChild(mapCardPopup);

    mapFiltersContainer.before(fragment);


    return mapCardPopup;
  };
})();
