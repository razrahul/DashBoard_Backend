const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");

const BaseModel = sequelize.define(
  "BaseModel",
  {
    uuId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      defaultValue: 1,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt & updatedAt
    paranoid: true, // ✅ Enables soft delete with deletedAt column
    freezeTableName: true, // ✅ Prevents Sequelize from pluralizing table name
  }
);

module.exports = BaseModel;
