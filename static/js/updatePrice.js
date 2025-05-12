document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const inputNumberElement = HSInputNumber.getInstance('#multipleInput');

    // Apply discount to all cards
    function applyDiscountToAllCards() {
      const discount = window.discountValid === true ? 0.8 : 1;

      document.querySelectorAll('.price-tag').forEach(tag => {
        const basePrice = parseFloat(tag.dataset.originalUnitprice || tag.dataset.unitprice);
        if (!tag.dataset.originalUnitprice) {
          tag.dataset.originalUnitprice = tag.dataset.unitprice; // Save original
        }

        const discountedPrice = basePrice * discount;
        tag.dataset.unitprice = discountedPrice.toFixed(2);
        
        const radioInput = tag.closest('label').previousElementSibling;
        const isMultiple = radioInput && radioInput.classList.contains('multiple');
        const multiplier = isMultiple ? 2 : 1;

        tag.textContent = Math.round(discountedPrice * multiplier);
      });
    }

    // Update total price display in Step 3
    function updateTotalSummary() {
      const selectedRadio = document.querySelector('input[name="membership"]:checked');
      if (!selectedRadio) return;

      const label = document.querySelector(`label[for="${selectedRadio.id}"]`);
      const priceTag = label.querySelector('.price-tag');
      const h3Element = label.querySelector('h3');

      const isMultiple = selectedRadio.classList.contains('multiple');
      const unitPrice = parseFloat(priceTag.dataset.unitprice);
      const quantity = isMultiple ? HSInputNumber.getInstance('#multipleInput').inputValue : 1;
      const totalPrice = unitPrice * quantity;

      document.getElementById('total_units').textContent = quantity;
      document.getElementById('total_plan').textContent = `${h3Element.textContent} membership`;
      document.getElementById('unit_price').textContent = unitPrice.toFixed(2);
      document.getElementById('total_price').textContent = Math.round(totalPrice);
    }

    function updateNumberInputValue(value) {
      const quantityInput = document.querySelector('#quantityInput');
      if (quantityInput) {
        quantityInput.value = value;
      }
    }

    function handleQuantityChange(inputValue) {
      applyDiscountToAllCards();
      updateNumberInputValue(inputValue);
      updateTotalSummary();
    }

    if (inputNumberElement) {
      inputNumberElement.on('change', ({ inputValue }) => {
        handleQuantityChange(inputValue);
      });
    }

    document.querySelectorAll('input[name="membership"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const selectedRadio = document.querySelector('input[name="membership"]:checked');
        if (selectedRadio && selectedRadio.classList.contains('multiple')) {
          const inputValue = inputNumberElement.inputValue || 2;
          handleQuantityChange(inputValue);
        } else {
          applyDiscountToAllCards();
          updateTotalSummary();
        }
      });
    });

    // Watch for discount changes
    const observer = new MutationObserver(() => {
      applyDiscountToAllCards();
      updateTotalSummary();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initialize on page load
    applyDiscountToAllCards();
    updateTotalSummary();
  });
});
