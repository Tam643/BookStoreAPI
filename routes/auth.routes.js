const express = require('express');
const { authController } = require('../controllers');
const router = express.Router();

/* GET auth listing. */
router.post('/register', authController.register);
router.post('/signin',authController.signin);
router.post('/signout',authController.signout);

module.exports = router;
