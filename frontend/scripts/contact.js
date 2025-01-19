function sendMail() {
    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic form validation
    if (!name || !email || !message) {
        alert('Please fill in all the fields.');
        return;
    }

    // Prepare email data
    const emailData = {
        to: 'support@ecotour.com',
        subject: 'Contact Form Submission',
        body: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
        `,
    };

    // Sending email via Fetch API (for server-side processing)
    fetch('sendEmail.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Your message has been sent successfully!');
            document.getElementById('contactForm').reset(); // Clear form fields
        } else {
            alert('There was an error sending your message. Please try again later.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
}
