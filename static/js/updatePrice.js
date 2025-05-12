// updatePrice.js
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const inputNumberElement = HSInputNumber.getInstance('#multipleInput');

    // Listen to quantity changes
    if (inputNumberElement) {
      inputNumberElement.on('change', ({ inputValue }) => {
        const selectedRadio = document.querySelector('input[name="membership"]:checked');
        if (selectedRadio && selectedRadio.classList.contains('multiple')) {
          applyPricing(inputValue);
          syncQuantityInput(inputValue);
        }
      });
    }

    // Listen to plan changes
    document.querySelectorAll('input[name="membership"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const selectedRadio = document.querySelector('input[name="membership"]:checked');
        if (selectedRadio && selectedRadio.classList.contains('multiple')) {
          // when switching back to a multiple plan, recalc for current quantity
          const qty = inputNumberElement?.inputValue || 2;
          applyPricing(qty);
          syncQuantityInput(qty);
        } else {
          // non-multiple plan: revert to base 2× pricing display on card
          resetCardPricing();
        }
      });
    });

    // Whenever discountValid flips, re-apply pricing if on multiple plan
    document.addEventListener('discountApplied', () => {
      const selectedRadio = document.querySelector('input[name="membership"]:checked');
      if (selectedRadio && selectedRadio.classList.contains('multiple')) {
        const qty = inputNumberElement?.inputValue || 2;
        applyPricing(qty);
      }
    });

    // Initial reset on load
    resetCardPricing();
  });
});

/**
 * Computes and applies both unit and total prices.
 * @param {number} quantity 
 */
function applyPricing(quantity) {
  const selectedRadio = document.querySelector('input[name="membership"]:checked');
  if (!selectedRadio) return;

  const label = document.querySelector(`label[for="${selectedRadio.id}"]`);
  const priceTag = label?.querySelector('.price-tag');
  const unitPriceDisplay = document.getElementById('unit-price');
  if (!priceTag || !unitPriceDisplay) return;

  const baseUnit = parseFloat(priceTag.dataset.unitprice);
  if (isNaN(baseUnit)) return;

  // apply discount if set
  const factor = window.discountValid ? 0.8 : 1.0;
  const discountedUnit = baseUnit * factor;
  const roundedUnit = Math.round(discountedUnit);

  // update the per-person display
  unitPriceDisplay.textContent = `€${roundedUnit}`;

  // calculate and update total on the card
  const total = Math.round(discountedUnit * quantity);
  priceTag.textContent = total;

  // save the actual unit price for submission
  priceTag.dataset.actualUnitPrice = discountedUnit.toFixed(2);
}

/** On non-multiple plans or initial load, show 2× base unit price */
function resetCardPricing() {
  const radio = document.querySelector('input[name="membership"].multiple');
  if (!radio) return;
  const label = document.querySelector(`label[for="${radio.id}"]`);
  const priceTag = label?.querySelector('.price-tag');
  const unitPriceDisplay = document.getElementById('unit-price');
  if (!priceTag || !unitPriceDisplay) return;

  const baseUnit = parseFloat(priceTag.dataset.unitprice);
  if (isNaN(baseUnit)) return;

  const factor = window.discountValid ? 0.8 : 1.0;
  const discountedUnit = baseUnit * factor;
  const roundedUnit = Math.round(discountedUnit);

  // show 2× on the card
  priceTag.textContent = roundedUnit * 2;
  unitPriceDisplay.textContent = `€${roundedUnit}`;

  priceTag.dataset.actualUnitPrice = discountedUnit.toFixed(2);
}

/** Mirror the HSInputNumber value back into the input field */
function syncQuantityInput(value) {
  const qtyInput = document.querySelector('#quantityInput');
  if (qtyInput) qtyInput.value = value;
}
