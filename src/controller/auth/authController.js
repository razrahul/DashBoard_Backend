const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE
} = require("../../utils/propertyResolver");

const {
  sendSuccessResponse,
  sendErrorResponse
} = require("../../utils/response");

const { sendOtpPhone, sendOtpEmail } = require("../../utils/sendotp");
const { generateOtp, verifyOtp } = require("../../service/otp/otpServices");
const { createAuthUser } = require("../../service/authServices/index");

// ✅ Test endpoint (for health check)
const test = async (req, res) => {
  try {
    sendSuccessResponse(res, SUCCESS_MESSAGE.SIGNUP_SUCESS, "", 200);
  } catch (error) {
    sendErrorResponse(res, error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG, "", 500);
  }
};

// ✅ OTP Request — Phone + Email OTP
const requestOtp = async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!phone || !email) {
      throw new Error(ERROR_MESSAGE.PHONE_EMAIL_REQ || "Phone and Email are required.");
    }

    const phoneOtp = generateOtp(phone, "phone");
    const emailOtp = generateOtp(email, "email");

    await sendOtpPhone(phone, phoneOtp); // Twilio
    await sendOtpEmail(email, emailOtp); // SendGrid

    sendSuccessResponse(res, SUCCESS_MESSAGE.OTP_SUCESS, "", 200);
  } catch (error) {
    sendErrorResponse(res, error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG, "", 500);
  }
};

// ✅ Verify OTP for both Phone & Email, then Signup
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
    const user = await createAuthUser({ phone, email });

    sendSuccessResponse(res, SUCCESS_MESSAGE.SIGNUP_SUCESS, user, 200);
  } catch (error) {
    sendErrorResponse(res, error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG, "", 500);
  }
};

module.exports = {
  requestOtp,
  verifyOtpAndSignup,
  test
};
