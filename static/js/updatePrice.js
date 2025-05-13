// updatePrice.js
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const DISCOUNT_FACTOR = 0.8; // 20% off

    // Figure out our current discount multiplier
    function getFactor() {
      return window.discountValid ? DISCOUNT_FACTOR : 1;
    }

    // Update all the cards in Step 1
    function updateAllCardPrices() {
      const qtyInput = document.getElementById('quantityInput');
      const qty = parseInt(qtyInput?.value, 10) || 1;

      document.querySelectorAll('.price-tag').forEach(tag => {
        // 1) Store original unit‐price once
        if (!tag.dataset.originalUnitPrice) {
          // reads from `data-unit-price` in your HTML
          tag.dataset.originalUnitPrice = tag.dataset.unitPrice;
        }

        const base = parseFloat(tag.dataset.originalUnitPrice);
        if (isNaN(base)) return;

        // 2) Apply discount factor
        const factor = getFactor();
        const discountedUnit = base * factor;

        // 3) Write back into dataset so form‐submit picks it up
        tag.dataset.unitPrice = discountedUnit.toFixed(2);

        // 4) Determine if this card is “multiple” and calculate display
        const isMultiple = !!tag.closest('label').querySelector('input.multiple');
        const displayQty = isMultiple ? qty : 1;
        const displayPrice = Math.round(discountedUnit * displayQty);

        // 5) Update the span’s text
        tag.textContent = displayPrice;
      });
    }

    // 🎛 Quantity widget changed?
    const hsNum = HSInputNumber.getInstance('#multipleInput');
    hsNum?.on('change', () => {
      updateAllCardPrices();
    });

    // 🎛 Plan selection changed?
    document.querySelectorAll('input[name="membership"]').forEach(radio => {
      radio.addEventListener('change', () => {
        updateAllCardPrices();
      });
    });

    // 🎛 Discount toggled?
    document.addEventListener('discountValidated', () => {
      updateAllCardPrices();
    });

    // initial run
    updateAllCardPrices();
  });
});
