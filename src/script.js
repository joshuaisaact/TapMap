'use strict';
// Lightweight library for generating unique IDs
import { nanoid } from "../node_modules/nanoid/nanoid.js";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];



class Tap {
  constructor(coords, price, food) {
    this.id = nanoid(); // Generate unique ID
    this.coords = coords;
    this.price = price;
    this.food = food;
  }
}

class Pub extends Tap {
  type = 'Pub';
  constructor(coords, price, food, pets) {
    super(coords, price, food);
    this.pets = pets;
  }
}
class Brewery extends Tap {
  type = 'Brewery';
  constructor(coords, price, food, outdoors) {
    super(coords, price, food);
    this.outdoors = outdoors;
  }
}



////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerPins = document.querySelector('.pins');
const inputType = document.querySelector('.form__input--type');
const inputPrice = document.querySelector('.form_input--price');
const inputFood = document.querySelector('.form_input--food');
const inputPets = document.querySelector('.form_input--pets');
const inputOutdoors = document.querySelector('.form_input--outdoors');

class App {
  #map;
  #mapEvent;
  #taps = [];
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

    // Get data from form
    const type = inputType.value;
    const price = inputPrice.value;
    const food = inputFood.checked;
    const { lat, lng } = this.#mapEvent.latlng;
    let tap;

    // Check if data is valid

    // If pub, create pub object
    if (type === 'pub') {
      const pets = inputPets.checked;
      // if (pets !== INSERTOPTIONSFORPETSHERE) return alert('Input is invalid!')

      tap = new Pub([lat, lng], price, food, pets)

    }

    // If brewery, create brewery object
    if (type === 'brewery') {
      const outdoors = inputOutdoors.checked;
      tap = new Brewery([lat, lng], price, food, outdoors);
    }



    // Add new object to Tap array
    this.#taps.push(tap);
    console.log(tap);

    // Render Tap on map as a marker
    this._renderTapMarker(tap)

    // Render Tap on list

    // Hide form + Clear input fields

    inputPets.value = ' ';
    inputFood.value = ' ';
    inputOutdoors.value = ' ';

    // Display Marker

  }
  _renderTapMarker(tap) {
    L.marker(tap.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${tap.type}-popup`,
        }),
      )
      .setPopupContent(tap.type)
      .openPopup();
  }

  _renderTap(tap) {

  }
}

const app = new App();
