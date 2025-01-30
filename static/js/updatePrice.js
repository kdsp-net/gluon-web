document.addEventListener('DOMContentLoaded', function () {
    // Wait for Preline's autoInit to finish
    window.addEventListener('load', function () {
        // Get the HSInputNumber instance for the input number element
        const inputNumberElement = HSInputNumber.getInstance('#multipleInput');

        if (inputNumberElement) {
            inputNumberElement.on('change', ({ inputValue }) => {
                // Only update the price if the multiple card is selected
                const selectedRadio = document.querySelector('input[name="membership"]:checked');
                if (selectedRadio && selectedRadio.classList.contains('multiple')) {
                    updatePrice(inputValue);
                    updateNumberInputValue(inputValue); // Update the number input field with the correct value
                }
            });
        }

        // Function to update the price when the quantity changes
        function updatePrice(quantity) {
            const selectedRadio = document.querySelector('input[name="membership"]:checked');
            if (!selectedRadio) return;

            const label = document.querySelector(`label[for="${selectedRadio.id}"]`);
            if (!label) return;

            const priceTag = label.querySelector('.price-tag');
            if (!priceTag) return;

            const unitPrice = parseFloat(priceTag.dataset.unitprice);
            if (isNaN(unitPrice)) return;

            const totalPrice = Math.round(unitPrice * quantity);
            priceTag.textContent = totalPrice;
        }

        // Function to revert the price of the multiple card when it is deselected
        function resetMultipleCardPrice() {
            const multipleCardRadio = document.querySelector('input[name="membership"].multiple');
            if (multipleCardRadio) {
                const label = document.querySelector(`label[for="${multipleCardRadio.id}"]`);
                const priceTag = label.querySelector('.price-tag');
                if (priceTag) {
                    const unitPrice = parseFloat(priceTag.dataset.unitprice);
                    priceTag.textContent = Math.round(unitPrice * 2); // Revert to 2x unit price
                }
            }
        }

        // Function to update the number input value in the DOM
        function updateNumberInputValue(value) {
            const quantityInput = document.querySelector('#quantityInput');
            if (quantityInput) {
                quantityInput.value = value;
            }
        }

        // Listen for changes to the selected radio buttons
        const radioButtons = document.querySelectorAll('input[name="membership"]');
        radioButtons.forEach((radio) => {
            radio.addEventListener('change', function () {
                const selectedRadio = document.querySelector('input[name="membership"]:checked');
                if (selectedRadio && selectedRadio.classList.contains('multiple')) {
                    const inputValue = inputNumberElement.inputValue || 2; // Default to 2 if no value
                    updatePrice(inputValue);
                    updateNumberInputValue(inputValue); // Ensure the input field shows the correct value
                } else {
                    resetMultipleCardPrice();
                }
            });
        });

        // Initial state: reset the price of the multiple card on page load
        resetMultipleCardPrice();
    });
});