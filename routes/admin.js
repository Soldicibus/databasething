const express = require('express');
const router = express.Router();

router.get('/main', (_req, res) => {
  const { filter } = _req.query;
  res.json({
    role: "admin",
    message: "HTOTO SKAZAV MODERATOR?!",
    filter: filter ?? "none"
  });
});

module.exports = router;
