// updatePrice.js
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    // Grab the Preline number-input instance
    const inputNumberInstance = HSInputNumber.getInstance('#multipleInput');

    // Apply pricing logic to the selected card
    function applyPricing(quantity) {
      const selectedRadio = document.querySelector('input[name="membership"]:checked');
      if (!selectedRadio) return;

      const label    = document.querySelector(`label[for="${selectedRadio.id}"]`);
      const priceTag = label?.querySelector('.price-tag');
      if (!priceTag) return;

      // Base unit price from data-attribute
      const baseUnit = parseFloat(priceTag.dataset.unitprice);
      if (isNaN(baseUnit)) return;

      // Apply discount if valid
      const factor = window.discountValid ? 0.8 : 1.0;
      const finalUnitPrice = baseUnit * factor;

      // Round unit price and compute total
      const roundedUnit = Math.round(finalUnitPrice);
      const totalPrice  = Math.round(finalUnitPrice * quantity);

      // Update the card display
      priceTag.textContent         = totalPrice;
      priceTag.dataset.unitprice   = finalUnitPrice.toFixed(2);
      // Also mirror back into the number input if needed
      const qtyInput = document.getElementById('quantityInput');
      if (qtyInput) qtyInput.value = quantity;
    }

    // Revert to base pricing (2×) when non-multiple selected
    function resetMultipleCardPrice() {
      const multipleRadio = document.querySelector('input[name="membership"].multiple');
      if (!multipleRadio) return;

      const label    = document.querySelector(`label[for="${multipleRadio.id}"]`);
      const priceTag = label?.querySelector('.price-tag');
      if (!priceTag) return;

      const baseUnit = parseFloat(priceTag.dataset.unitprice);
      if (isNaN(baseUnit)) return;

      const factor = window.discountValid ? 0.8 : 1.0;
      const finalUnitPrice = baseUnit * factor;
      const roundedUnit    = Math.round(finalUnitPrice);

      // Show 2× this price
      priceTag.textContent       = roundedUnit * 2;
      priceTag.dataset.unitprice = finalUnitPrice.toFixed(2);
    }

    // Whenever discount state changes, recalc for whichever plan is active
    function handleDiscountUpdate() {
      const selectedRadio = document.querySelector('input[name="membership"]:checked');
      if (selectedRadio?.classList.contains('multiple')) {
        const qty = inputNumberInstance?.inputValue || 2;
        applyPricing(qty);
      } else {
        resetMultipleCardPrice();
      }
    }

    // Listen for quantity changes
    if (inputNumberInstance) {
      inputNumberInstance.on('change', ({ inputValue }) => {
        applyPricing(inputValue);
      });
    }

    // Listen for plan changes
    document.querySelectorAll('input[name="membership"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const sel = document.querySelector('input[name="membership"]:checked');
        if (sel.classList.contains('multiple')) {
          const qty = inputNumberInstance?.inputValue || 2;
          applyPricing(qty);
        } else {
          resetMultipleCardPrice();
        }
      });
    });

    // Re-run on your custom discount event
    document.addEventListener('discountUpdated', handleDiscountUpdate);

    // Initial setup
    resetMultipleCardPrice();
  });
});
