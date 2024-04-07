
addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener("submit", function(event){
        event.preventDefault(); // Prevent default form submission behavior
        if (event.submitter.id === 'cal') {
            // Calculate total logic
            calPricePerGallon();
        } else if (event.submitter.id === 'save') {
            // Save quote logic
            submitForm();
        }
    });
 });

//function to submit Form
async function submitForm() {
    // event.preventDefault(); // Prevent default form submission
    console.log("Submitting the form...");
    // Get form data
    const gallons = document.getElementById('gallons').value;
    const deliveryAddress = document.getElementById('delivery-address').value;
    const deliveryDate = document.getElementById('delivery-date').value;
    // const pricePerGallon = document.getElementById('price-per-gallon').value; //this is filled by backend, not from user

    // Send form data to server
    const response = await fetch('http://localhost:3000/submitQuote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ gallons, deliveryAddress, deliveryDate, pricePerGallon})
        body: JSON.stringify({ gallons, deliveryAddress, deliveryDate})
    });

    if (response.ok) {
        alert('Quote submitted successfully');
        // Optionally, redirect user to another page
        // window.location.href = 'success.html';
    } else {
        alert('Failed to submit quote. Please try again.');
    }
}

// document.querySelector('form').addEventListener('submit', submitForm);

//function to cal price per gallon
async function calPricePerGallon()  {
    
    console.log("Calculating suggested price per gallon and total amount...");
    try {
        const response = await fetch(`http://localhost:3000/submitQuote`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const price = await response.json();
    const pricePerGallon = price.price;
    const galreq = document.querySelector("#gallons").value;
    total = price.price * galreq;
    document.getElementById('price-per-gallon').value= `$${pricePerGallon.toFixed(2)}`;
    document.getElementById('total-amount-due').value= `$${total.toFixed(2)}`;
    } catch(error){
        console.log(error);
    };
}

