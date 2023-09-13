const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const { ensureLogin } = require('../middlewares');

router.route('/')
    .get(ensureLogin(['manager']), userController.search)
    .put(ensureLogin(), userController.update)
    .delete(ensureLogin(['manager']), userController.onDelete);
router.get('/detail', ensureLogin(), userController.detail);

module.exports = router;
