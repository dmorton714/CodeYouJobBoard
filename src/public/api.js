document.addEventListener('DOMContentLoaded', function() {
  const fetchBtn = document.getElementById('fetchBtn');
  const resultDiv = document.getElementById('result');

  fetchBtn.addEventListener('click', async function() {
    try {
      resultDiv.textContent = 'Loading...';
      
      const response = await fetch('/api/sheet');
      const data = await response.json();
      
      if (response.ok) {
        resultDiv.textContent = JSON.stringify(data, null, 2);
      } else {
        resultDiv.textContent = 'Error: ' + data.error;
      }
    } catch (error) {
      resultDiv.textContent = 'Error: ' + error.message;
    }
  });
});