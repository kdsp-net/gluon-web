// updatePrice.js
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const DISCOUNT_FACTOR = 0.8; // 20% off

    // Grab the HSInputNumber instance for multiple plans
    const hsInput = HSInputNumber.getInstance('#multipleInput');

    // 1) Helpers

    // Are we discounted right now?
    function getFactor() {
      return window.discountValid ? DISCOUNT_FACTOR : 1.0;
    }

    // Mirror spinner value back into text input
    function updateNumberInputValue(val) {
      const n = document.querySelector('#quantityInput');
      if (n) n.value = val;
    }

    // 2) Apply discount to *unit* prices of all cards
    function applyDiscountToUnits() {
      document.querySelectorAll('.price-tag').forEach(tag => {
        // Store original unit price once
        if (!tag.dataset.originalPrice) {
          tag.dataset.originalPrice = tag.dataset.unitprice;
        }
        const base = parseFloat(tag.dataset.originalPrice);
        if (isNaN(base)) return;

        // Compute discounted unit price
        let discUnit = base * getFactor();
        // Save it for later calculations
        tag.dataset.unitprice = discUnit.toFixed(2);

        // Now update the *displayed* price:
        // - single card: just discUnit
        // - multiple card: discUnit * 2 (we revert to default 2× on reset or selection)
        const isMulti = !!tag.closest('label').querySelector('input.multiple');
        const display = Math.round(discUnit * (isMulti ? 2 : 1));
        tag.textContent = display;
      });
    }

    // 3) Original qty logic for "multiple" plan
    function updatePrice(quantity) {
      const sel = document.querySelector('input[name="membership"]:checked');
      if (!sel || !sel.classList.contains('multiple')) return;

      const label = document.querySelector(`label[for="${sel.id}"]`);
      const tag = label?.querySelector('.price-tag');
      if (!tag) return;

      let unit = parseFloat(tag.dataset.unitprice);
      if (isNaN(unit)) return;

      const total = Math.round(unit * quantity);
      tag.textContent = total;
    }

    function resetMultipleCardPrice() {
      const sel = document.querySelector('input[name="membership"].multiple');
      if (!sel) return;

      const label = document.querySelector(`label[for="${sel.id}"]`);
      const tag = label?.querySelector('.price-tag');
      if (!tag) return;

      const unit = parseFloat(tag.dataset.unitprice);
      if (isNaN(unit)) return;

      // default is 2× unit
      tag.textContent = Math.round(unit * 2);
    }

    // 4) Hook up events

    // Quantity spinner change
    if (hsInput) {
      hsInput.on('change', ({ inputValue }) => {
        updatePrice(inputValue);
        updateNumberInputValue(inputValue);
      });
    }

    // Plan selection change
    document.querySelectorAll('input[name="membership"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const sel = document.querySelector('input[name="membership"]:checked');
        if (sel && sel.classList.contains('multiple')) {
          const qty = hsInput?.inputValue || 2;
          updatePrice(qty);
          updateNumberInputValue(qty);
        } else {
          resetMultipleCardPrice();
        }
      });
    });

    // Discount toggled
    document.addEventListener('discountValidated', () => {
      applyDiscountToUnits();
      // reapply the right display for current selection
      const sel = document.querySelector('input[name="membership"]:checked');
      if (sel && sel.classList.contains('multiple')) {
        const qty = hsInput?.inputValue || 2;
        updatePrice(qty);
      } else {
        resetMultipleCardPrice();
      }
    });

    // Initial run
    applyDiscountToUnits();
    resetMultipleCardPrice();
  });
});
