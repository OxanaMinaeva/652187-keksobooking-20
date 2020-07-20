'use strict';

(function () {

  // Отрисовка удобств
  var getPopupFeature = function (mapCardPopup, card) {
    var popupAllFeatures = mapCardPopup.querySelectorAll('.popup__feature');
    var popupAllFeaturesArr = Array.from(popupAllFeatures);
    var features = card.offer.features;
    var featuresClass = [];

    features.forEach(function (feature) {
      featuresClass.push('popup__feature popup__feature--' + feature);
    });
    popupAllFeaturesArr.forEach(function (feature) {
      if (featuresClass.indexOf(feature.className) === -1) {
        mapCardPopup.querySelector('.popup__features').removeChild(feature);
      }
    });
  };

  // Отрисовка картинок
  var getPopupPhotos = function (mapCardPopup, card) {
    var popupPhotos = mapCardPopup.querySelector('.popup__photo');
    popupPhotos.src = card.offer.photos[0];

    for (var k = 0; k < card.offer.photos.length - 1; k++) {
      popupPhotos = mapCardPopup.querySelector('.popup__photo');
      var popupPhotoImg = popupPhotos.cloneNode(true);
      popupPhotos.src = card.offer.photos[k + 1];
      popupPhotos.before(popupPhotoImg);
    }
  };

  window.popup = function (cards) {
    // тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.
    var popupTypeMap = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };

    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    var mapCardPopupTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var mapCardPopup;

    // заголовок объявления
    var MAX_CARD_POPUP = 1;
    // Отрисовка объектов карточки
    for (var j = 0; j < MAX_CARD_POPUP; j++) {
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

      setCardBlock(cards[j].offer.title, '.popup__title', '');
      setCardBlock(cards[j].offer.address, '.popup__text--address', '');
      setCardBlock(cards[j].offer.price, '.popup__text--price', '₽/ночь');
      setCardBlock(popupTypeMap[cards[j].offer.type], '.popup__type', '');


      if (cards[j].offer.rooms !== 0 && cards[j].offer.guests !== 0) {
        mapCardPopup.querySelector('.popup__text--capacity').textContent = cards[j].offer.rooms + ' комнаты ' + cards[j].offer.guests + ' гостей';
      } else {
        removeElem('.popup__text--capacity');
      }

      if (cards[j].offer.checkin && cards[j].offer.checkout) {
        mapCardPopup.querySelector('.popup__text--time').textContent = 'Заезд после ' + cards[j].offer.checkin + ', выезд до ' + cards[j].offer.checkout;
      } else {
        removeElem('.popup__text--time');
      }

      if (cards[j].offer.features.length > 0) {
        getPopupFeature(mapCardPopup, cards[j]);
      } else {
        removeElem('.popup__features');
      }

      setCardBlock(cards[j].offer.description, '.popup__description', '');

      if (cards[j].offer.photos.length > 0) {
        getPopupPhotos(mapCardPopup, cards[j]);
      } else {
        removeElem('.popup__photos');
      }

      if (cards[j].author.avatar) {
        mapCardPopup.querySelector('.popup__avatar').src = cards[j].author.avatar;
      } else {
        removeElem('.popup__avatar');
      }

      fragment.appendChild(mapCardPopup);
    }

    mapFiltersContainer.before(fragment);
    return mapFiltersContainer;
  };
})();
