// updatePrice.js
document.addEventListener('DOMContentLoaded', () => {
  // Recalculate only the summary (Step 3) unit & total price
  function recalcSummary() {
    const selected = document.querySelector('input[name="membership"]:checked');
    if (!selected) return;

    // Figure out quantity
    const isMultiple = selected.classList.contains('multiple');
    const qty = isMultiple
      ? (HSInputNumber.getInstance('#multipleInput')?.inputValue || 1)
      : 1;

    // Grab the base unit price from the card's data-unit-price
    const label = document.querySelector(`label[for="${selected.id}"]`);
    const tag = label?.querySelector('.price-tag');
    const baseUnit = tag ? parseFloat(tag.dataset.unitprice) : NaN;
    if (isNaN(baseUnit)) return;

    // Apply discount factor if valid
    const factor = window.discountValid ? 0.8 : 1.0;
    const unit = Math.round(baseUnit * factor);
    const total = unit * qty;

    // Update the summary spans
    document.getElementById('unit_price').textContent = unit;
    document.getElementById('total_units').textContent = qty;
    document.getElementById('total_price').textContent = total;

    // (Re-sync plan name in case needed)
    const planName = label.querySelector('h3')?.textContent || '';
    document.getElementById('total_plan').textContent = `${planName} membership`;
  }

  // When discount is validated (or cleared), rerun the summary calc
  document.addEventListener('discountValidated', recalcSummary);

  // Also recalc when user navigates into step 3
  // (so if they applied discount before, it shows immediately)
  const stepper = HSStepper.getInstance('[data-hs-stepper]');
  stepper.on('active', () => {
    if (stepper.currentIndex === 3) recalcSummary();
  });

  // Initial run (in case step 3 is already active at load)
  if (HSStepper.getInstance('[data-hs-stepper]').currentIndex === 3) {
    recalcSummary();
  }
});
