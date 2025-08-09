const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Ticket = sequelize.define(
  "Ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    ticketSubject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignedToUser: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "User",
        key: "uuId",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
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


//cutem auto increment
Ticket.beforeCreate(async (instance) => {
  if (!instance.id) {
    const max = await Ticket.max("id") || 0;
    instance.id = max + 1;
  }
});

module.exports = Ticket;
