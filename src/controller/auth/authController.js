const {
    SUCCESS_MESSAGE,
    ERROR_MESSAGE
} = require("../../utils/propertyResolver");

const {
    sendSuccessResponse,
    sendErrorResponse
} = require("../../utils/response");

const {sendOtpPhone } = require("../../utils/sendotp");
const { generateOtp, verifyOtp } = require("../../service/otp/otpServices");
const { createAuthUser } = require("../../service/authServices/index");

const test = async (req, res) => {
  try {
    sendSuccessResponse(res, SUCCESS_MESSAGE.SIGNUP_SUCESS,"", 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const requestOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) throw new Error(ERROR_MESSAGE.PHONE_NO_REQ);

    const otp = generateOtp(phone); // OTP create
    await sendOtpPhone(phone, otp); // OTP bhejna via Twilio

    sendSuccessResponse(res, SUCCESS_MESSAGE.OTP_SUCESS,"", 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

const verifyOtpAndSignup = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    // console.log("REQ.BODY", req.body);

    if (!phone || !otp) throw new Error(ERROR_MESSAGE.PHONE_OTP_REQ);

    const VerifyOtp = verifyOtp(phone, otp);
    
    if (!VerifyOtp) throw new Error(ERROR_MESSAGE.OTP_NOT_VERIFIED);

    const user = await createAuthUser({ phone });

    sendSuccessResponse(res, SUCCESS_MESSAGE.SIGNUP_SUCESS, user, 200);
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
  test
};
