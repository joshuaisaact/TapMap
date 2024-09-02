'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerPins = document.querySelector('.pins');
const inputType = document.querySelector('.form__input--type');
const inputPrice = document.querySelector('.form_input--price');
const inputFood = document.querySelector('.form_input--food');
const inputPets = document.querySelector('.form_input--pets');
const inputOutdoors = document.querySelector('.form_input--outdoors');

let map, mapEvent;

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude]

    map = L.map('map').setView(coords, 14);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);



    map.on('click', function (mapE) {
      mapEvent = mapE;
      form.classList.remove('hidden');
      inputFood.focus();
      // console.log(mapEvent);
      // const { lat, lng } = mapEvent.latlng;

      // L.marker([lat, lng])
      //   .addTo(map)
      //   .bindPopup(L.popup({ maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: "custom-popup" }))
      //   .setPopupContent('Pub')
      //   .openPopup();
    })
  },
    function () {
      alert('Could not get your location')
    })


form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear input fields

  inputPets.value = ' ';
  inputFood.value = ' ';
  inputOutdoors.value = ' ';

  // Display Marker
  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(L.popup({ maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: "custom-popup" }))
    .setPopupContent('Pub')
    .openPopup();
})