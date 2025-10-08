const joi = require("joi");

const roleCraeteSchema = {
  body: joi.object({
    roleName: joi.string().required().messages({
      "string.empty": "Role name is required",
    }),
  }),
};

const roleUpdateSchema = {
  body: joi.object({
    roleName: joi.string().required().messages({
      "string.empty": "Role name is required",
    }),
  }),
  params: joi.object({
    uuId: joi.string().guid({ version: ["uuidv4"] }).required().messages({
      "string.empty": "Role UUID is required",
      "string.guid": "Role UUID must be a valid UUID",
    }),
  }),
};

const roleDeleteSchema = {
  params: joi.object({
    uuId: joi.string().guid({ version: ["uuidv4"] }).required().messages({
      "string.empty": "Role UUID is required",
      "string.guid": "Role UUID must be a valid UUID",
    }),
  }),
};

module.exports = {
  roleCraeteSchema,
  roleUpdateSchema,
  roleDeleteSchema,
};
