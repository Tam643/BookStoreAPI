const express = require('express');
const router = express.Router();
const { genreController } = require('../controllers');

router.route('/:id')
  // Find Book with Genre ID
  .get(genreController.findById)
  // Update Genre BY ID
  .put(genreController.update);



module.exports = router;
