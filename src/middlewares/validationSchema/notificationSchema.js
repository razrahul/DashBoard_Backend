const joi = require("joi");

const notificationCreateSchema = {
  body: joi.object({
    notificationType: joi.number().required().messages({
      "number.empty": "Notification type is required",
    }),
    notificationTitle: joi.string().required().messages({
      "string.empty": "Notification title is required",
    }),
    notificationMessage: joi.string().required().messages({
      "string.empty": "Notification message is required",
    }),
    memberId: joi.string().required().messages({
      "string.empty": "Member ID is required",
    }),
  }),
};


const notificationUpdateSchema = {
  body: joi.object({
    notificationType: joi.number().messages({
      "number.base": "Notification type must be a number",
    }),
    notificationTitle: joi.string().messages({
      "string.base": "Notification title must be a string",
    }),
    notificationMessage: joi.string().messages({
      "string.base": "Notification message must be a string",
    }),
    memberId: joi.string().messages({
      "string.base": "Member ID must be a string",
    }),
  }),
  params: joi.object({
    id: joi.string().guid({ version: ["uuidv4"] }).required().messages({
      "string.empty": "Notification UUID is required",
      "string.guid": "Notification UUID must be a valid UUID",
    }),
  }),
};



const notificationDeleteSchema = {
  params: joi.object({
    id: joi.string().guid({ version: ["uuidv4"] }).required().messages({
      "string.empty": "Notification UUID is required",
      "string.guid": "Notification UUID must be a valid UUID",
    }),
  }),
};

module.exports = {
  notificationCreateSchema,
  notificationUpdateSchema,
  notificationDeleteSchema,
};