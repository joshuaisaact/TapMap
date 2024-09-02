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

// let map, mapEvent;

class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newTap.bind(this));

    inputType.addEventListener('change', this._toggleOutdoor);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your location');
        },
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, 14);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapEvent) {
    this.#mapEvent = mapEvent;
    form.classList.remove('hidden');
    inputFood.focus();
  }

  _toggleOutdoor() {
    inputPets.closest('.form__row').classList.toggle('form__row--hidden');
    inputOutdoors.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newTap(e) {
    e.preventDefault();

    // Clear input fields

    inputPets.value = ' ';
    inputFood.value = ' ';
    inputOutdoors.value = ' ';

    // Display Marker
    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'custom-popup',
        }),
      )
      .setPopupContent('Pub')
      .openPopup();
  }
}

const app = new App();
