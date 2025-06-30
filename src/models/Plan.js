const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Plan = sequelize.define(
  "Plan",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
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


// ✅ Custom auto-increment logic
Plan.beforeCreate(async (instance) => {
  if (!instance.id) {
    const max = await Plan.max("id") || 0;
    instance.id = max + 1;
  }
});

module.exports = Plan;
