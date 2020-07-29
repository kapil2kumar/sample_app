const express = require('express');

let router = express.Router();

/**
 * Render the home page.
 */
router.get("/", (req, res) => {
  res.render("index");
});



module.exports = router;
