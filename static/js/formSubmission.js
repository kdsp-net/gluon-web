document.addEventListener('DOMContentLoaded', function () {
      // Ensure the Turnstile widget is loaded before interacting with it
    window.onload = function () {
        // Turnstile initialization
        turnstile.render('#turnstile-element', {
            sitekey: '0x4AAAAAAAjBOyA0QfcZbKoV', // Use your actual site key here
            theme: localStorage.theme, // Render turnstile in theme matching site
            callback: function (token) {
                console.log('Turnstile token:', token);
                document.getElementById('turnstile-response').value = token; // Store the token in a hidden input
                let event = new CustomEvent("turnstileVerified", { "token": token }); // Signal Turnstile validation
                document.dispatchEvent(event);
            }
        });
    };

    // Add event listener for form submission
    const form = document.querySelector('#membership_order');
    const successMessageElement = document.getElementById('success_message');
    const errorMessageElement = document.getElementById('error_message');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from actually submitting

        // Ensure the Turnstile token is available before submitting
        const turnstileToken = document.getElementById('turnstile-response').value;

        if (!turnstileToken) {
            console.error('Turnstile validation failed: no token');
            errorMessageElement.classList.remove('hidden');
            successMessageElement.classList.add('hidden');
            return;
        }

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

        // Add unit_price and total_price
        const priceTag = selectedRadio ? document.querySelector(`label[for="${selectedRadio.id}"] .price-tag`) : null;
        if (priceTag) {
            const unitPrice = parseFloat(priceTag.dataset.unitprice);
            const totalUnits = formJson['quantity'].value;
            const totalPrice = Math.round(unitPrice * totalUnits);

            formJson['unit_price'] = {
                value: unitPrice,
                type: 'number'
            };

            formJson['total_price'] = {
                value: totalPrice,
                type: 'number'
            };
        }

        // Add the Turnstile token to the form data
        formJson['turnstile_token'] = {
            value: turnstileToken,
            type: 'string'
        };

        // Send the JSON data to the worker endpoint
        fetch('https://form-to-obsidian.workers.gluon.vc/', {
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
