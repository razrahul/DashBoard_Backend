const joi = require("joi");


const accountCreateSchema = {
  body: joi.object({
    accountHolderName: joi.string().required().messages({
      "string.empty": "Account holder name is required",
    }),
    accountNumber: joi.string().required().messages({
      "string.empty": "Account number is required",
    }),
    IFSCCode: joi.string().required().messages({
      "string.empty": "IFSC code is required",
    }),
    bankName: joi.string().required().messages({
      "string.empty": "Bank name is required",
    }),
  }),
};

const accountUpdateSchema = {
  body: joi.object({
    accountHolderName: joi.string().messages({
      "string.empty": "Account holder name is required",
    }),
    accountNumber: joi.string().messages({
      "string.empty": "Account number is required",
    }),
    IFSCCode: joi.string().messages({
      "string.empty": "IFSC code is required",
    }),
    bankName: joi.string().messages({
      "string.empty": "Bank name is required",
    }),
  }),
  
};



module.exports = {
  accountCreateSchema,
  accountUpdateSchema,
};