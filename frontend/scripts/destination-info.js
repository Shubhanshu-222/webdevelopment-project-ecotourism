// Tab switching functionality for .destination-page
const destinationPage = document.querySelector('.destination-page');
const tabs = destinationPage.querySelectorAll('.tab-btn');
const tabContents = destinationPage.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tabId = tab.getAttribute('data-tab');
        tabContents.forEach(content => {
            if (content.id === `tab-${tabId}`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});

// Accordion toggle functionality for .destination-page
const accordionButtons = destinationPage.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        button.classList.toggle('active');
        if (content) {
            content.classList.toggle('active');
        }
    });
});

// Form submission
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if the user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('Please log in before submitting the form.');
        document.getElementById('login-popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        return;
    }

    // Collect form data
    const formData = {
        name: document.getElementById('booking-name').value.trim(), // Added trim to remove extra whitespace
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        travelDate: document.getElementById('travel-date').value,
        travelCount: document.getElementById('travel-count').value.trim(),
        message: document.getElementById('message').value.trim() // Added trim to ensure no leading/trailing spaces
    };

    // Send form data to the server
    fetch('http://localhost:3000/save-booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save booking data');
        }
        return response.text(); // Assuming server returns plain text response
    })
    .then(result => {
        alert(result); // Show server response
        document.getElementById('booking-form').reset(); // Reset the form on success
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving booking data.');
    });
});

// Submit Button disable functionality and fields error handling

const form = document.getElementById('booking-form');
const submitButton = document.getElementById('submit-btn');

const errorMessages = {
    'booking-name': "Name should only contain letters and spaces, with a minimum of 3 characters.",
    'email': "Please enter a valid email address.",
    'phone': "Phone number must be exactly 10 digits without spaces or special characters.",
    'travel-date': "The travel date must be today or a future date.",
    'travel-count': "Please enter a number between 1 and 10.",
    'message': "Message can be up to 250 characters."
};

// Function to validate a field and display errors
function validateField(field) {
    const errorDiv = document.getElementById(`${field.id}-error`);
    if (field.checkValidity()) {
        errorDiv.style.display = "none"; // Hide the error message if valid
        errorDiv.textContent = "";
    } else {
        errorDiv.style.display = "block"; // Show the error message if invalid
        errorDiv.textContent = errorMessages[field.id];
    }
}

// Function to check form validity and enable/disable the submit button
function checkFormValidity() {
    const inputs = form.querySelectorAll('input, textarea');
    let formIsValid = true;

    inputs.forEach(input => {
        if (input.validity.touched || input.value.trim() !== "") {
            validateField(input); // Only validate touched or non-empty fields
            if (!input.checkValidity()) {
                formIsValid = false;
            }
        }
    });

    submitButton.disabled = !formIsValid;
}

// Add event listeners to fields
const inputs = form.querySelectorAll('input, textarea');
inputs.forEach(input => {
    // Mark field as touched on blur
    input.addEventListener('blur', () => {
        validateField(input); // Validate the field when it loses focus
    });

    // Validate field on input
    input.addEventListener('input', () => {
        validateField(input); // Revalidate on input
        checkFormValidity(); // Check overall form validity
    });
});

// Initial form validation check without showing errors
checkFormValidity();

