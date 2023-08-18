const express = require('express');
const router = express.Router();
const { genreController } = require('../controllers');
const { ensureLogin } = require('../middlewares');

router.route('/:id')
  // Find Book with Genre ID
  .get(genreController.findById)
  // Update Genre BY ID
  .put(ensureLogin(["employee", "manager"]),genreController.update);

module.exports = router;
