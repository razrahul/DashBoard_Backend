const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE,
} = require('../../utils/propertyResolver');

const User = require('../../models/User');

 const { Op } = require('sequelize');
 const jwt = require('jsonwebtoken');

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
    // console.log("@@@sevices:", phoneoremail, "OTP:", otp);
    
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { number: phoneoremail },
          { email: phoneoremail }
        ]
      },
      attributes: { exclude: ['isActive'] }
    });

    if (!user) {
      throw new Error(ERROR_MESSAGE.USER_NOT_FOUND || "User not found");
    }

    if (String(user.otp) !== String(otp).trim()) {
      throw new Error(ERROR_MESSAGE.INVALID_OTP || "Invalid OTP");
    }

    // Clear OTP after successful verification
    user.otp = null;
    await user.save();

     //Generate a JWT token or session for the user if needed
    const tokenExpires = "1d"; // Example expiration time
    const token = jwt.sign(
      {
        userId: user.id,
        uuId: user.uuId,
        email: user.email,
        number: user.number || null,
        memberId: user.memberId || null,
        roleId: user.roleId || null,
        isActive: user.isActive || null,
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: tokenExpires 
      }
    );

    return {user, token};

  } catch (error) {
    throw new Error(error.message || "Failed to verify OTP");
  }
};


module.exports = {
    createUser,
    otpStore,
    loginverify
};
