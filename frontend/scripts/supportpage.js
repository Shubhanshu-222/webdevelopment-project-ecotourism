function sendMail() {
    const selectedQueries = Array.from(document.querySelectorAll('input[name="query"]:checked'))
        .map(checkbox => checkbox.value)
        .join(', ');

    if (selectedQueries.length === 0) {
        alert('Please select at least one query.');
        return;
    }

    const mailtoLink = `mailto:events.at.vjti@gmail.com?subject=Support%20Query&body=${encodeURIComponent(selectedQueries)}`;
    window.location.href = mailtoLink;
}