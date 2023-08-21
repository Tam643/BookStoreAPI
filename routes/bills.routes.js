const express = require('express');
const router = express.Router();
const { billController } = require('../controllers');
const { ensureLogin } = require('../middlewares');

router.route('/')
    .get(ensureLogin(),billController.findAllBillByuserID)
    .post(ensureLogin(),billController.create);
router.route('/:billId')
    .put(ensureLogin(),billController.update)
    .delete(ensureLogin(),billController.deleteBill);

module.exports = router;
