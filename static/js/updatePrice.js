document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const inputNumberElement = HSInputNumber.getInstance('#multipleInput');

    // Apply discount to all price tags
    function applyDiscountToCards() {
      const discountFactor = 0.8; // 20% off
      const priceTags = document.querySelectorAll('.price-tag');

      priceTags.forEach(tag => {
        const originalPrice = parseFloat(tag.dataset.originalPrice || tag.dataset.unitprice);
        const isMultiple = tag.closest('label')?.querySelector('input.multiple') !== null;
        const discounted = Math.round(originalPrice * (isMultiple ? 2 : 1) * discountFactor);
        tag.textContent = discounted;
        tag.dataset.unitprice = (originalPrice * discountFactor).toFixed(2);
        tag.dataset.originalPrice = originalPrice; // Store original if not stored
      });
    }

    // Restore original prices
    function resetAllPrices() {
      const priceTags = document.querySelectorAll('.price-tag');
      priceTags.forEach(tag => {
        const originalPrice = parseFloat(tag.dataset.originalPrice || tag.dataset.unitprice);
        const isMultiple = tag.closest('label')?.querySelector('input.multiple') !== null;
        const price = Math.round(originalPrice * (isMultiple ? 2 : 1));
        tag.textContent = price;
        tag.dataset.unitprice = originalPrice.toFixed(2);
      });
    }

    // Recalculate total price when quantity changes
    function updatePrice(quantity) {
      const selectedRadio = document.querySelector('input[name="membership"]:checked');
      if (!selectedRadio) return;

      const label = document.querySelector(`label[for="${selectedRadio.id}"]`);
      const priceTag = label.querySelector('.price-tag');
      const unitPrice = parseFloat(priceTag.dataset.unitprice);
      if (isNaN(unitPrice)) return;

      const totalPrice = Math.round(unitPrice * quantity);
      priceTag.textContent = totalPrice;
    }

    // Set input field value
    function updateNumberInputValue(value) {
      const quantityInput = document.querySelector('#quantityInput');
      if (quantityInput) {
        quantityInput.value = value;
      }
    }

    // Handle discount changes
    function handleDiscountState() {
      if (window.discountValid) {
        applyDiscountToCards();
      } else {
        resetAllPrices();
      }
    }

    // Watch discount code changes (discountValid toggled externally)
    document.addEventListener('discountUpdated', () => {
      handleDiscountState();
    });

    // Listen for quantity change
    if (inputNumberElement) {
      inputNumberElement.on('change', ({ inputValue }) => {
        const selectedRadio = document.querySelector('input[name="membership"]:checked');
        if (selectedRadio && selectedRadio.classList.contains('multiple')) {
          updatePrice(inputValue);
          updateNumberInputValue(inputValue);
        }
      });
    }

    // Listen for membership change
    const radios = document.querySelectorAll('input[name="membership"]');
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        const selectedRadio = document.querySelector('input[name="membership"]:checked');
        if (selectedRadio && selectedRadio.classList.contains('multiple')) {
          const inputValue = inputNumberElement?.inputValue || 2;
          updatePrice(inputValue);
          updateNumberInputValue(inputValue);
        } else {
          handleDiscountState(); // still update base price
        }
      });
    });

    // Initial setup
    handleDiscountState();
  });
});
