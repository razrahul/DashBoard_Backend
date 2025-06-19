const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE
} = require("../../utils/propertyResolver")

const Auths = require("../../models/auth")


const createAuthUser = async ({ phone, email }) => {
  // Check if phone exists
  const existingPhone = await Auths.findOne({ where: { phone } });
  if (existingPhone) throw new Error(ERROR_MESSAGE.PHONE_ALREADY_EXISTS || "Phone already registered");

  // Check if email exists
  const existingEmail = await Auths.findOne({ where: { email } });
  if (existingEmail) throw new Error(ERROR_MESSAGE.EMAIL_ALREADY_EXISTS || "Email already registered");

  // Create new user
  const newUser = await Auths.create({ phone, email });
  return newUser;
};


module.exports = { createAuthUser };
