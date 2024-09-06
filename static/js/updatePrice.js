document.addEventListener('DOMContentLoaded', function () {
    // Wait for Preline's autoInit to finish (or hook into it)
    window.addEventListener('load', function () {
        console.log('Preline autoInit completed');

        // Get the HSInputNumber instance for the input number element
        const inputNumberElement = HSInputNumber.getInstance('#multipleInput');

        if (inputNumberElement) {
            console.log('HSInputNumber instance found for #multipleInput');
            inputNumberElement.on('change', ({ inputValue }) => {
                console.log('Input number changed to:', inputValue);
                updatePrice(inputValue);
            });
        } else {
            console.error('HSInputNumber instance not found for #multipleInput');
        }

        function updatePrice(quantity) {
            console.log('Running updatePrice with quantity:', quantity);

            const selectedRadio = document.querySelector('input[name="membership"]:checked');
            if (!selectedRadio) {
                console.error('No radio button selected');
                return;
            }

            const label = document.querySelector(`label[for="${selectedRadio.id}"]`);
            if (!label) {
                console.error('No label found for the selected radio button');
                return;
            }

            const priceTag = label.querySelector('.price-tag');
            if (!priceTag) {
                console.error('No price tag found on selected card');
                return;
            }

            const unitPrice = parseFloat(priceTag.dataset.unitprice);
            if (isNaN(unitPrice)) {
                console.error('Invalid unit price');
                return;
            }

            const totalPrice = Math.round(unitPrice * quantity);
            priceTag.textContent = totalPrice;
            console.log(`Updated price to: €${totalPrice}`);
        }
    });
});
