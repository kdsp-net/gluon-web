// updatePrice.js
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const DISCOUNT_FACTOR = 0.8; // 20% off

    // figure out current multiplier
    function getFactor() {
      return window.discountValid ? DISCOUNT_FACTOR : 1;
    }

    // apply the current unitPrice→data-unitprice→textContent to every card
    function applyToCards() {
      const qtyInput = document.getElementById('quantityInput');
      const qty = parseInt(qtyInput?.value, 10) || 1;

      document.querySelectorAll('.price-tag').forEach(tag => {
        // stash original unit price once
        if (!tag.dataset.originalPrice) {
          tag.dataset.originalPrice = tag.dataset.unitprice;
        }
        const base = parseFloat(tag.dataset.originalPrice);
        const factor = getFactor();
        const discountedUnit = base * factor;

        // update the dataset for form-submit to pick up
        tag.dataset.unitprice = discountedUnit.toFixed(2);

        // figure out display: multiple plans always show 2× unit on the card
        const isMultiple = !!tag.closest('label').querySelector('input.multiple');
        const displayValue = isMultiple
          ? Math.round(discountedUnit * qty)
          : Math.round(discountedUnit);

        tag.textContent = displayValue;
      });
    }

    // re-apply on:
    //  • quantity change (only Step 1 has the #multipleInput widget anyway)
    const hsNum = HSInputNumber.getInstance('#multipleInput');
    hsNum?.on('change', () => {
      applyToCards();
    });

    //  • plan selection change
    document.querySelectorAll('input[name="membership"]').forEach(radio => {
      radio.addEventListener('change', () => {
        applyToCards();
      });
    });

    //  • discount toggle
    document.addEventListener('discountUpdated', () => {
      applyToCards();
    });

    // initial
    applyToCards();
  });
});
