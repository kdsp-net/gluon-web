document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('load', function () {

        // Get the HSStepper instance
        const stepper      = HSStepper.getInstance('[data-hs-stepper]');
        const nextButton   = document.querySelector('[data-hs-stepper-next-btn]');
        const backButton   = document.querySelector('[data-hs-stepper-back-btn]');
        const finishButton = document.querySelector('[data-hs-stepper-finish-btn]');
        const radios       = document.querySelectorAll('input[name="membership"]');
        const form         = document.getElementById('membership_order');
        
        // Initially disable the Next and Finish buttons
        nextButton.disabled   = true;
        finishButton.disabled = true;

        // Scroll back to top of form on step nav
        function scrollUp() {
            form.scrollIntoView({ behavior: 'smooth' });
        }

        // Check if Turnstile has a token
        function isTurnstileValid() {
            return !!document.getElementById('turnstile-response')?.value;
        }

        // ---- STEP 1 ----
        function handleCardSelection() {
            const sel = document.querySelector('input[name="membership"]:checked');
            nextButton.disabled = !(sel && stepper.currentIndex === 1);
        }

        // ---- STEP 2 ----
        function handleFormValidation() {
            if (stepper.currentIndex !== 2) return;
            let allValid = true;
            document.querySelectorAll('#step-2 input[required]').forEach(field => {
                removeErrorOutline(field);
                let ok = field.value.trim() !== '';
                if (ok && field.type === 'email') ok = validateEmail(field.value);
                if (ok && field.type === 'tel')   ok = validateTel(field.value);
                if (!ok && field.value.trim() !== '') addErrorOutline(field);
                allValid = allValid && ok;
            });
            nextButton.disabled = !allValid;
        }

        // ---- STEP 3 ----
        function updateSummary() {
            document.querySelectorAll('#step-2 input').forEach(f => {
                const out = document.getElementById(`summary_${f.id}`);
                if (out) out.textContent = f.value || '--';
            });
        }

        function validateConsents() {
            const allChecked = Array.from(document.querySelectorAll('#step-3 input[type="checkbox"][required]'))
                                    .every(c=>c.checked);
            finishButton.disabled = !(allChecked && isTurnstileValid());
        }

        function updateTotal() {
            const sel = document.querySelector('input[name="membership"]:checked');
            if (!sel) return;
            const label = document.querySelector(`label[for="${sel.id}"]`);
            const priceTag = label.querySelector('.price-tag');
            const qty = sel.classList.contains('multiple')
                      ? HSInputNumber.getInstance('#multipleInput').inputValue
                      : 1;
            const unit  = parseFloat(priceTag.dataset.unitprice);
            const total = unit * qty;

            document.getElementById('total_units').textContent = qty;
            document.getElementById('total_plan' ).textContent = `${label.querySelector('h3').textContent} membership`;
            document.getElementById('unit_price').textContent   = unit;
            document.getElementById('total_price').textContent  = Math.round(total);
        }

        // ---- COMMON LISTENERS ----
        nextButton  .addEventListener('click', scrollUp);
        backButton  .addEventListener('click', scrollUp);
        finishButton.addEventListener('click', scrollUp);

        radios.forEach(radio => radio.addEventListener('change', () => {
            handleCardSelection();
            if (stepper.currentIndex === 3) updateTotal();
        }));

        document.querySelectorAll('#step-2 input[required]').forEach(input => {
            input.addEventListener('input', handleFormValidation);
            input.addEventListener('blur',  handleFormValidation);
        });

        document.querySelectorAll('#step-3 input[type="checkbox"][required]').forEach(cb => {
            cb.addEventListener('change', validateConsents);
        });

        // When Turnstile fires its event, re-run consents check
        document.addEventListener('turnstileVerified', validateConsents);

        // When discount code is applied, refresh totals (this event comes from validateDiscount.js)
        document.addEventListener('discountUpdated', () => {
            // recalc card prices is handled by updatePrice.js
            if (stepper.currentIndex === 3) updateTotal();
        });

        // Hook into Preline's stepper events
        ['active','next','back'].forEach(evt =>
            stepper.on(evt, () => {
                if (stepper.currentIndex === 1) handleCardSelection();
                if (stepper.currentIndex === 2) handleFormValidation();
                if (stepper.currentIndex === 3) {
                    updateSummary();
                    updateTotal();
                    validateConsents();
                }
            })
        );

        // Initial run based on currentIndex
        if (stepper.currentIndex === 1) handleCardSelection();
        if (stepper.currentIndex === 2) handleFormValidation();
        if (stepper.currentIndex === 3) {
            updateSummary();
            updateTotal();
            validateConsents();
        }
    });
});

// Utility functions
function addErrorOutline(el)    { el.classList.replace('text-text','text-red-500'); }
function removeErrorOutline(el) { el.classList.replace('text-red-500','text-text'); }
function validateEmail(v)       { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v); }
function validateTel(v)         { return /^[+]?[(]?[0-9]{1,4}[)]?[-\\s./0-9]*$/.test(v); }
