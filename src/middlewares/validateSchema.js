// middlewares/validateSchema.js
const Joi = require("joi");
const { sendErrorResponse } = require("../utils/response");

const validateSchema = (schemas) => {
  return (req, res, next) => {
    const validationOptions = { abortEarly: false };

    const getFirstError = (error) => {
      if (!error || !error.details) return null;
      return error.details[0].message;
    };

    // Body validation
    if (schemas.body) {
      const { error } = schemas.body.validate(req.body, validationOptions);
      if (error) {
        return sendErrorResponse(res, "Validation error", getFirstError(error), 400);
      }
    }

    // Params validation
    if (schemas.params) {
      const { error } = schemas.params.validate(req.params, validationOptions);
      if (error) {
        return sendErrorResponse(res, "Validation error", getFirstError(error), 400);
      }
    }

    // Query validation
    if (schemas.query) {
      const { error } = schemas.query.validate(req.query, validationOptions);
      if (error) {
        return sendErrorResponse(res, "Validation error", getFirstError(error), 400);
      }
    }

    // ✅ No validation errors → next
    return next();
  };
};

module.exports = validateSchema;
