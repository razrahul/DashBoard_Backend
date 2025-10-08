const joi = require("joi");

const ticketCreateSchema = {
  body: joi.object({
    ticketSubject: joi.string().required().messages({
      "string.empty": "Ticket subject is required",
    }),
    assignedToUser: joi.string().required().messages({
      "string.empty": "Assigned user is required",
    }),
    priority: joi.string().required().messages({
      "string.empty": "Priority is required",
    }),
  }),
};

const ticketUpdateSchema = {
  body: joi.object({
    ticketSubject: joi.string().required().messages({
      "string.empty": "Ticket subject is required",
    }),
    assignedToUser: joi.string().required().messages({
      "string.empty": "Assigned user is required",
    }),
    priority: joi.string().required().messages({
      "string.empty": "Priority is required",
    }),
  }),
  params: joi.object({
    id: joi.string().guid({ version: ["uuidv4"] }).required().messages({
      "string.empty": "Ticket UUID is required",
      "string.guid": "Ticket UUID must be a valid UUID",
    }),
  }),
};

const ticketDeleteSchema = {
  params: joi.object({
    id: joi.string().guid({ version: ["uuidv4"] }).required().messages({
      "string.empty": "Ticket UUID is required",
      "string.guid": "Ticket UUID must be a valid UUID",
    }),
  }),
};

module.exports = {
  ticketCreateSchema,
  ticketUpdateSchema,
  ticketDeleteSchema,
};