// updatePrice.js
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const DISCOUNT_FACTOR = 0.5; // e.g. 50% off

    const inputNumberElement = HSInputNumber.getInstance('#multipleInput');

    // Helper: get the active factor (1.0 or DISCOUNT_FACTOR)
    function getFactor() {
      return window.discountValid ? DISCOUNT_FACTOR : 1.0;
    }

    // Update a single card's display price based on unit, factor, and qty
    function updatePrice(quantity) {
      const selectedRadio = document.querySelector('input[name="membership"]:checked');
      if (!selectedRadio) return;

      const label = document.querySelector(`label[for="${selectedRadio.id}"]`);
      if (!label) return;

      const priceTag = label.querySelector('.price-tag');
      if (!priceTag) return;

      let unitPrice = parseFloat(priceTag.dataset.unitprice);
      if (isNaN(unitPrice)) return;

      // apply discount factor
      const factor = getFactor();
      unitPrice = unitPrice * factor;

      // compute total
      let totalPrice = unitPrice * quantity;
      totalPrice = Math.round(totalPrice);

      priceTag.textContent = totalPrice;
    }

    // Reset the "multiple" card back to base * 2 (with discount factor applied)
    function resetMultipleCardPrice() {
      const multipleCardRadio = document.querySelector('input[name="membership"].multiple');
      if (!multipleCardRadio) return;

      const label = document.querySelector(`label[for="${multipleCardRadio.id}"]`);
      const priceTag = label.querySelector('.price-tag');
      if (!priceTag) return;

      let unitPrice = parseFloat(priceTag.dataset.unitprice);
      if (isNaN(unitPrice)) return;

      // apply discount factor
      const factor = getFactor();
      unitPrice = unitPrice * factor;

      // 2× for multiple
      const display = Math.round(unitPrice * 2);
      priceTag.textContent = display;
    }

    // Mirror HSInputNumber back into the actual number input
    function updateNumberInputValue(value) {
      const quantityInput = document.querySelector('#quantityInput');
      if (quantityInput) {
        quantityInput.value = value;
      }
    }

    // When quantity spinner changes
    if (inputNumberElement) {
      inputNumberElement.on('change', ({ inputValue }) => {
        updatePrice(inputValue);
        updateNumberInputValue(inputValue);
      });
    }

    // When user selects a plan
    document.querySelectorAll('input[name="membership"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const selected = document.querySelector('input[name="membership"]:checked');
        if (selected && selected.classList.contains('multiple')) {
          const qty = inputNumberElement?.inputValue || 2;
          updatePrice(qty);
          updateNumberInputValue(qty);
        } else {
          resetMultipleCardPrice();
        }
      });
    });

    // If you re-validate discount (e.g. dispatchEvent('discountValidated')), you can reapply immediately:
    document.addEventListener('discountValidated', () => {
      const selected = document.querySelector('input[name="membership"]:checked');
      if (selected && selected.classList.contains('multiple')) {
        const qty = inputNumberElement?.inputValue || 2;
        updatePrice(qty);
      } else {
        resetMultipleCardPrice();
      }
    });

    // Initial setup
    resetMultipleCardPrice();
  });
});
