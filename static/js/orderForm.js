document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {

        // Get the HSStepper instance
        const stepper = HSStepper.getInstance('[data-hs-stepper]');
        const nextButton = document.querySelector('[data-hs-stepper-next-btn]');
        const finishButton = document.querySelector('[data-hs-stepper-finish-btn]');
        const radioButtons = document.querySelectorAll('input[name="membership"]');
        
        // Initially disable the Next and Finish buttons
        nextButton.disabled = true;
        finishButton.disabled = true;

        // Function to check Turnstile validation
        function isTurnstileValid() {
            const turnstileToken = document.getElementById('turnstile-response')?.value;
            return !!turnstileToken;
        }

        // Step 1: Enable "Next" button when a card is selected
        function handleCardSelection() {
            const selectedRadio = document.querySelector('input[name="membership"]:checked');
            
            if (selectedRadio && stepper.currentIndex === 1) {
                nextButton.disabled = false;
            } else {
                nextButton.disabled = true;
            }
        }

        // Step 2: Enable "Next" button when all required fields are filled and valid
        function handleFormValidation() {
            if (stepper.currentIndex === 2) {
                const formFields = document.querySelectorAll('#step-2 input[required]');
                let allValid = true;

                formFields.forEach(field => {
                    const fieldType = field.getAttribute('type');
                    
                    removeErrorOutline(field);
                    
                    let isValid = true;
                    if (fieldType === 'email') {
                        isValid = validateEmail(field.value);
                    } else if (fieldType === 'tel') {
                        isValid = validateTel(field.value);
                    } else {
                        isValid = field.value.trim() !== '';
                    }

                    if (!isValid && field.value !== '') {
                        addErrorOutline(field);
                    }

                    allValid = isValid && allValid;
                });

                nextButton.disabled = !allValid;
            }
        }

        // Task 1: Update the Summary in Step 3
        function updateSummary() {
            const formFields = document.querySelectorAll('#step-2 input');
            formFields.forEach(field => {
                const summaryElement = document.getElementById(`summary_${field.id}`);
                if (summaryElement) {
                    summaryElement.textContent = field.value || '--';
                }
            });
        }

        // Task 2: Validate required consents in Step 3
        function validateConsents() {
            const consentCheckboxes = document.querySelectorAll('#step-3 input[type="checkbox"][required]');
            let allChecked = true;

            consentCheckboxes.forEach(checkbox => {
                if (!checkbox.checked) {
                    allChecked = false;
                }
            });

            finishButton.disabled = !(allChecked && isTurnstileValid());  // Ensure consents and Turnstile validation
        }

        // Task 3: Update the Total Section
        function updateTotal() {
            const selectedRadio = document.querySelector('input[name="membership"]:checked');
            const totalUnitsElement = document.getElementById('total_units');
            const totalPlanElement = document.getElementById('total_plan');
            const unitPriceElement = document.getElementById('unit_price');
            const totalPriceElement = document.getElementById('total_price');

            if (!selectedRadio) return;

            const label = document.querySelector(`label[for="${selectedRadio.id}"]`);
            const priceTag = label.querySelector('.price-tag');
            const h3Element = label.querySelector('h3');
            
            const isMultiple = selectedRadio.classList.contains('multiple');
            const unitPrice = parseFloat(priceTag.dataset.unitprice);
            const quantity = isMultiple ? HSInputNumber.getInstance('#multipleInput').inputValue : 1;
            const totalPrice = unitPrice * quantity;

            // Update the total section values
            totalUnitsElement.textContent = quantity;
            totalPlanElement.textContent = `${h3Element.textContent} membership`;
            unitPriceElement.textContent = unitPrice;
            totalPriceElement.textContent = Math.round(totalPrice);
        }

        // Add event listeners for Step 1 (radio selection)
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function () {
                handleCardSelection();
                if (stepper.currentIndex === 3) {
                    updateTotal();
                }
            });
        });

        // Add event listeners for form validation in Step 2
        const formInputs = document.querySelectorAll('#step-2 input[required]');
        formInputs.forEach(input => {
            input.addEventListener('input', handleFormValidation);
            input.addEventListener('blur', handleFormValidation); 
        });

        // Add event listeners for consents in Step 3
        const consentCheckboxes = document.querySelectorAll('#step-3 input[type="checkbox"][required]');
        consentCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', validateConsents);
        });

        // Function to handle step changes and update summary/total
        function handleStepChange() {
            if (stepper.currentIndex === 1) {
                handleCardSelection();
            } else if (stepper.currentIndex === 2) {
                handleFormValidation();
            } else if (stepper.currentIndex === 3) {
                updateSummary();
                updateTotal();
                validateConsents();
            }
        }

        // Add event listener for turnstile validation
        document.addEventListener("turnstileVerified", function() {
            validateConsents();
        });

        // Hook into Preline's stepper events
        stepper.on('active', function () {
            handleStepChange();
        });

        stepper.on('next', function () {
            handleStepChange();
        });

        stepper.on('back', function () {
            handleStepChange();
        });

        // On page load, check the initial state of the stepper and update button state
        handleStepChange();
    });
});

// Utility functions for validation and styling
function addErrorOutline(field) {
    field.classList.remove('text-text', 'dark:text-darkmode-text');
    field.classList.add('text-red-500', 'dark:text-red-500');
}

function removeErrorOutline(field) {
    field.classList.remove('text-red-500', 'dark:text-red-500');
    field.classList.add('text-text', 'dark:text-darkmode-text');
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateTel(phone) {
    const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    return phonePattern.test(phone);
}
