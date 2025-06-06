// updatePrice.js
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const DISCOUNT_FACTOR = 0.5; // 50% off on premium only

    // HSInputNumber instance for the “multiple” plan
    const hsInput = HSInputNumber.getInstance('#multipleInput');

    // Mirror spinner back into the number field
    function updateNumberInputValue(val) {
      const n = document.querySelector('#quantityInput');
      if (n) n.value = val;
    }

    // Apply discount *only* to premium-membership cards
    function applyDiscountToUnits() {
      document.querySelectorAll('.price-tag').forEach(tag => {
        // stash original unit price once
        if (!tag.dataset.originalPrice) {
          tag.dataset.originalPrice = tag.dataset.unitprice;
        }
        const base = parseFloat(tag.dataset.originalPrice);
        if (isNaN(base)) return;

        // figure out whether this card is the premium plan
        const label = tag.closest('label');
        const planId = label?.getAttribute('for');
        const isPremium = planId === 'premium-membership';

        // choose factor: only discount if window.discountValid AND this is premium
        const factor = (window.discountValid && isPremium)
          ? DISCOUNT_FACTOR
          : 1.0;

        // compute discounted unit price
        const discUnit = base * factor;
        tag.dataset.unitprice = discUnit.toFixed(2);

        // update displayed price: single→1×, multiple→2×
        const isMulti = !!label.querySelector('input.multiple');
        const display = Math.round(discUnit * (isMulti ? 2 : 1));
        tag.textContent = display;
      });
    }

    // your original quantity‐based logic for the “multiple” card
    function updatePrice(quantity) {
      const sel = document.querySelector('input[name="membership"]:checked');
      if (!sel || !sel.classList.contains('multiple')) return;

      const label = document.querySelector(`label[for="${sel.id}"]`);
      const tag = label?.querySelector('.price-tag');
      if (!tag) return;

      const unit = parseFloat(tag.dataset.unitprice);
      if (isNaN(unit)) return;

      tag.textContent = Math.round(unit * quantity);
    }

    function resetMultipleCardPrice() {
      const sel = document.querySelector('input[name="membership"].multiple');
      if (!sel) return;

      const label = document.querySelector(`label[for="${sel.id}"]`);
      const tag = label?.querySelector('.price-tag');
      if (!tag) return;

      const unit = parseFloat(tag.dataset.unitprice);
      if (isNaN(unit)) return;

      tag.textContent = Math.round(unit * 2);
    }

    // hook up events

    // spinner change
    if (hsInput) {
      hsInput.on('change', ({ inputValue }) => {
        updatePrice(inputValue);
        updateNumberInputValue(inputValue);
      });
    }

    // plan selection change
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

    // discount toggle — only refresh premiums
    document.addEventListener('discountValidated', () => {
      applyDiscountToUnits();
      // reapply qty logic for multiple plans
      const sel = document.querySelector('input[name="membership"]:checked');
      if (sel && sel.classList.contains('multiple')) {
        const qty = hsInput?.inputValue || 2;
        updatePrice(qty);
      } else {
        resetMultipleCardPrice();
      }
    });

    // initial run
    applyDiscountToUnits();
    resetMultipleCardPrice();
  });
});
