const joi = require("joi");

const planCreateSchema = {
  body: joi.object({
    planName: joi.string().required().messages({
      "string.empty": "Plan name is required",
    }),
    planTitle: joi.string().required().messages({
      "string.empty": "Plan title is required",
    }),
    planDescription: joi.string().required().messages({
      "string.empty": "Plan description is required",
    }),
    minimumInvestment: joi.string().required().messages({
      "string.empty": "Minimum investment is required",
    }),
  }),
};

const planUpdateSchema = {
  body: joi.object({
    planName: joi.string().required().messages({
      "string.empty": "Plan name is required",
    }),
    planTitle: joi.string().required().messages({
      "string.empty": "Plan title is required",
    }),
    planDescription: joi.string().required().messages({
      "string.empty": "Plan description is required",
    }),
    minimumInvestment: joi.string().required().messages({
      "string.empty": "Minimum investment is required",
    }),
  }),
  params: joi.object({
    id: joi.string().guid({ version: ["uuidv4"] }).required().messages({
      "string.empty": "Plan UUID is required",
      "string.guid": "Plan UUID must be a valid UUID",
    }),
  }),
};

const planDeleteSchema = {
  params: joi.object({
    id: joi.string().guid({ version: ["uuidv4"] }).required().messages({
      "string.empty": "Plan UUID is required",
      "string.guid": "Plan UUID must be a valid UUID",
    }),
  }),
};

module.exports = {
  planCreateSchema,
  planUpdateSchema,
  planDeleteSchema,
};