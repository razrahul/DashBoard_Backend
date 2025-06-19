const otpGenerator = require("otp-generator");
const { ERROR_MESSAGE } = require("../../utils/propertyResolver");

const otpStore = new Map(); // Use Redis later

const generateOtp = (identifier, type) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });

  const key = `${type}:${identifier}`;
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore.set(key, { otp, expiresAt });
  return otp;
};

const verifyOtp = (identifier, inputOtp, type) => {
  const key = `${type}:${identifier}`;
  const record = otpStore.get(key);

  if (!record) throw new Error(ERROR_MESSAGE.OTP_NOT_FOUND);
  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    throw new Error(ERROR_MESSAGE.OTP_EXPIRED);
  }

  if (String(record.otp) !== String(inputOtp).trim()) {
    throw new Error(ERROR_MESSAGE.INVALID_OTP);
  }

  otpStore.delete(key);
  return true;
};

module.exports = { generateOtp, verifyOtp };

