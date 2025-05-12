document.addEventListener('DOMContentLoaded', function () {
  const validateBtn = document.getElementById('validate_discount_btn');
  const discountInput = document.getElementById('discount_code');
  const feedbackEl = document.getElementById('discount_code_feedback');
  const successEl = document.getElementById('discount_code_success');

  validateBtn.addEventListener('click', async () => {
    const code = discountInput.value.trim();

    feedbackEl.classList.add('hidden');
    successEl.classList.add('hidden');

    if (!code) return;

    try {
      const res = await fetch('https://discount-code-validator.disruptivebros.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const data = await res.json();

      if (data.valid) {
        successEl.classList.remove('hidden');
        feedbackEl.classList.add('hidden');
        // Optional: Set a flag somewhere to apply discount on total update
        window.discountValid = true;
        window.discountCode = code;
        document.dispatchEvent(new Event('discountValidated'));
      } else {
        feedbackEl.classList.remove('hidden');
        successEl.classList.add('hidden');
        window.discountValid = false;
        document.dispatchEvent(new Event('discountValidated'));
      }
    } catch (err) {
      feedbackEl.textContent = 'Something went wrong validating the code.';
      feedbackEl.classList.remove('hidden');
      successEl.classList.add('hidden');
      window.discountValid = false;
    }
  });
});