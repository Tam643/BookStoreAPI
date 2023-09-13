const express = require('express');
const router = express.Router();
const { billController } = require('../controllers');
const { ensureLogin } = require('../middlewares');

router.route('/')
    .get(ensureLogin(),billController.findAllBillByuserID)
    .post(ensureLogin(['customer']),billController.create);
router.route('/:billId')
    .get(ensureLogin(),billController.getDetailByID)
    .put(ensureLogin(),billController.update)

module.exports = router;
