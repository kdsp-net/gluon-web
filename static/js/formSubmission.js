document.addEventListener('DOMContentLoaded', function () {
    // Add event listener for form submission
    const form = document.querySelector('#membership_order');
    const successMessageElement = document.getElementById('success_message');
    const errorMessageElement = document.getElementById('error_message');

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

            // Ensure we only process elements with a name
            if (name) {
                if (type === 'checkbox') {
                    formJson[name] = {
                        value: checked,
                        type: type
                    };
                } else if (type === 'radio') {
                    if (checked) {
                        formJson[name] = {
                            value: value,
                            type: type
                        };
                    }
                } else {
                    formJson[name] = {
                        value: value,
                        type: type
                    };
                }
            }
        });

        // Handle the case for multiple cards and quantity
        if (isMultiple) {
            const quantityInput = document.querySelector('#multipleInput input[type="number"]');
            formJson['quantity'] = {
                value: quantityInput ? quantityInput.value : '1',
                type: 'number'
            };
        } else {
            // For non-multiple, set quantity to 1
            formJson['quantity'] = {
                value: '1',
                type: 'number'
            };
        }

        // Send the JSON data to the worker endpoint
        fetch('https://form2obsidian.disruptivebros.workers.dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formJson)
        })
        .then(response => {
            if (response.ok) {
                // On success, show the success message and hide the error message
                successMessageElement.classList.remove('hidden');
                errorMessageElement.classList.add('hidden');
            } else {
                // On failure, show the error message and hide the success message
                successMessageElement.classList.add('hidden');
                errorMessageElement.classList.remove('hidden');
            }
        })
        .catch(error => {
            // On fetch error, show the error message and hide the success message
            successMessageElement.classList.add('hidden');
            errorMessageElement.classList.remove('hidden');
        });
    });
});
