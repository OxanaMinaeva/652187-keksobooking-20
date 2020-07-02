'use strict';
var NUMBER_OF_ADS = 8;
var map = document.querySelector('.map__overlay');
var mapPinElement = document.querySelector('.map__pin');
var mapPinMain = document.querySelector('.map__pin--main');

var mapPings = [];
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var elemMap = document.querySelector('.map');

var adForm = document.querySelector('.ad-form');
var adFormHeader = adForm.querySelector('.ad-form-header');
var adFormElements = adForm.querySelectorAll('.ad-form__element');

var mapFilters = document.querySelector('.map__filters');

var adFormSubmit = document.querySelector('.ad-form__submit');

var roomsSelect = document.querySelector('.ad-form__element select[name=rooms]');
var capacitySelect = document.querySelector('.ad-form__element select[name=capacity]');


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


var mapPinMainLeft = Number(mapPinMain.style.left.replace(/px/, ''));
var mapPinMainTop = Number(mapPinMain.style.top.replace(/px/, ''));
var mapPinMainWidth = Number(mapPinMain.firstElementChild.width);
var mapPinMainHeight = Number(mapPinMain.firstElementChild.height);
var mapPinMainHeightAfter = Number(getComputedStyle(mapPinMain, '::after').height.replace(/px/, ''));

var pinMainCoordinateCenterLeft = Math.round(mapPinMainLeft + mapPinMainWidth / 2);
var pinMainCoordinateCenterTop = Math.round(mapPinMainTop + (mapPinMainHeightAfter + mapPinMainHeight) / 2);
var pinMainCoordinateSpearheadTop = Math.round(mapPinMainTop + mapPinMainHeight + mapPinMainHeightAfter);


var addressInactiveMap = (pinMainCoordinateCenterLeft + ', ' + pinMainCoordinateCenterTop);
var addressActiveMap = (pinMainCoordinateCenterLeft + ', ' + pinMainCoordinateSpearheadTop);

var setAddress = function (state) {
  var addressInput = document.querySelector('.ad-form__element input[name=address]');
  if (state === 'inactive') {
    addressInput.value = addressInactiveMap;
  } else {
    addressInput.value = addressActiveMap;
  }
};

var makeInactiveMapAndForm = function () {
  for (var i = 0; i < mapFilters.length; i++) {
    mapFilters[i].setAttribute('disabled', 'true');
  }

  adFormHeader.setAttribute('disabled', 'true');
  for (var l = 0; l < adFormElements.length; l++) {
    adFormElements[l].setAttribute('disabled', 'true');
  }
  setAddress('inactive');
};


var makeActiveMapAndForm = function () {

  for (var i = 0; i < mapFilters.length; i++) {
    mapFilters[i].removeAttribute('disabled');
  }
  adFormHeader.removeAttribute('disabled');
  for (var l = 0; l < adFormElements.length; l++) {
    adFormElements[l].removeAttribute('disabled');
  }

  elemMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  mapPinMain.removeEventListener('mousedown', onMousedown);
  mapPinMain.removeEventListener('keydown', onEnterClick);
};


var onMousedown = function (evt) {
  if (evt.which === 1) {
    makeActiveMapAndForm();
    setAddress('active');
  }
};

var onEnterClick = function (evt) {
  if (evt.keyCode === 13) {
    makeActiveMapAndForm();
    setAddress('active');
  }
};

var capacityValidation = function () {
  var roomsSelectValue = roomsSelect.value;
  var capacitySelectValue = capacitySelect.value;

  if (roomsSelectValue !== '100' && (roomsSelectValue < capacitySelectValue || capacitySelectValue === '0')) {
    capacitySelect.setCustomValidity('Количество гостей должно быть не более ' + roomsSelectValue);

  } else if (roomsSelectValue === '100' && capacitySelectValue !== '0') {
    capacitySelect.setCustomValidity('Количество мест должно быть "не для гостей"');
  } else {
    capacitySelect.setCustomValidity('');
  }

};

renderMapPin();
makeInactiveMapAndForm();


mapPinMain.addEventListener('mousedown', onMousedown);
mapPinMain.addEventListener('keydown', onEnterClick);


capacitySelect.addEventListener('change', capacityValidation);
adFormSubmit.addEventListener('click', capacityValidation);
