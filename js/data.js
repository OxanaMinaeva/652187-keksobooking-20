'use strict';


(function () {
  var NUMBER_OF_ADS = 8;
  var map = document.querySelector('.map__overlay');
  var mapPinElement = document.querySelector('.map__pin');

  var mapPings = [];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  // Рандомное число в диапазоне
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Аватары меток
  var getAvatarUrl = function () {
    var randomNumber;
    var mapPinsAvatars = [];
    while (mapPinsAvatars.length < NUMBER_OF_ADS) {
      randomNumber = getRandomNumber(1, NUMBER_OF_ADS);
      if (mapPinsAvatars.indexOf('img/avatars/user0' + randomNumber + '.png') === -1) {
        mapPinsAvatars.push('img/avatars/user0' + randomNumber + '.png');
      }
    }
    return mapPinsAvatars;
  };

  // Рандомный массив неповторяющихся зачений от текущего массива
  var getRandomUniqueArray = function (elementsArray) {
    var indexElement;
    var randomUniqueArray = [];
    for (var k = 0; k < elementsArray.length; k++) {
      indexElement = getRandomNumber(0, elementsArray.length - 1);
      if (randomUniqueArray.indexOf(elementsArray[indexElement]) === -1) {
        randomUniqueArray.push(elementsArray[indexElement]);
      }
    }
    return randomUniqueArray;
  };

  // Получение локации
  var getLocation = function (coordinate) {
    if (coordinate === 'x') {
      return getRandomNumber(0, map.offsetWidth - mapPinElement.offsetWidth);
    } else {
      return getRandomNumber(130, 630);
    }
  };

  // Получение объектов меток
  window.data = function () {
    var avatars = getAvatarUrl();
    var locationCoordinateX = 0;
    var locationCoordinateY = 0;

    for (var i = 0; i < NUMBER_OF_ADS; i++) {
      locationCoordinateX = getLocation('x');
      locationCoordinateY = getLocation('y');

      mapPings.push(
          {
            author: {
              avatar: avatars[i],
            },
            offer: {
              title: 'Заголовок предложения',
              address: locationCoordinateX + ', ' + locationCoordinateY,
              price: 5000,
              type: types[getRandomNumber(0, types.length - 1)],
              rooms: 2,
              guests: 6,
              checkin: times[getRandomNumber(0, times.length - 1)],
              checkout: times[getRandomNumber(0, times.length - 1)],
              features: getRandomUniqueArray(features),
              description: 'Описание предложения',
              photos: getRandomUniqueArray(photos)
            },
            location: {
              x: locationCoordinateX,
              y: locationCoordinateY
            }
          }
      );
    }
    return {
      NUMBER_OF_ADS: NUMBER_OF_ADS,
      mapPings: mapPings
    };
  };
})();
