document.addEventListener('DOMContentLoaded', function () {
    // Add event listener for form submission
    const form = document.querySelector('#membership_order');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from actually submitting

        // Create an object to hold the form data
        const formJson = {};

        // Get all form elements
        const formElements = form.querySelectorAll('input, select, textarea');
        
        // Get the selected membership card
        const selectedRadio = document.querySelector('input[name="membership"]:checked');
        const isMultiple = selectedRadio && selectedRadio.classList.contains('multiple');

        // Loop through each element and add it to the formJson object
        formElements.forEach(element => {
            const { name, type, value, checked } = element;

            // Ensure we only process elements with a name (ignore buttons and others)
            if (name) {
                if (type === 'checkbox') {
                    formJson[name] = checked; // Store checkbox state as boolean
                } else if (type === 'radio') {
                    if (checked) {
                        formJson[name] = value; // Store value of checked radio button
                    }
                } else {
                    formJson[name] = value; // Store value of other inputs
                }
            }
        });

        // Handle the case for multiple cards and quantity
        let quantity = 1;
        if (isMultiple) {
            const quantityInput = document.querySelector('#multipleInput input[type="number"]');
            quantity = quantityInput ? parseInt(quantityInput.value, 10) : 1; // Use the value from input, default to 1
        }

        // Get the unit price from the selected card
        const label = document.querySelector(`label[for="${selectedRadio.id}"]`);
        const priceTag = label.querySelector('.price-tag');
        const unitPrice = parseFloat(priceTag.dataset.unitprice); // Get unit price from data attribute

        // Calculate total price
        const totalPrice = unitPrice * quantity;

        // Add quantity, unit price, and total price to formJson
        formJson['quantity'] = quantity.toString();
        formJson['unit_price'] = unitPrice.toFixed(2); // Format the unit price to 2 decimal places
        formJson['total_price'] = totalPrice.toFixed(2); // Format the total price to 2 decimal places

        // Debugging: Check what data is being sent
        console.log('Form Data:', formJson);

        // Send the JSON data to the Cloudflare Worker
        fetch('https://form2obsidian.disruptivebros.workers.dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formJson),
        })
        .then(response => response.json()) // If the worker responds with JSON
        .then(data => {
            console.log('Worker response:', data);
            alert('Form submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an issue submitting the form.');
        });
    });
});
