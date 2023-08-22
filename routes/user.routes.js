const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const { ensureLogin } = require('../middlewares');

router.route('/')
  .get(userController.find)
  .put(ensureLogin(['manager','customer','employee']),userController.update)
  .delete(ensureLogin(['manager']),userController.onDelete);

module.exports = router;
