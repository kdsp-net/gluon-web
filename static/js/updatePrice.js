document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const discountFactor = 0.8;

    function applyDiscountIfValid(price) {
      return window.discountValid ? Math.round(price * discountFactor) : price;
    }

    function updateAllCardPrices() {
      document.querySelectorAll('.price-tag').forEach(tag => {
        const original = parseFloat(tag.dataset.originalPrice || tag.dataset.unitprice);
        if (!tag.dataset.originalPrice) {
          tag.dataset.originalPrice = original; // store once
        }

        const newPrice = applyDiscountIfValid(original);

        tag.dataset.unitprice = newPrice;
        tag.textContent = tag.closest('input.multiple') ? Math.round(newPrice * 2) : newPrice;
      });
    }

    function updateStepperSummary() {
      const selectedRadio = document.querySelector('input[name="membership"]:checked');
      if (!selectedRadio) return;

      const priceTag = document.querySelector(`label[for="${selectedRadio.id}"] .price-tag`);
      if (!priceTag) return;

      const unitPrice = parseFloat(priceTag.dataset.unitprice);
      const quantity = selectedRadio.classList.contains('multiple')
        ? parseInt(document.querySelector('#quantityInput')?.value || 2)
        : 1;

      document.getElementById('unit_price').textContent = unitPrice;
      document.getElementById('total_price').textContent = Math.round(unitPrice * quantity);
      document.getElementById('total_units').textContent = quantity;

      const planName = document.querySelector(`label[for="${selectedRadio.id}"] h3`)?.textContent || '--';
      document.getElementById('total_plan').textContent = `${planName} membership`;
    }

    function handleQuantityChange() {
      updateAllCardPrices();
      updateStepperSummary();
    }

    // Quantity change handler
    const quantityInput = HSInputNumber.getInstance('#multipleInput');
    if (quantityInput) {
      quantityInput.on('change', ({ inputValue }) => {
        handleQuantityChange();
      });
    }

    // Membership change handler
    document.querySelectorAll('input[name="membership"]').forEach(radio => {
      radio.addEventListener('change', () => {
        handleQuantityChange();
      });
    });

    // Discount code validated
    document.addEventListener('discountValidated', () => {
      updateAllCardPrices();
      updateStepperSummary();
    });

    // On page load
    updateAllCardPrices();
  });
});
