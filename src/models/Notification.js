const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
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
      references: {
        model: "User",
        key: "memberId",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    ...BaseModel.rawAttributes,
  },
  {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  }
);

// Custom auto-increment logic
Notification.beforeCreate(async (instance) => {
  if (!instance.id) {
    const max = await Notification.max("id") || 0;
    instance.id = max + 1;
  }
});

module.exports = Notification;
