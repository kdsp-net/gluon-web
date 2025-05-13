document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const DISCOUNT_FACTOR = 0.8; // 20% off

    // Returns 1.0 or DISCOUNT_FACTOR based on window.discountValid
    function getFactor() {
      return window.discountValid ? DISCOUNT_FACTOR : 1.0;
    }

    // 1) Update every card's price-tag (step 1)
    function updateAllCardPrices() {
      document.querySelectorAll('.price-tag').forEach(tag => {
        // store original unit price once
        if (!tag.dataset.originalPrice) {
          tag.dataset.originalPrice = tag.dataset.unitprice;
        }
        const base = parseFloat(tag.dataset.originalPrice);
        const factor = getFactor();
        const discountedUnit = Math.round(base * factor);

        // update the span content & data-unitprice
        tag.textContent = tag.closest('label').querySelector('input.multiple')
          ? discountedUnit * 2
          : discountedUnit;
        tag.dataset.unitprice = discountedUnit;
      });
    }

    // 2) Update the summary in step 3 (#unit_price, #total_price, #total_units)
    function updateStepperSummary() {
      const selected = document.querySelector('input[name="membership"]:checked');
      if (!selected) return;

      const unitPrice = parseFloat(
        document
          .querySelector(`label[for="${selected.id}"] .price-tag`)
          .dataset.unitprice
      );
      const qty = selected.classList.contains('multiple')
        ? parseInt(document.getElementById('quantityInput').value, 10) || 1
        : 1;

      // unit & total
      document.getElementById('unit_price').textContent = unitPrice;
      document.getElementById('total_price').textContent = unitPrice * qty;
      document.getElementById('total_units').textContent = qty;

      // plan name
      const planName = document.querySelector(`label[for="${selected.id}"] h3`)
        .textContent;
      document.getElementById('total_plan').textContent = `${planName} membership`;
    }

    // 3) Call both together
    function refreshPricing(qtyChanged = false) {
      updateAllCardPrices();
      updateStepperSummary();
    }

    // Quantity changes (step 1 multiple input)
    const hsNum = HSInputNumber.getInstance('#multipleInput');
    if (hsNum) {
      hsNum.on('change', ({ inputValue }) => {
        refreshPricing(true);
      });
    }

    // Plan selection changes
    document
      .querySelectorAll('input[name="membership"]')
      .forEach(radio =>
        radio.addEventListener('change', () => {
          refreshPricing();
        })
      );

    // Discount applied event
    document.addEventListener('discountValidated', () => {
      refreshPricing();
    });

    // Initial run
    refreshPricing();
  });
});
