document.addEventListener("DOMContentLoaded", function () {
    // Select all radio buttons and the input number section
    const radioButtons = document.querySelectorAll('input[name="membership"]');
    const multipleInput = document.getElementById('multipleInput');
    
    // Function to toggle the input number based on the selected card
    function toggleMultipleInput() {
      const selectedRadio = document.querySelector('input[name="membership"]:checked');
  
      if (selectedRadio && selectedRadio.classList.contains('multiple')) {
        multipleInput.classList.remove('hidden'); // Show the input
      } else {
        multipleInput.classList.add('hidden'); // Hide the input
      }
    }
  
    // Add event listeners to all radio buttons
    radioButtons.forEach((radio) => {
      radio.addEventListener('change', toggleMultipleInput);
    });
  
    // Run the function on page load to ensure correct state
    toggleMultipleInput();
  });
  