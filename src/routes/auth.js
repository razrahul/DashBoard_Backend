const express = require('express');

const { requestOtp, verifyOtpAndSignup , test, dummyEntry, findDummyUser} = require('../controller/auth/authController');
const userController = require('../controller/user');
const router = express.Router();

router.get("/test", test);
router.post("/request-otp", userController.requestOtp);
router.post("/verify-otp", userController.verifyOtpAndSignup);

// login request-otp
router.post("/login-request-otp", userController.loginOtpRequest);

// login verify-otp
router.post("/login", userController.loginOtpVerify);

//dummy entry
router.post("/dummy-entry/:id", dummyEntry);

// dummy user find
router.get("/dummy-user/:id", findDummyUser);

module.exports = router;
