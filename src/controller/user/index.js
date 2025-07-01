const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const { sendOtpPhone, sendOtpEmail} = require("../../utils/sendotp");
const { generateOtp, verifyOtp, loginOtpGenerate} = require("../../service/otp/otpServices");

const userService = require("../../service/userServices");



// ✅ OTP Request — Phone + Email OTP
const requestOtp = async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!phone || !email) {
      throw new Error(ERROR_MESSAGE.PHONE_EMAIL_REQ || "Phone and Email are required.");
    }

    const phoneOtp = await generateOtp(phone, "phone");
    const emailOtp = await generateOtp(email, "email");

    await sendOtpPhone(phone, phoneOtp); // Twilio
    await sendOtpEmail(email, emailOtp); // SendGrid

    
    sendSuccessResponse(res, SUCCESS_MESSAGE.OTP_SUCESS, "", 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

//  ✅ Verify OTP for both Phone & Email, then Signup
const verifyOtpAndSignup = async (req, res) => {
  try {
    const { phone, phoneOtp, email, emailOtp } = req.body;

    if (!phone || !phoneOtp || !email || !emailOtp) {
      throw new Error(ERROR_MESSAGE.PHONE_OTP_REQ || "Phone, Email and both OTPs are required.");
    }

    // Phone OTP
    await verifyOtp(phone, phoneOtp, "phone");

    // Email OTP
    await verifyOtp(email, emailOtp, "email");

    // Create user
    const newUser = await userService.createUser({phone, email});
    
    sendSuccessResponse(res, SUCCESS_MESSAGE.USER_CREATED, newUser, 201);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const validator = require('validator');
// login otp request 
const loginOtpRequest = async (req, res) => {
  try {
    const { phoneoremail } = req.body;
    if (!phoneoremail) {
      throw new Error(ERROR_MESSAGE.PHONE_EMAIL_REQ || "Phone or Email is required.");
    }

    // if (phoneoremail && !validator.isMobilePhone(phoneoremail, 'any')) {
    //   throw new Error(ERROR_MESSAGE.INVALID_PHONE || "Invalid phone number format.");
    // }
    // if (phoneoremail && !validator.isEmail(phoneoremail)) {
    //   throw new Error(ERROR_MESSAGE.INVALID_EMAIL || "Invalid email format.");
    // }

    // Generate OTP for phone or email
    const otp = await loginOtpGenerate();


    // Store OTP in database
    await userService.otpStore({ phoneoremail, otp });


    // Send OTP based on type
    if (validator.isMobilePhone(phoneoremail, 'any')) {
      await sendOtpPhone(phoneoremail, otp); // Twilio
      // console.log("OTP sent to phone:", phoneoremail, otp);
      
    }else if (validator.isEmail(phoneoremail)) {
      const email = phoneoremail.trim();
      // TODO: Cheack let otp on email
      // await sendOtpEmail(email, otp); // SendGrid
      const response = await sendOtpEmail(email, otp);
      // console.log("SendGrid Response:", response);
      // console.log("OTP sent to email:", email, otp);
      
    }else {
      throw new Error(ERROR_MESSAGE.INVALID_PHONE || "Invalid phone or email format.");
    }

    sendSuccessResponse(res, SUCCESS_MESSAGE.OTP_SUCESS, "", 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

// login otp verify
const loginOtpVerify = async (req, res) => {
  try {
    const { phoneoremail, otp } = req.body;
    if (!phoneoremail || !otp) {
      throw new Error(ERROR_MESSAGE.PHONE_OTP_REQ || "Phone/Email and OTP are required.");
    }

    const result = await userService.loginverify({phoneoremail, otp});
  
    // Create user
    sendSuccessResponse(res, SUCCESS_MESSAGE.LOGIN_SUCCESS, result, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }  
};


module.exports = {
  requestOtp,
  verifyOtpAndSignup,
  loginOtpRequest,
  loginOtpVerify
};
