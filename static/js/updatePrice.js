// updatePrice.js
document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    const DISCOUNT_FACTOR = 0.5; // 50% off when discountValid is true
    const qtyInputNumber = HSInputNumber.getInstance('#multipleInput');
    const radios = document.querySelectorAll('input[name="membership"]');

    // Return 1.0 or DISCOUNT_FACTOR
    function getFactor() {
      return window.discountValid ? DISCOUNT_FACTOR : 1.0;
    }

    // 1) Recompute & render every card's price-tag
    function renderAllCardPrices() {
      document.querySelectorAll('.price-tag').forEach(tag => {
        // stash original unit price the first time
        if (!tag.dataset.originalPrice) {
          tag.dataset.originalPrice = tag.dataset.unitprice;
        }

        const base = parseFloat(tag.dataset.originalPrice);
        const factor = getFactor();
        const unit = base * factor;

        // is this card "multiple"?
        const label = tag.closest('label');
        const isMulti = label.querySelector('input.multiple') !== null;

        // quantity only matters for a multiple card
        let displayVal = isMulti
          ? Math.round(unit * (qtyInputNumber?.inputValue || 2))
          : Math.round(unit);

        // update both text and the dataset for downstream logic
        tag.textContent = displayVal;
        tag.dataset.unitprice = unit.toFixed(2);
      });
    }

    // 2) On quantity change: re-render ALL cards (to pick up discount), but only the multiple one actually moves
    if (qtyInputNumber) {
      qtyInputNumber.on('change', ({ inputValue }) => {
        renderAllCardPrices();
      });
    }

    // 3) On plan change: re-render ALL cards (so the single vs multiple switch resets properly)
    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        renderAllCardPrices();
      });
    });

    // 4) When discount is toggled elsewhere (e.g. your validateDiscount.js fires 'discountValidated'):
    document.addEventListener('discountValidated', () => {
      renderAllCardPrices();
    });

    // 5) Initial render
    renderAllCardPrices();
  });
});
