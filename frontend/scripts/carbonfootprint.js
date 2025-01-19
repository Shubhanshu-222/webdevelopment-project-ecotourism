// JavaScript for interactivity and calculations
document.addEventListener('DOMContentLoaded', function () {
    const flightTab = document.getElementById('flight-tab');
    const carTab = document.getElementById('car-tab');
    const boatTab = document.getElementById('boat-tab');
    const calculateBtn = document.getElementById('calculate-btn');
    const carbonResult = document.getElementById('carbon-result');

    let selectedMode = 'flight';

    flightTab.addEventListener('click', function () {
        selectedMode = 'flight';
        setActiveTab(flightTab);
    });

    carTab.addEventListener('click', function () {
        selectedMode = 'car';
        setActiveTab(carTab);
    });

    boatTab.addEventListener('click', function () {
        selectedMode = 'boat';
        setActiveTab(boatTab);
    });

    function setActiveTab(tab) {
        flightTab.classList.remove('active');
        carTab.classList.remove('active');
        boatTab.classList.remove('active');
        tab.classList.add('active');
    }

    calculateBtn.addEventListener('click', function () {
        const tripType = document.querySelector('input[name="trip-type"]:checked').value;
        const tripOption = document.getElementById('trip-type').value;
        const passengers = parseInt(document.getElementById('passengers').value);
        const travelClass = document.getElementById('class').value;
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;

        // Fetch coordinates for the locations
        Promise.all([
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${from}`).then(response => response.json()),
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${to}`).then(response => response.json())
        ]).then(locations => {
            if (locations[0].length > 0 && locations[1].length > 0) {
                const fromLocation = locations[0][0];
                const toLocation = locations[1][0];

                const fromCoords = [fromLocation.lat, fromLocation.lon];
                const toCoords = [toLocation.lat, toLocation.lon];

                // Calculate distance using Haversine formula
                const distance = calculateDistance(fromCoords, toCoords);

                let carbonFootprint = 0;

                if (selectedMode === 'flight') {
                    const emissionFactor = travelClass === 'economy' ? 0.15 : 0.25; // kg CO2 per mile
                    carbonFootprint = distance * emissionFactor * passengers;
                } else if (selectedMode === 'car') {
                    const emissionFactor = 0.411; // kg CO2 per mile
                    carbonFootprint = distance * emissionFactor * passengers;
                } else if (selectedMode === 'boat') {
                    const emissionFactor = 0.3; // kg CO2 per mile
                    carbonFootprint = distance * emissionFactor * passengers;
                }

                carbonResult.innerHTML = `
                             <div class="result-item">
        <i class="fas fa-map-marker-alt icon"></i>
        <div>
            <span class="label">From:</span>
            <span class="value">${from}</span>
        </div>
    </div>
    <div class="result-item">
        <i class="fas fa-map-marker-alt icon"></i>
        <div>
            <span class="label">To:</span>
            <span class="value">${to}</span>
        </div>
    </div>
    <div class="result-item">
        <i class="fas fa-road icon"></i>
        <div>
            <span class="label">Distance:</span>
            <span class="value">${distance.toFixed(2)} kilometers</span>
        </div>
    </div>
    <div class="result-item">
        <i class="fas fa-users icon"></i>
        <div>
            <span class="label">Passengers:</span>
            <span class="value">${passengers}</span>
        </div>
    </div>
    <div class="result-item">
        <i class="fas fa-cogs icon"></i>
        <div>
            <span class="label">Class:</span>
            <span class="value">${travelClass}</span>
        </div>
    </div>
    <div class="result-item">
        <i class="fas fa-leaf icon"></i>
        <div>
            <span class="label">Your estimated carbon footprint is:</span>
            <span class="value">${carbonFootprint.toFixed(2)} kg CO2</span>
        </div>
    </div>
                        `;
            } else {
                carbonResult.innerHTML = `<p>Unable to find locations. Please check your input.</p>`;
            }
        });
    });

    function calculateDistance(coords1, coords2) {
        const R = 6371; // Radius of the Earth in kilometers
        const lat1 = coords1[0] * Math.PI / 180;
        const lon1 = coords1[1] * Math.PI / 180;
        const lat2 = coords2[0] * Math.PI / 180;
        const lon2 = coords2[1] * Math.PI / 180;

        const dlat = lat2 - lat1;
        const dlon = lon2 - lon1;

        const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dlon / 2) * Math.sin(dlon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }
});