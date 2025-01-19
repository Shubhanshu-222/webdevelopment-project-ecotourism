// Book Now function depending on the selection
function navigateToBooking() {
    const activeTitle = document.getElementById("active-destination-title").textContent;

    // Find the destination across all sections
    let selectedDestination = null;
    let sectionKey = null;

    // Loop through each section to find the destination
    for (let section in destinations) {
        selectedDestination = destinations[section].find(dest => dest.title === activeTitle);
        if (selectedDestination) {
            sectionKey = section;
            break;
        }
    }

    // Determine the booking link, or use the default
    const bookingLink = selectedDestination ? selectedDestination.bookingLink : "../Ecotour/default-destination.html";

    // Redirect to the determined link
    window.location.href = bookingLink;
}

// Function to set the active destination
function setActiveDestination(destinationTitle, section) {
    // Check the appropriate section for the destination
    const selectedDestination = destinations[section].find(dest => dest.title === destinationTitle);

    // Update UI elements
    document.getElementById("active-destination-title").textContent = selectedDestination ? selectedDestination.title : "Default Destination";
    document.getElementById("active-destination-description").textContent = selectedDestination ? selectedDestination.description : "Explore exciting destinations.";
    document.getElementById("active-destination-img").src = selectedDestination ? selectedDestination.img : "../Assets/Destinations/nature/default.png";

    // Show the Book Now button
    document.getElementById("book-now-button").style.display = "block";
}

// Example: Set a specific destination from a section
setActiveDestination("Sanjay Gandhi National Park", "wildlife");