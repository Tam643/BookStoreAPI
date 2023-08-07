const express = require('express');
const { bookController } = require('../controllers');
const { formidable } = require('../middlewares');
const router = express.Router();

router.route('/')
    .get(bookController.newarrival)
    .post(formidable, bookController.create);
router.route('/:id')
    .get(bookController.detail)
    .put(formidable, bookController.update)
    .delete(bookController.deleteBook);

module.exports = router;
