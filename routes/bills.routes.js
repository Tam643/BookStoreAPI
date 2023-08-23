const express = require('express');
const router = express.Router();
const { billController } = require('../controllers');
const { ensureLogin } = require('../middlewares');

router.route('/')
    .get(ensureLogin(['customer','employee','manager']),billController.findAllBillByuserID)
    .post(ensureLogin(),billController.create);
router.route('/:billId')
    .put(ensureLogin(['customer','employee','manager']),billController.update)

module.exports = router;
