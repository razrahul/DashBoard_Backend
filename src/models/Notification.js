const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Notification = sequelize.define(
  "Notification",
  {
    notificationType: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    notificationTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notificationMessage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    memberId: {
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

module.exports = Notification;
