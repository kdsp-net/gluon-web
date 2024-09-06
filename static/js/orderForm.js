document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {

        // Get the HSStepper instance
        const stepper = HSStepper.getInstance('[data-hs-stepper]');
        const nextButton = document.querySelector('[data-hs-stepper-next-btn]');
        const radioButtons = document.querySelectorAll('input[name="membership"]');
        
        // Initially disable the Next button
        nextButton.disabled = true;

        // Step 1: Enable "Next" button when a card is selected
        function handleCardSelection() {
            const selectedRadio = document.querySelector('input[name="membership"]:checked');
            
            if (selectedRadio && stepper.currentIndex === 1) { // Adjusted for currentIndex starting at 1
                // Enable the Next button in step 1
                nextButton.disabled = false;
            } else {
                nextButton.disabled = true; // If no card is selected, keep Next button disabled
            }
        }

        // Step 2: Enable "Next" button when all required fields are filled and valid
        function handleFormValidation() {
            if (stepper.currentIndex === 2) { // Ensure we're checking step 2 form fields
                const formFields = document.querySelectorAll('#step-2 input[required]');
                let allValid = true;

                formFields.forEach(field => {
                    const fieldType = field.getAttribute('type');
                    
                    // Remove previous error classes if any
                    removeErrorOutline(field);

                    // Check the field based on its type
                    let isValid = true;
                    if (fieldType === 'email') {
                        isValid = validateEmail(field.value);
                    } else if (fieldType === 'text') {
                        isValid = field.value.trim() !== '';
                    } else if (fieldType === 'number') {
                        isValid = validateNumber(field);
                    } else if (fieldType === 'tel') {
                        isValid = validateTel(field.value); // Validate phone numbers
                    } else if (fieldType === 'checkbox') {
                        isValid = field.checked;
                    } else {
                        isValid = field.value.trim() !== '';
                    }

                    if (!isValid && field.value !== '') { // Only add the outline for fields that have been filled out
                        addErrorOutline(field);
                    }

                    // Only set to false if the field is invalid
                    allValid = isValid && allValid;
                });

                // Enable/Disable the next button based on validation
                nextButton.disabled = !allValid;
            }
        }

        // Function to add red outline to invalid fields
        function addErrorOutline(field) {
            field.classList.remove('text-text', 'dark:text-darkmode-text');
            field.classList.add('text-red-500', 'dark:text-red-500');
        }

        // Function to remove red outline from fields
        function removeErrorOutline(field) {
            field.classList.remove('text-red-500', 'dark:text-red-500');
            field.classList.add('text-text', 'dark:text-darkmode-text');
        }

        // Function to validate email input
        function validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }

        // Function to validate number input
        function validateNumber(field) {
            const value = parseFloat(field.value);
            const min = field.getAttribute('min');
            const max = field.getAttribute('max');

            if (isNaN(value)) return false; // Ensure value is a number
            if (min && value < min) return false; // Ensure value meets minimum requirement
            if (max && value > max) return false; // Ensure value meets maximum requirement

            return true; // If all checks pass, return true
        }

        // Function to validate phone number input
        function validateTel(phone) {
            const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/; // Simple regex for phone numbers
            return phonePattern.test(phone);
        }

        // Function to handle button state based on current step
        function handleStepChange() {
            if (stepper.currentIndex === 1) {
                // Step 1: Disable Next button until a card is selected
                handleCardSelection();
            } else if (stepper.currentIndex === 2) {
                // Step 2: Validate form fields and enable/disable Next button
                handleFormValidation();
            }
        }

        // Add event listeners to radio buttons for step 1
        radioButtons.forEach(radio => {
            radio.addEventListener('change', handleCardSelection);
        });

        // Add event listeners to form inputs for step 2
        const formInputs = document.querySelectorAll('#step-2 input[required]');
        formInputs.forEach(input => {
            input.addEventListener('input', handleFormValidation);
            input.addEventListener('blur', handleFormValidation); // Validate on blur
        });

        // Hook into Preline's stepper events
        // Listen for stepper events to handle step changes dynamically
        stepper.on('active', function () {
            handleStepChange(); // Update button state when step becomes active
        });

        stepper.on('beforeNext', function () {
            handleStepChange(); // Check before moving to the next step
        });

        stepper.on('next', function () {
            handleStepChange(); // Check when the next step is reached
        });

        stepper.on('back', function () {
            handleStepChange(); // Handle when the back button is clicked
        });

        // On page load, check the initial state of the stepper and update button state
        handleStepChange();
    });
});
