const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const UserPlan = sequelize.define(
  "UserPlan",
  {
    memberId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    ...BaseModel.rawAttributes,
  },
  {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  }
);

module.exports = UserPlan;
