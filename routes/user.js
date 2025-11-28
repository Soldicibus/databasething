const express = require('express');
const router = express.Router();

router.get('/main', (_req, res) => {
  //const { id } = req.query;

  res.json({
    role: "user",
    message: `User profile`
  });
});

module.exports = router;
