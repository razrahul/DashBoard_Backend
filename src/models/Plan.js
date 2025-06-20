const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Plan = sequelize.define(
  "Plan",
  {
    planName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    planDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    minimumInvestment: {
      type: DataTypes.STRING,
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

module.exports = Plan;
