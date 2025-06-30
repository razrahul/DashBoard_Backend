const express = require('express');

const { requestOtp, verifyOtpAndSignup , test} = require('../controller/auth/authController');
const userController = require('../controller/user');
const router = express.Router();

router.get("/test", test);
router.post("/request-otp", userController.requestOtp);
router.post("/verify-otp", userController.verifyOtpAndSignup);

module.exports = router;
