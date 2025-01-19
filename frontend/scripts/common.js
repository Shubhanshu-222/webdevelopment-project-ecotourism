document.addEventListener('DOMContentLoaded', function () {


    document.getElementById('signup-popup').style.display = 'none';
    document.getElementById('login-popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    // Toggle dropdown
    document.querySelector('.account-menu .btn-login').addEventListener('click', function () {
        var dropdown = document.querySelector('.account-menu .dropdown-content');
        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    });

    // Show login popup
    document.getElementById('sign-in-link').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('login-popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    });

    // Show signup popup
    document.getElementById('sign-up-link').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('signup-popup').style.display = 'flex';
        document.getElementById('overlay').style.display = 'block';
    });

    // Close login popup
    document.getElementById('close-login-btn').addEventListener('click', function () {
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    // Close signup popup
    document.getElementById('close-signup-btn').addEventListener('click', function () {
        document.getElementById('signup-popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    // Close popups if the overlay is clicked
    document.getElementById('overlay').addEventListener('click', function () {
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('signup-popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });


    //login,signup, logout functionality
   
    const loginPopup = document.getElementById('login-popup');
    const signupPopup = document.getElementById('signup-popup');
    const overlay = document.getElementById('overlay');

      // Check if a user is logged in (exists in localStorage)
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

      // If a user is logged in, update the UI
      if (loggedInUser) {
          updateAccountUI(loggedInUser);
      }

    // Function to close popups
    function closePopups() {
        loginPopup.style.display = 'none';
        signupPopup.style.display = 'none';
        overlay.style.display = 'none';
    }

    function updateAccountUI(user) {
        console.log('Updating UI with user:', user);

        // Update the "My Account" button to show the logged-in user's name
        const accountButton = document.querySelector('.account-menu .btn-login');
        accountButton.innerText = `Welcome, ${user.name}`; // Show the user's name

        // Update the dropdown to show the logout option
        const dropdownContent = document.querySelector('.account-menu .dropdown-content');
        dropdownContent.innerHTML = `<a href="#" id="logout-link">Logout</a>`; // Show logout option

        // Add logout functionality
        document.getElementById('logout-link').addEventListener('click', function (event) {
            event.preventDefault();
            logoutUser(); // Call the logout function
        });

        // Hide the login and signup links in the dropdown
        document.getElementById('sign-in-link').style.display = 'none';
        document.getElementById('sign-up-link').style.display = 'none';
    }

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login successful!");
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            closePopups();
            updateAccountUI(user);// Update UI with the user's name
        } else {
            alert("Invalid email or password.");
        }

        document.getElementById('login-form').reset();
    });

    // Handle signup form submission
    document.getElementById('signup-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.email === email)) {
            alert('This email is already registered.');
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        

        alert('Signup successful!');
        updateAccountUI(newUser); // Update UI with the new user's name
        
    });

    // Handle logout
    function logoutUser() {
        // Clear the logged-in user from localStorage
        localStorage.removeItem('loggedInUser');

        // Reset the "My Account" button to its default state
        const accountButton = document.querySelector('.account-menu .btn-login');
        accountButton.innerText = 'My Account'; // Reset to default text

        // Reset the dropdown to show login and signup options
        const dropdownContent = document.querySelector('.account-menu .dropdown-content');
        dropdownContent.innerHTML = `
            <a href="#" id="sign-in-link">Sign in</a>
            <a href="#" id="sign-up-link">Sign up</a>
        `;

        // Re-attach event listeners to the login and signup links
        document.getElementById('sign-in-link').addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById('login-popup').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        });

        document.getElementById('sign-up-link').addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById('signup-popup').style.display = 'flex';
            document.getElementById('overlay').style.display = 'block';
        });

        // Hide the overlay and popups
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('signup-popup').style.display = 'none';
        document.getElementById('login-form').reset();
        document.getElementById('signup-form').reset();
    }



    // Close the login popup when clicking on the close button
    document.getElementById('close-login-btn').addEventListener('click', closePopup);

    // Function to close the popup
    function closePopup() {
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('signup-popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }

    // Show signup popup from login popup
    document.getElementById('signup-link-from-login').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('login-popup').style.display = 'none';
        document.getElementById('signup-popup').style.display = 'flex';
    });

    // Show login popup from signup popup
    document.getElementById('login-link-from-signup').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('signup-popup').style.display = 'none';
        document.getElementById('login-popup').style.display = 'block';
    });

    // Optionally, handle Google sign-in (if using Google login)
    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('Google ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    }
});
