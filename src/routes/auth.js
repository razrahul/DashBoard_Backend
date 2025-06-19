const express = require('express');

const { requestOtp, verifyOtpAndSignup , test} = require('../controller/auth/authController');
const router = express.Router();

router.get("/test", test);
router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtpAndSignup);

module.exports = router;
