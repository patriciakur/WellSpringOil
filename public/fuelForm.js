async function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const gallons = document.getElementById('gallons').value;
    const deliveryAddress = document.getElementById('delivery-address').value;
    const deliveryDate = document.getElementById('delivery-date').value;
    const pricePerGallon = document.getElementById('price-per-gallon').value;

    // Send form data to server
    const response = await fetch('http://localhost:3000/submitQuote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gallons, deliveryAddress, deliveryDate, pricePerGallon})
    });

    if (response.ok) {
        alert('Quote submitted successfully');
        // Optionally, redirect user to another page
        // window.location.href = 'success.html';
    } else {
        alert('Failed to submit quote. Please try again.');
    }
}

document.querySelector('form').addEventListener('submit', submitForm);