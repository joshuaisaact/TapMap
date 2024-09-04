import { describe, it, expect, beforeEach, vi } from 'vitest';
import { App, Pub, Brewery } from '../src/script.js';  // Assuming the path is correct

beforeEach(() => {
  // Set up basic HTML structure
  document.body.innerHTML = `
  <div id="map"></div>
  <div class="sidebar">
    <ul class="pins">
      <form class="form">
        <input class="form__input--name" />
        <select class="form__input--type">
          <option value="pub">Pub</option>
          <option value="brewery">Brewery</option>
        </select>
        <select class="form_input--price">
          <option value="Budget">Budget</option>
          <option value="Medium">Medium</option>
          <option value="Expensive">Expensive</option>
        </select>
        <input class="form_input--food" type="checkbox" />
        <input class="form_input--pets" type="checkbox" />
        <input class="form_input--outdoors" type="checkbox" />
        <button type="submit" class="form__btn">Submit</button>
      </form>
    </ul>
  </div>
  `;

  global.L = {
    map: vi.fn(() => ({
      setView: vi.fn().mockReturnThis(),
      on: vi.fn(), // Mock the 'on' method used in your app
    })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),  // Mock 'addTo' method
    })),
    marker: vi.fn(() => ({
      addTo: vi.fn().mockReturnThis(),
      bindPopup: vi.fn().mockReturnThis(),
      openPopup: vi.fn().mockReturnThis(),
    })),
    popup: vi.fn().mockReturnThis(),
  };

  // Mock navigator.geolocation for Vitest
  vi.stubGlobal('navigator', {
    geolocation: {
      getCurrentPosition: vi.fn().mockImplementation((success) => {
        success({
          coords: {
            latitude: 51.5074,
            longitude: -0.1278
          }
        });
      }),
    },
  });

  const app = new App();

  // Manually trigger the setting of #mapEvent (since no real map click happens in tests)
  app._setMapEvent(51.5074, -0.1278)

});

describe('Tap Classes', () => {
  it('should create a new Pub with correct properties', () => {
    const pub = new Pub('The Red Lion', [51.5074, -0.1278], 'Medium', true, true);

    expect(pub).toBeDefined();
    expect(pub.name).toBe('The Red Lion');
    expect(pub.coords).toEqual([51.5074, -0.1278]);
    expect(pub.price).toBe('Medium');
    expect(pub.food).toBe(true);
    expect(pub.pets).toBe(true);
  });

  it('should create a new Brewery with correct properties', () => {
    const brewery = new Brewery('BrewDog', [51.5074, -0.1278], 'Expensive', false, true);

    expect(brewery).toBeDefined();
    expect(brewery.name).toBe('BrewDog');
    expect(brewery.coords).toEqual([51.5074, -0.1278]);
    expect(brewery.price).toBe('Expensive');
    expect(brewery.food).toBe(false);
    expect(brewery.outdoors).toBe(true);
  });
});

