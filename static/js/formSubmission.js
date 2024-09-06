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
                let inputType = type || 'text'; // Default type is 'text' if type is not defined
                if (type === 'checkbox') {
                    formJson[name] = {
                        value: checked, // Store checkbox state as boolean
                        type: inputType
                    };
                } else if (type === 'radio') {
                    if (checked) {
                        formJson[name] = {
                            value: value,
                            type: inputType
                        };
                    }
                } else {
                    formJson[name] = {
                        value: value,
                        type: inputType
                    };
                }
            }
        });

        // Handle the case for multiple cards and quantity
        if (isMultiple) {
            const quantityInput = document.querySelector('#multipleInput input[type="number"]');
            formJson['quantity'] = {
                value: quantityInput ? quantityInput.value : '1', // If multiple, use the value from input, otherwise default to 1
                type: 'number'
            };
        } else {
            // For non-multiple, set quantity to 1
            formJson['quantity'] = {
                value: '1',
                type: 'number'
            };
        }

        // Debugging: Check what data is being sent
        console.log('Form Data:', formJson);

        // Send the JSON data to the webhook URL
        fetch('https://form2obsidian.disruptivebros.workers.dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formJson)
        })
        .then(response => {
            if (response.ok) {
                alert('Form submitted successfully');
            } else {
                alert('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
