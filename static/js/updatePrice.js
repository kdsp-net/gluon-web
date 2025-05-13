// updatePrice.js
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const inputNumberInstance = HSInputNumber.getInstance('#multipleInput');
    const priceTags = document.querySelectorAll('.price-tag');
    const unitPriceEl = document.getElementById('unit-price');

    // Store every tag's original unit price once
    priceTags.forEach(tag => {
      if (!tag.dataset.originalUnitprice) {
        tag.dataset.originalUnitprice = tag.dataset.unitprice;
      }
    });

    // Helper: discount factor
    function discountFactor() {
      return window.discountValid ? 0.8 : 1.0; // 20% off if flag set
    }

    // Compute & apply prices for a given quantity on the selected card
    function refreshPricing(quantity = 1) {
      const sel = document.querySelector('input[name="membership"]:checked');
      if (!sel) return;

      // Find the .price-tag inside its label
      const tag   = document.querySelector(`label[for="${sel.id}"] .price-tag`);
      const orig  = parseFloat(tag.dataset.originalUnitprice);
      if (isNaN(orig)) return;

      // Unit after discount
      const unit  = Math.round(orig * discountFactor());
      // Total = unit × quantity
      const total = Math.round(unit * quantity);

      // Update the on-card total
      tag.textContent = total;
      // Also update the "per person" display in the quantity block
      if (unitPriceEl) {
        unitPriceEl.textContent = `€${unit}`;
      }
    }

    // When you switch plans, or toggle discount, we need to recalc
    function fullRefresh() {
      // For multiple plans, use current quantity; otherwise qty=1
      const sel = document.querySelector('input[name="membership"]:checked');
      const qty = sel?.classList.contains('multiple')
        ? (inputNumberInstance?.inputValue || 2)
        : 1;
      refreshPricing(qty);
    }

    // Listen to quantity changes
    if (inputNumberInstance) {
      inputNumberInstance.on('change', ({ inputValue }) => {
        const sel = document.querySelector('input[name="membership"]:checked');
        if (sel?.classList.contains('multiple')) {
          refreshPricing(inputValue);
        }
      });
    }

    // Listen to plan (card) changes
    document.querySelectorAll('input[name="membership"]').forEach(radio => {
      radio.addEventListener('change', fullRefresh);
    });

    // Listen to your discount-validated event
    document.addEventListener('discountUpdated', fullRefresh);

    // Initial run
    fullRefresh();
  });
});
