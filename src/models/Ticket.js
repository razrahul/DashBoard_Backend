const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Ticket = sequelize.define(
  "Ticket",
  {
    ticketSubject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignedToUser: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ...BaseModel.rawAttributes,
  },
  {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  }
);

module.exports = Ticket;
