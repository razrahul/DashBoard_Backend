const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const UserPlan = sequelize.define(
  "UserPlan",
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: true,
    },
    memberId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "User", // Assuming User is the name of the user table
        key: "memberId", // Assuming memberId is the primary key in User <table></table>
      },
      onDelete: "CASCADE", // Optional: define what happens on delete
      onUpdate: "CASCADE", // Optional: define what happens on update
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Plan", // Assuming Plan is the name of the plan table
        key: "uuId", // Assuming uuId is the primary key in Plan <table></table>
      },
      onDelete: "CASCADE", // Optional: define what happens on delete
      onUpdate: "CASCADE", // Optional: define what happens on update
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
UserPlan.beforeCreate(async (userplan) => {
  if (!userplan.id) {
    const maxId = await UserPlan.max("id") || 0;
    userplan.id = maxId + 1;
  }
});

module.exports = UserPlan;
