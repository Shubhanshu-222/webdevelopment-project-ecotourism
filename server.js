const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files
app.use('/Ecotour', express.static(path.join(__dirname, 'Ecotour'))); // Serve Ecotour folder
app.use('/frontend', express.static(path.join(__dirname, 'frontend'))); // Serve frontend folder
app.use('/assets', express.static(path.join(__dirname, 'Assets'))); // Serve Assets folder

// Endpoint to save booking data
app.post('/save-booking', (req, res) => {
    const bookingData = req.body;
    const filePath = path.join(__dirname, 'data', 'bookings.json');
    
    // Check if the file exists
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File does not exist, create it with an empty array
                console.log('File not found. Creating a new one...');
                fs.writeFile(filePath, '[]', (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing initial empty JSON file:', writeErr);
                        res.status(500).send('Error creating booking data file.');
                    } else {
                        saveBooking(bookingData, res, filePath);
                    }
                });
            } else {
                console.error('Error reading file:', err);
                res.status(500).send('Error reading booking data file.');
            }
        } else {
            let bookings = [];
            if (data && data.length > 0) {
                try {
                    bookings = JSON.parse(data); // Parse existing data
                } catch (parseErr) {
                    console.error('Error parsing JSON:', parseErr);
                    bookings = []; // Reset to empty array
                }
            }
            saveBooking(bookingData, res, filePath, bookings);
        }
    });
});

function saveBooking(bookingData, res, filePath, existingBookings = []) {
    // Add new booking data
    existingBookings.push(bookingData);
    
    // Write to file
    fs.writeFile(filePath, JSON.stringify(existingBookings,null,2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error saving booking data.');
        } else {
            res.status(200).send('Booking saved successfully!');
        }
    });
}

// Redirect to the index page in the Ecotour folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Ecotour', 'index.html')); // Explicitly send the index.html file
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Index page available at http://localhost:${port}/Ecotour/index.html`);
});