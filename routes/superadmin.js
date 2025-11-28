const express = require('express');
const router = express.Router();

router.get('/main', (_req, res) => {
  res.json({
    role: "superadmin",
    message: "Super Admin Control Panel"
  });
});

module.exports = router;
