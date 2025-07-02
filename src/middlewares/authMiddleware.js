const { ERROR_MESSAGE } = require("../utils/propertyResolver");
const { sendErrorResponse } = require("../utils/response");
const Roles = require("../models/Role");
const iwt = require("jsonwebtoken");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const authMiddleware = async (req, res, next) => {
  // get token
  const authHeader = req.headers["authorization"];

  //Extract token from the Bearer token

  const token = authHeader && authHeader.split(" ")[1];
  // cheack if token is present
  if (!token) {
    return sendErrorResponse(res, ERROR_MESSAGE.UNAUTHORIZED || "Unauthorized & Token Missing","", 400);
    }
  try {
    // Verify the token
    const decoded = iwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return sendErrorResponse(
        res,
        ERROR_MESSAGE?.UNAUTHORIZED || "Unauthorized",
        "",
        401
      );
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      400
    );
  }
};

// chaeck to role is superadmin or not

const isAuthorizeAdmin = async (req, res, next) => {
  try {
    // Check if user is authenticated and fetch role
    const role = await Roles.findOne({ where: { uuId: req.user.roleId } });

    if (!role) {
      return sendErrorResponse(res, ERROR_MESSAGE.UNAUTHORIZED_SUPERADMIN || "Unauthorized SuperAdmin", "", 400);
    }

    // Normalize the role name
    const normalizedRoleName = role.roleName.trim().toLowerCase();

    if (normalizedRoleName !== "superadmin") {
      return sendErrorResponse(res, ERROR_MESSAGE.UNAUTHORIZED_SUPERADMIN || "Unauthorized SuperAdmin", "", 400);
    }

    next(); // Authorized
  } catch (error) {
    console.error("Authorization error:", error);
    return sendErrorResponse(res, ERROR_MESSAGE.INTERNAL_SERVER_ERROR || "Internal Server Error", error.message, 500);
  }
};


//multiple role authorization middleware
const authorize = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Check if user is authenticated and fetch role
      const role = await Roles.findOne({ where: { uuId: req.user.roleId } });

      if (!role) {
        return sendErrorResponse(res, ERROR_MESSAGE.UNAUTHORIZED || "Unauthorized", "", 400);
      }

      // Normalize the role name
      const normalizedRoleName = role.roleName.trim().toLowerCase();

      // Check if the user's role is in the allowed roles
      if (!normalizedRoleName || !allowedRoles.includes(normalizedRoleName)) {
        return sendErrorResponse(res, ERROR_MESSAGE.UNAUTHORIZED || "Unauthorized", "", 400);
      }

      next(); // Authorized
    } catch (error) {
      console.error("Authorization error:", error);
      return sendErrorResponse(res, ERROR_MESSAGE.INTERNAL_SERVER_ERROR || "Internal Server Error", error.message, 500);
    }
  };
};

module.exports = {
  authMiddleware,
  isAuthorizeAdmin,
  authorize,
};