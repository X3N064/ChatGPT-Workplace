const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const dataPath = path.join(__dirname, 'tokens.json');

function loadTokens() {
  if (fs.existsSync(dataPath)) {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }
  return [];
}

function saveTokens(tokens) {
  fs.writeFileSync(dataPath, JSON.stringify(tokens, null, 2));
}

let tokens = loadTokens();

app.get('/api/tokens', (req, res) => {
  res.json(tokens);
});

app.post('/api/tokens', (req, res) => {
  const { name, symbol, price } = req.body;
  const newToken = {
    id: tokens.length + 1,
    name,
    symbol,
    price: parseFloat(price) || 0,
    createdAt: new Date()
  };
  tokens.push(newToken);
  saveTokens(tokens);
  res.json({ success: true, token: newToken });
});

app.get('/debug', (req, res) => {
  res.json({ tokens });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
