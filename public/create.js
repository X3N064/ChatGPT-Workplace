document.getElementById('create-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    symbol: form.symbol.value,
    price: form.price.value
  };
  const res = await fetch('/api/tokens', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  const status = document.getElementById('status');
  if (result.success) {
    status.textContent = 'Token added!';
    form.reset();
  } else {
    status.textContent = 'Error adding token';
  }
});
