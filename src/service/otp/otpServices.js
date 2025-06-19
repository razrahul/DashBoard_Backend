const {
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} = require("../../utils/propertyResolver")

// const otpGenerator = require('otp-generator')

// const otp1 = otpGenerator.generate(6, { upperCaseAlphabets: false,lowerCaseAlphabets: false,  specialChars: false });

// console.log(otp1);


  //TODO: ISSME REDIS DAALNA TEMPORARY MEMORY KE LIYE
const otpStore = new Map(); // temporary memory store

const generateOtp = (phoneNumber) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore.set(phoneNumber, { otp, expiresAt });
  // console.log("@@@otpstore",otpStore);
  
  return otp;
};

const verifyOtp = (phoneNumber, inputOtp) => {
  const record = otpStore.get(phoneNumber);
  // if (!record) return { success: false, message: "OTP not found" };

  // console.log("@@@record", record);
  // console.log("@@@inputOtp", inputOtp);
  
  
  if (!record) {
    throw new Error(ERROR_MESSAGE.OTP_NOT_FOUND);
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(phoneNumber);
    // return { success: false, message: "OTP expired" };
    throw new Error(ERROR_MESSAGE.OTP_EXPIRED);
  }
      
   if (String(record.otp) !== String(inputOtp).trim()) {
     throw new Error(ERROR_MESSAGE.INVALID_OTP);
  }


  otpStore.delete(phoneNumber);
  return true;
};

module.exports = { generateOtp, verifyOtp };
