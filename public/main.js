async function loadTokens() {
  const res = await fetch('/api/tokens');
  const tokens = await res.json();
  const list = document.getElementById('token-list');
  list.innerHTML = '';
  tokens.forEach(t => {
    const div = document.createElement('div');
    div.className = 'token';
    div.innerHTML = `
      <h3>${t.name} (${t.symbol})</h3>
      <p>Price: $${t.price.toFixed(2)}</p>
      <p>Launched: ${new Date(t.createdAt).toLocaleString()}</p>
    `;
    list.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', loadTokens);
