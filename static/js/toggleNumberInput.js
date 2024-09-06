// toggleNumberInput.js
document.addEventListener("DOMContentLoaded", function () {
    // Select all radio buttons and the input number section
    const radioButtons = document.querySelectorAll('input[name="membership"]');
    const multipleInput = document.getElementById('multipleInput');
    const numberInput = document.getElementById('quantityInput'); // Use unique ID

    if (!radioButtons.length) {
        console.error("No radio buttons found");
        return;
    }

    if (!multipleInput) {
        console.error("No multiple input element found");
        return;
    }

    if (!numberInput) {
        console.error("No number input found");
        return;
    }

    // Function to reset the visibility of all "From" tags
    function resetFromTags() {
        document.querySelectorAll('.from-tag').forEach(tag => tag.classList.remove('hidden'));
    }

    // Function to toggle the input number and "From" tag based on the selected card
    function toggleMultipleInput() {
        const selectedRadio = document.querySelector('input[name="membership"]:checked');
        if (!selectedRadio) {
            console.error("No radio button selected");
            return;
        }

        // Find the label corresponding to the selected radio button
        const label = document.querySelector(`label[for="${selectedRadio.id}"]`);
        if (!label) {
            console.error("No label found for the selected radio button");
            return;
        }

        // Reset visibility of all "From" tags before updating the current card
        resetFromTags();

        if (selectedRadio.classList.contains('multiple')) {
            // Show number input and hide "From" tag for multiple selections
            multipleInput.classList.remove('hidden');
            numberInput.value = 2; // Default value to 2 for multiple offers
            const fromTag = label.querySelector('.from-tag');
            if (fromTag) fromTag.classList.add('hidden');
        } else {
            // Hide number input and show "From" tag for non-multiple selections
            multipleInput.classList.add('hidden');
        }
    }

    // Add event listeners to all radio buttons
    radioButtons.forEach(radio => {
        radio.addEventListener('change', toggleMultipleInput);
    });

    // Run on page load to set the initial state
    toggleMultipleInput();
});
