// Function to add a new row for the Travel Log table
function addTravelLogRow() {
    const tableBody = document.getElementById('travel-log-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="From"></td>
        <td><input type="text" placeholder="To"></td>
        <td>
            <select>
                <option value="flight">Flight</option>
                <option value="car">Car</option>
                <option value="boat">Boat</option>
            </select>
        </td>
        <td class="distance">0</td>
        <td>
            <select>
                <option value="round-trip">Round Trip</option>
                <option value="one-way">One Way</option>
                <option value="multi-city">Multi City</option>
            </select>
        </td>
        <td>
            <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </td>
        <td>
            <select>
                <option value="Economy">Economy</option>
                <option value="Premium">Premium</option>
            </select>
        </td>
        <td class="carbon-footprint">0</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;
    tableBody.appendChild(newRow);
}

// Function to calculate distance using OpenStreetMap's Nominatim API and Leaflet
function calculateDistance(from, to, callback) {
    const urlFrom = `https://nominatim.openstreetmap.org/search?format=json&q=${from}`;
    fetch(urlFrom)
        .then(response => response.json())
        .then(dataFrom => {
            if (dataFrom.length === 0) {
                alert(`Unable to find the location for "${from}"`);
                callback(0);
                return;
            }

            const fromLat = parseFloat(dataFrom[0].lat);
            const fromLon = parseFloat(dataFrom[0].lon);

            const urlTo = `https://nominatim.openstreetmap.org/search?format=json&q=${to}`;
            fetch(urlTo)
                .then(response => response.json())
                .then(dataTo => {
                    if (dataTo.length === 0) {
                        alert(`Unable to find the location for "${to}"`);
                        callback(0);
                        return;
                    }

                    const toLat = parseFloat(dataTo[0].lat);
                    const toLon = parseFloat(dataTo[0].lon);

                    const fromPoint = L.latLng(fromLat, fromLon);
                    const toPoint = L.latLng(toLat, toLon);
                    const distance = fromPoint.distanceTo(toPoint) / 1000; // Convert to kilometers

                    callback(distance);
                })
                .catch(err => {
                    console.error('Error calculating "to" location:', err);
                    callback(0);
                });
        })
        .catch(err => {
            console.error('Error calculating "from" location:', err);
            callback(0);
        });
}

// Function to calculate the carbon footprint for the travel log
function calculateTravelLogFootprint() {
    const rows = document.querySelectorAll('#travel-log-body tr');
    rows.forEach(row => {
        const from = row.querySelector('td:nth-child(1) input').value;
        const to = row.querySelector('td:nth-child(2) input').value;
        const mode = row.querySelector('td:nth-child(3) select').value;
        const passengers = parseInt(row.querySelector('td:nth-child(6) select').value);
        const travelClass = row.querySelector('td:nth-child(7) select').value;

        calculateDistance(from, to, (distance) => {
            row.querySelector('.distance').textContent = distance.toFixed(2);

            let emissionFactor;
            if (mode === 'flight') {
                emissionFactor = travelClass === 'Economy' ? 0.115 : 0.230;
            } else if (mode === 'car') {
                emissionFactor = 0.120; 
            } else if (mode === 'boat') {
                emissionFactor = 0.250; 
            }

            const carbonFootprint = (distance * emissionFactor) / passengers;
            row.querySelector('.carbon-footprint').textContent = carbonFootprint.toFixed(2);
        });
    });
}

// Function to calculate the carbon footprint for the travel itinerary
function calculateTravelItineraryFootprint() {
    const rows = document.querySelectorAll('#travel-itinerary-body tr');
    rows.forEach(row => {
        const from = row.querySelector('td:nth-child(1) input').value;
        const to = row.querySelector('td:nth-child(2) input').value;
        const mode = row.querySelector('td:nth-child(3) select').value;
        const passengers = parseInt(row.querySelector('td:nth-child(6) select').value);
        const travelClass = row.querySelector('td:nth-child(7) select').value;

        calculateDistance(from, to, (distance) => {
            row.querySelector('.distance').textContent = distance.toFixed(2);

            let emissionFactor;
            if (mode === 'flight') {
                emissionFactor = travelClass === 'Economy' ? 0.115 : 0.230;
            } else if (mode === 'car') {
                emissionFactor = 0.120;
            } else if (mode === 'boat') {
                emissionFactor = 0.250;
            }

            const carbonFootprint = (distance * emissionFactor) / passengers;
            row.querySelector('.carbon-footprint').textContent = carbonFootprint.toFixed(2);
        });
    });
}

// Function to add a new row for the Travel Itinerary table
function addTravelItineraryRow() {
    const tableBody = document.getElementById('travel-itinerary-body');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="From"></td>
        <td><input type="text" placeholder="To"></td>
        <td>
            <select>
                <option value="flight">Flight</option>
                <option value="car">Car</option>
                <option value="boat">Boat</option>
            </select>
        </td>
        <td class="distance">0</td>
        <td>
            <select>
                <option value="round-trip">Round Trip</option>
                <option value="one-way">One Way</option>
                <option value="multi-city">Multi City</option>
            </select>
        </td>
        <td>
            <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </td>
        <td>
            <select>
                <option value="Economy">Economy</option>
                <option value="Premium">Premium</option>
            </select>
        </td>
        <td class="carbon-footprint">0</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;
    tableBody.appendChild(newRow);
}

// Function to delete a row from the Travel Log or Travel Itinerary
function deleteRow(button) {
    const row = button.closest('tr');
    row.remove();
}
