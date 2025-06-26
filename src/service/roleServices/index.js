const {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} = require("../../utils/propertyResolver");

const Role = require("../../models/Role");

const createRole = async (roleName) => {
  try {
    // Check if role already exists
    const existingRole = await Role.findOne({ where: { roleName } });
    if (existingRole)
      throw new Error(
        ERROR_MESSAGE.ROLE_ALREADY_EXISTS || "Role already exists"
      );

    // Create new role
    const newRole = await Role.create({ roleName });
    return newRole;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllRoles = async () => {
  try {
    const roles = await Role.findAll();
    return roles;
  } catch (error) {
    throw new Error(error.message);
  }
}

const getRoleById = async (id) => {
  try {
    const role = await Role.findByPk(id);
    if (!role) throw new Error(ERROR_MESSAGE.ROLE_NOT_FOUND || "Role not found");
    return role;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateRole = async (id, roleName) => {
  try {
    const role = await Role.findByPk(id);
    if (!role) throw new Error(ERROR_MESSAGE.ROLE_NOT_FOUND || "Role not found");

    role.roleName = roleName;
    await role.save();
    return role;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteRole = async (id) => {
  try {
    const role = await Role.findByPk(id);
    if (!role) throw new Error(ERROR_MESSAGE.ROLE_NOT_FOUND || "Role not found");

    await role.destroy();
    return true; // Return true to indicate successful deletion
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
