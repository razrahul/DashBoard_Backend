const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ...BaseModel.rawAttributes,
  },
  {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  }
);

// ✅ Custom auto-increment logic
Role.beforeCreate(async (instance) => {
  if (!instance.id) {
    const max = await Role.max("id") || 0;
    instance.id = max + 1;
  }
});


module.exports = Role;
