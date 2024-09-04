'use strict';
// Lightweight library for generating unique IDs
import { nanoid } from '../node_modules/nanoid/nanoid.js';

class Tap {
  constructor(name, coords, price, food) {
    this.id = nanoid(); // Generate unique ID
    this.name = name;
    this.coords = coords;
    this.price = price;
    this.food = food;
  }

  _setDescription() {
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)}`;
  }
}

class Pub extends Tap {
  type = 'pub';
  constructor(name, coords, price, food, pets) {
    super(name, coords, price, food);
    this.pets = pets;
    this._setDescription();
  }
}
class Brewery extends Tap {
  type = 'brewery';
  constructor(name, coords, price, food, outdoors) {
    super(name, coords, price, food);
    this.outdoors = outdoors;
    this._setDescription();
  }
}

////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerPins = document.querySelector('.pins');
const inputName = document.querySelector('.form__input--name')
const inputType = document.querySelector('.form__input--type');
const inputPrice = document.querySelector('.form_input--price');
const inputFood = document.querySelector('.form_input--food');
const inputPets = document.querySelector('.form_input--pets');
const inputOutdoors = document.querySelector('.form_input--outdoors');

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 14;
  #taps = [];
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newTap.bind(this));
    inputType.addEventListener('change', this._toggleOutdoor);
    containerPins.addEventListener('click', this._moveToPopup.bind(this));
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

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapEvent) {
    this.#mapEvent = mapEvent;
    form.classList.remove('hidden');
  }

  _hideForm() {
    inputPets.checked = false; // Clear input fields (checkboxes)
    inputFood.checked = false;
    inputOutdoors.checked = false;
    inputName.value = '';
    form.classList.add('hidden')
  }

  _toggleOutdoor() {
    inputPets.closest('.form__row').classList.toggle('form__row--hidden');
    inputOutdoors.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newTap(e) {
    e.preventDefault();

    // Get data from form
    const name = inputName.value;
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

      tap = new Pub(name, [lat, lng], price, food, pets);
    }

    // If brewery, create brewery object
    if (type === 'brewery') {
      const outdoors = inputOutdoors.checked;
      tap = new Brewery(name, [lat, lng], price, food, outdoors);
    }

    // Add new object to Tap array
    this.#taps.push(tap);
    console.log(tap);

    // Render Tap on map as a marker
    this._renderTapMarker(tap);

    // Render Tap on list

    this._renderTap(tap)

    // Hide form + Clear input fields

    this._hideForm()

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
      .setPopupContent(`🍺 ${tap.name}`)
      .openPopup();
  }

  _renderTap(tap) {
    const priceEmojis = {
      'Budget': '💵',
      'Medium': '💵💵',
      'Expensive': '💵💵💵'
    };
    let html = `
    <li class="tap tap--${tap.type} bg-slate-300 ounded-md p-6 mb-7 cursor-pointer grid grid-cols-4 gap-x-6 gap-y-3" data-id="${tap.id}" >
          <h2 class="text-[1.7rem] col-span-full text-gray-700">${tap.name}</h2>
          <div class="tap__details">
            <span class="tap__value">${priceEmojis[tap.price]}</span>
          </div>
          <div class="tap__details">
            <span class="tap__icon">🍔</span>
            <span class="tap__value">${tap.food ? '✔️' : '❌'}</span>
          </div>

    `;

    if (tap.type === 'pub')
      html += `
          <div class="tap__details">
            <span class="tap__icon">🐕</span>
            <span class="workout__value">${tap.pets ? '✔️' : '❌'}</span>
          </div>
        </li>
      `;

    if (tap.type === 'brewery')
      html += `
        <div class="tap__details">
            <span class="tap__icon">🪑</span>
            <span class="tap__value">${tap.outdoors ? '✔️' : '❌'}</span>
        </div>
      </li>
    `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const tapEl = e.target.closest('.tap');
    console.log(tapEl);

    if (!tapEl) return;

    const tap = this.#taps.find(tap => tap.id === tapEl.dataset.id);

    console.log(tap);

    this.#map.setView(tap.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1
      }
    })
  }
}

const app = new App();
