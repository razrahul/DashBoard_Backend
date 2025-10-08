// validations/authValidation.js
const Joi = require("joi");

const verifyOtpSchema = {
  body: Joi.object({
    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
      "string.empty": "Phone is required",
      "string.pattern.base": "Phone must be 10 digits",
    }),
    phoneOtp: Joi.string().length(6).required().messages({
      "string.empty": "Phone OTP is required",
      "string.length": "Phone OTP must be 6 digits",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Invalid email format",
    }),
    emailOtp: Joi.string().length(6).required().messages({
      "string.empty": "Email OTP is required",
      "string.length": "Email OTP must be 6 digits",
    }),
  }),
};

module.exports = {
  verifyOtpSchema,
};
