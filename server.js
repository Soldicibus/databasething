const express = require('express');

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (_req, res) => {
  res.json({ message: 'Express backend' });
});