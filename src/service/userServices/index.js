const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
} = require('../../utils/propertyResolver');

const User = require('../../models/User');



const createUser = async ({ phone, email }) => {
  try {
    // Check if email exists
    if (email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error(ERROR_MESSAGE?.USER_ALREADY_EXISTS || 'User already exists');
      }
    }

    // Check if phone exists
    if (phone) {
      const existingPhone = await User.findOne({ where: { number: phone } });
      if (existingPhone) {
        throw new Error(ERROR_MESSAGE?.PHONE_ALREADY_EXISTS || 'Phone number already exists');
      }
    }

    // Create new user
    const newUser = await User.create({ email, number: phone });
    return newUser;

  } catch (error) {
    // Optional: log error for debugging
    console.error("Error in createUser:", error.message);
    throw new Error(error.message || "Internal Server Error");
  }
};

//store otp in redis or any other storage
// now store in db
const otpStore =  async ({phoneoremail, otp}) => {

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { number: phoneoremail },
          { email: phoneoremail }
        ]
      }
    });
    if (!user) {
      throw new Error(ERROR_MESSAGE.USER_NOT_FOUND || "User not found");
    }
    // Store OTP in user model
    user.otp = otp;
    await user.save();
    
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to generate OTP");
    
  }
};


const loginverify = async ({ phoneoremail, otp }) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { number: phoneoremail },
          { email: phoneoremail }
        ]
      }
    });

    if (!user) {
      throw new Error(ERROR_MESSAGE.USER_NOT_FOUND || "User not found");
    }

    if (user.otp !== otp) {
      throw new Error(ERROR_MESSAGE.INVALID_OTP || "Invalid OTP");
    }

    // Clear OTP after successful verification
    user.otp = null;
    await user.save();

    return user;

  } catch (error) {
    throw new Error(error.message || "Failed to verify OTP");
  }
};


module.exports = {
    createUser,
    otpStore,
    loginverify
};
