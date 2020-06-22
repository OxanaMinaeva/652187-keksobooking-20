'use strict';
var NUMBER_OF_ADS = 8;
var map = document.querySelector('.map__overlay');
var mapPinElement = document.querySelector('.map__pin');

var mapPings = [];
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


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


var getLocation = function (coordinate) {
  if (coordinate === 'x') {
    return getRandomNumber(0, map.offsetWidth - mapPinElement.offsetWidth);
  } else {
    return getRandomNumber(130, 630);
  }
};


var getMapPings = function () {
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
  return mapPings;
};


var renderMapPin = function () {
  var elemMap = document.querySelector('.map');
  elemMap.classList.remove('map--faded');

  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var mapPin;
  for (var j = 0; j < NUMBER_OF_ADS; j++) {
    mapPin = mapPinTemplate.cloneNode(true);
    mapPin.setAttribute('style', 'left: ' + getMapPings()[j].location.x + 'px; top: ' + getMapPings()[j].location.y + 'px;');
    mapPin.firstChild.src = getMapPings()[j].author.avatar;
    mapPin.firstChild.alt = getMapPings()[j].offer.title;

    fragment.appendChild(mapPin);
  }

  mapPinsElement.appendChild(fragment);

  return mapPinsElement;
};

renderMapPin();

