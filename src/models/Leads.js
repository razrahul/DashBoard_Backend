const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Leads = sequelize.define(
  "Lead",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,// enum :- ['convertd', 'contacted', 'ending',"new "",  'Ending'],
      enum: ['convertd', 'contacted', 'ending', 'new'],
      defaultValue: 'new',
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

// custom auto-increment logic
Leads.beforeCreate(async (instance) => {
  if (!instance.id) {
    const max = await Leads.max("id") || 0;
    instance.id = max + 1;
  }
});

module.exports = Leads;
