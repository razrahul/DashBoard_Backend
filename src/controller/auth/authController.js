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

const { Op } = require("sequelize");
const User = require("../../models/User");

async function generateMemberId(user) {
  if (!user.memberId && user.firstName && user.lastName) {
    const firstInitial = user.firstName.charAt(0).toUpperCase();
    const lastInitial = user.lastName.charAt(0).toUpperCase();
    const initials = `${firstInitial}${lastInitial}`;

    const count = await User.count({
      where: {
        memberId: {
          [Op.like]: `${initials}%`,
        },
      },
    });

    const memberNumber = String(count + 1).padStart(3, "0");
    user.memberId = `${initials}${memberNumber}`; // directly set
  }

  return user;
}


const dummyEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const {firstName, lastName, roleId, pan, creditScore, currentBalance, address} = req.body;
    // This is a dummy entry point for testing purposes

    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw new Error(ERROR_MESSAGE.USER_NOT_FOUND || "User not found.");
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.roleId = roleId || user.roleId;
    user.pan = pan || user.pan;
    user.creditScore = creditScore || user.creditScore;
    user.currentBalance = currentBalance || user.currentBalance;
    user.address = address || user.address;

    if (!user.memberId) {
      await generateMemberId(user); // Generate memberId if not set
    }
    await user.save();

    sendSuccessResponse(res, SUCCESS_MESSAGE.USER_UPDATE_SUCCESS || "user updated successfully", user, 200);
  } catch (error) {
    sendErrorResponse(res, ERROR_MESSAGE.SOMETHING_WENT_WRONG, error.message, 500);
  }
};


// find dummy user
const findDummyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error("Dummy user not found.");
    }
    sendSuccessResponse(res, SUCCESS_MESSAGE.DUMMY_USER_FOUND || "Dummy user found", user, 200);
  } catch (error) {
    sendErrorResponse(res, ERROR_MESSAGE.SOMETHING_WENT_WRONG, error.message, 500);
  }
};
module.exports = {
  requestOtp,
  verifyOtpAndSignup,
  test,
  dummyEntry,
  findDummyUser
};
