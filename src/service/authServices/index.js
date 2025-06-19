const {
    ERROR_MESSAGE,
    SUCCESS_MESSAGE
} = require("../../utils/propertyResolver")

const Auths = require("../../models/auth")

// verify number
// const verifyNumber = (number, otp) => {
//     try {
//         const auth = Auths.findOne({ phoneNumber: number })
//         if (!auth) {
//             throw new Error(ERROR_MESSAGE.NO_NOT_EXIST)
//         }
//         if (auth.otp !== otp) {
//             throw new Error(ERROR_MESSAGE.OTP_NOT_VERIFIED)
//         }

//         return true;
//     } catch (error) {
//         throw new Error(error.message);
//     }

// }



const createAuthUser = async ({ phone }) => {
  const existingUser = await Auths.findOne({ where: { phone } });
  if (existingUser) throw new Error(ERROR_MESSAGE.USER_ALREADY);

  const newUser = await Auths.create({ phone });
  return newUser;
};

module.exports = { createAuthUser };
