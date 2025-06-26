const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");

const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../../utils/response");

const roleService = require("../../service/roleServices");

// Create a new role
const createRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    if (!roleName) {
      throw new Error(
        ERROR_MESSAGE.ROLE_NAME_REQUIRED || "Role name is required."
      );
    }

    const newRole = await roleService.createRole(roleName);
    sendSuccessResponse(res, SUCCESS_MESSAGE.ROLE_CREATED, newRole, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    sendSuccessResponse(res, SUCCESS_MESSAGE.ROLE_FETCHED, roles, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

// Get role by ID
const getRoleById = async (req, res) => {
  try {
    const { uuId } = req.params;

    if (!uuId) {
      throw new Error(ERROR_MESSAGE.ROLE_ID_REQUIRED || "Role UUID is required.");
    }

    const role = await roleService.getRoleById(uuId);
    sendSuccessResponse(res, SUCCESS_MESSAGE.ROLE_FETCHED, role, 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};


// Update role by ID
const updateRole = async (req, res) => {
    try {
        const { uuId } = req.params;
        const { roleName } = req.body;
    
        if (!uuId) {
        throw new Error(ERROR_MESSAGE.ROLE_ID_REQUIRED || "Role UUID is required.");
        }
        if (!roleName) {
        throw new Error(
            ERROR_MESSAGE.ROLE_NAME_REQUIRED || "Role name is required."
        );
        }
    
        const updatedRole = await roleService.updateRole(uuId, roleName);
        sendSuccessResponse(res, SUCCESS_MESSAGE.ROLE_UPDATED, updatedRole, 200);
    } catch (error) {
        sendErrorResponse(
        res,
        error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
        "",
        500
        );
    }
};


// Delete role by ID
const deleteRole = async (req, res) => {
  try {
    const { uuId } = req.params;

    if (!uuId) {
      throw new Error(ERROR_MESSAGE.ROLE_ID_REQUIRED || "Role UUID is required.");
    }

    await roleService.deleteRole(uuId);
    sendSuccessResponse(res, SUCCESS_MESSAGE.ROLE_DELETED, "", 200);
  } catch (error) {
    sendErrorResponse(
      res,
      error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG,
      "",
      500
    );
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};