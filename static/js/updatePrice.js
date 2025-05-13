// updatePrice.js
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const DISCOUNT_FACTOR = 0.8; // 20% off
    const stepper = HSStepper.getInstance('[data-hs-stepper]');

    // Helper: are we discounted?
    function getFactor() {
      return window.discountValid ? DISCOUNT_FACTOR : 1.0;
    }

    // 1) Adjust the on-card price-tags (only on Step 1)
    function updateAllCardPrices() {
      document.querySelectorAll('.price-tag').forEach(tag => {
        if (!tag.dataset.originalPrice) {
          tag.dataset.originalPrice = tag.dataset.unitprice;
        }
        const base = parseFloat(tag.dataset.originalPrice);
        const unit = Math.round(base * getFactor());
        const isMultiple = !!tag.closest('label').querySelector('input.multiple');
        // display “2× unit” or “1× unit”
        tag.textContent = isMultiple ? unit * 2 : unit;
        // leave dataset.unitprice alone
      });
    }

    // 2) Update the step-3 summary block (only on Step 3)
    function updateStepperSummary() {
      const sel = document.querySelector('input[name="membership"]:checked');
      if (!sel) return;

      const tag = document.querySelector(`label[for="${sel.id}"] .price-tag`);
      if (!tag) return;

      const unit = parseInt(tag.textContent, 10) / (sel.classList.contains('multiple') ? 2 : 1);
      const qty  = sel.classList.contains('multiple')
        ? parseInt(document.getElementById('quantityInput').value, 10) || 1
        : 1;

      document.getElementById('unit_price').textContent  = unit;
      document.getElementById('total_units').textContent = qty;
      document.getElementById('total_price').textContent = unit * qty;

      const planName = document.querySelector(`label[for="${sel.id}"] h3`).textContent;
      document.getElementById('total_plan').textContent = `${planName} membership`;
    }

    // 3) Dispatch to the right updater based on current step
    function refreshPricing() {
      if (stepper.currentIndex === 1) {
        updateAllCardPrices();
      }
      if (stepper.currentIndex === 3) {
        updateStepperSummary();
      }
    }

    // Recalc whenever quantity, plan or discount changes:
    const numInst = HSInputNumber.getInstance('#multipleInput');
    numInst?.on('change', refreshPricing);
    document.querySelectorAll('input[name="membership"]').forEach(r => {
      r.addEventListener('change', refreshPricing);
    });
    document.addEventListener('discountValidated', refreshPricing);

    // Also hook into the stepper’s own events so moving between steps runs it:
    stepper.on('active',  refreshPricing);
    stepper.on('next',    refreshPricing);
    stepper.on('back',    refreshPricing);

    // Initial
    refreshPricing();
  });
});
