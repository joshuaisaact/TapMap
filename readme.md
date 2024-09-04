<h1>TapMap // Map your Bars</h1>

**TapMap** is a simple web application designed to allow users to mark and track pubs and breweries on a map. This project was built using **Leaflet.js** for mapping, **Tailwind CSS** for styling, and **Vitest** for testing. The main purpose of this project is to enhance my familiarity with Leaflet for interactive maps, Tailwind for responsive design, and writing basic unit tests using Vitest.

## Features

- **Interactive Map**: Users can click on the map to create new points for pubs or breweries.
- **Form Input**: Input data such as the name, type, price, food availability, and dog-friendliness of a pub or brewery.
- **Responsive Design**: Built with Tailwind CSS to ensure the application works on mobile devices and larger screens.
- **LocalStorage Integration**: The map points and details are saved in the browser's local storage, allowing users to refresh the page without losing their data.
- **Dynamic Popups**: Markers on the map show pub or brewery details via Leaflet's popups.
- **Testing**: Basic tests are written using Vitest to validate the functionality of the application.

## Technologies Used

- **HTML**: For structuring the content of the application.
- **Tailwind CSS**: For responsive design and styling.
- **Leaflet.js**: For adding an interactive map and handling map markers.
- **JavaScript (ES Modules)**: For functionality and interaction.
- **LocalStorage**: For persisting user data across sessions.
- **Vitest**: For writing and running unit tests.

## Project Structure

```plaintext
📁 TapMap
├── 📁 node_modules      # Node.js packages
├── 📁 docs              # Project directory
│   ├── script.js        # Main JavaScript file for app logic
│   ├── index.html       # HTML file
│   ├── input.css        # Tailwind CSS Input file
│   └── output.css       # Generated Tailwind CSS file
├── 📁 tests             # Test directory
│   └── app.test.js      # Unit tests for the application
├── 📄 package.json      # Project dependencies and scripts
├── 📄 tailwind.config.js# Tailwind configuration
├── 📄 README.md         # Project documentation
└── 📄 vitest.config.js  # Vitest configuration file for running tests
```

## How to Run the Project

You can see the project live via GitHub pages at: https://joshuaisaact.github.io/TapMap/

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/TapMap.git
cd TapMap
```

### 2. Install Dependencies:

```bash
npm install
```

### 3. Run Unit Tests:

```bash
npm run test
```

Tests are written using **Vitest** and can be run with the command above.

## Features in Detail

### 1. Interactive Map

The map, powered by **Leaflet.js**, is initialized based on the user's location. Users can add new pubs or breweries by clicking on the map. Each marker includes a popup showing details about the location.

### 2. Dynamic Form

A form allows users to input details such as:

- **Name**: Name of the pub or brewery.
- **Type**: Pub or brewery.
- **Price**: Budget, Medium, Expensive.
- **Food**: Whether food is available.
- **Dog-friendly**: Whether the place is dog-friendly.
- **Outdoor Seating**: Whether there are outdoor seating options.

### 3. Responsive Design

Built with **Tailwind CSS**, the app is fully responsive:

- On mobile devices, the map and the sidebar stack vertically.
- On larger screens, the layout adjusts to a side-by-side view for better usability.

### 4. Persistent Data with LocalStorage

The user's input is stored in the browser's **LocalStorage**, ensuring that markers and data persist even after the page is refreshed or reopened.

## Testing

Unit tests for this project are written using **Vitest**. They include basic checks for class and object construction.

## Known Issues

- No backend integration: Currently, the application stores data in LocalStorage, which might not scale for larger applications or multiple users.
- Basic error handling: Limited form validation and error handling; improvements can be made for better UX.
- No searching for places, or moving map by place name.

## Future Improvements

- **Backend Integration**: Implement a database or API to store and retrieve data.
- **Advanced Filters**: Add more filtering options (e.g., by distance, popularity).
- **Additional Tests**: Increase test coverage to include edge cases and error handling.
- **Map Search**: Search for places by name

### Conclusion

This project has been a great learning experience in working with **Leaflet**, **Tailwind CSS**, more OOP principles and **Vitest**. By building this, I gained a better understanding of creating responsive designs, handling maps with JavaScript, and writing basic tests for application logic.

---
