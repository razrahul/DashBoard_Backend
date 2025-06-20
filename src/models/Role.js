const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Role = sequelize.define(
  "Role",
  {
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

module.exports = Role;
