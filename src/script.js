'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerPins = document.querySelector('.pins');
const inputType = document.querySelector('.form__input--type');
const inputPrice = document.querySelector('.form__input--price');
const inputFood = document.querySelector('.form__input--food');
const inputPets = document.querySelector('.form__input--pets');
const inputOutdoors = document.querySelector('.form__input--outdoors');

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude]

    const map = L.map('map').setView(coords, 14);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker(coords).addTo(map)
      .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      .openPopup();
  }, function () {
    alert('Could not get your location')
  })