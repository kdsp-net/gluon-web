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
                    updateNumberInputValue(inputValue);
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

            const baseUnitPrice = parseFloat(priceTag.dataset.unitprice);
            if (isNaN(baseUnitPrice)) return;

            // Apply discount if valid
            const discountFactor = window.discountValid ? 0.8 : 1.0;
            const discountedUnitPrice = baseUnitPrice * discountFactor;
            const totalPrice = Math.round(discountedUnitPrice * quantity);

            // Update visible price
            priceTag.textContent = totalPrice;

            // Store the actual unit price in a data attribute (for consistency on submit)
            priceTag.dataset.actualUnitPrice = discountedUnitPrice.toFixed(2);
        }

        // Function to revert the price of the multiple card when it is deselected
        function resetMultipleCardPrice() {
            const multipleCardRadio = document.querySelector('input[name="membership"].multiple');
            if (multipleCardRadio) {
                const label = document.querySelector(`label[for="${multipleCardRadio.id}"]`);
                const priceTag = label.querySelector('.price-tag');
                if (priceTag) {
                    const baseUnitPrice = parseFloat(priceTag.dataset.unitprice);
                    const discountFactor = window.discountValid ? 0.8 : 1.0;
                    const totalPrice = Math.round(baseUnitPrice * discountFactor * 2); // Reset to 2x by default
                    priceTag.textContent = totalPrice;
                    priceTag.dataset.actualUnitPrice = (baseUnitPrice * discountFactor).toFixed(2);
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
                    const inputValue = inputNumberElement.inputValue || 2;
                    updatePrice(inputValue);
                    updateNumberInputValue(inputValue);
                } else {
                    resetMultipleCardPrice();
                }
            });
        });

        // Initial state: reset the price of the multiple card on page load
        resetMultipleCardPrice();
    });
});
