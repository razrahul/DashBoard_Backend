const joi = require('joi');


const leadCreateSchema = {
    body: joi.object({
        firstName: joi.string().required().messages({
            "string.empty": "First name is required",
        }),
        lastName: joi.string().required().messages({
            "string.empty": "Last name is required",
        }),
        number: joi.string().messages({
            "string.empty": "Number is required",
        }),
        email: joi.string().required().messages({
            "string.empty": "Email is required",
        }),
        title: joi.string().messages({
            "string.empty": "Title is required",
        }),
    }),
};

const leadUpdateSchema = {
    body: joi.object({
        firstName: joi.string().messages({
            "string.empty": "First name is required",
        }),
        lastName: joi.string().messages({
            "string.empty": "Last name is required",
        }),
        number: joi.string().messages({
            "string.empty": "Number is required",
        }),
        email: joi.string().messages({
            "string.empty": "Email is required",
        }),
        title: joi.string().messages({
            "string.empty": "Title is required",
        }),
    }),
    params: joi.object({
        id: joi.string().guid({ version: ['uuidv4'] }).required().messages({
            "string.empty": "Lead UUID is required",
            "string.guid": "Lead UUID must be a valid UUID",
        }),
    }),
};

const leadDeleteSchema = {
    params: joi.object({
        id: joi.string().guid({ version: ['uuidv4'] }).required().messages({
            "string.empty": "Lead UUID is required",
            "string.guid": "Lead UUID must be a valid UUID",
        }),
    }),
};

module.exports = {
        leadCreateSchema,
        leadUpdateSchema,
        leadDeleteSchema,   
};