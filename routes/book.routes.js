const express = require('express');
const { bookController } = require('../controllers');
const { formidable, ensureLogin } = require('../middlewares');
const router = express.Router();

router.route('/')
    .get(bookController.searchAllBooks)
    .post(ensureLogin(["employee", "manager"]), formidable, bookController.create);
router.route('/:id')
    .get(bookController.findbyID)
    .put(ensureLogin(["employee", "manager"]), formidable, bookController.update)
    .delete(ensureLogin(["employee", "manager"]), bookController.deleteBook);
module.exports = router;
