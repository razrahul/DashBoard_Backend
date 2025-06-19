const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Auths = sequelize.define(
  "Auth",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      trim: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      // validate: {
      //   is: /^[0-9]{10}$/, // Example: 10-digit numeric phone number
      // },
    },

    pan: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
      defaultValue: null,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
    },

    forgetToken: {
      type: DataTypes.STRING,
    },
    forgetExpires: {
      type: DataTypes.DATE,
    },
    // reset_password_token: {
    //   type: DataTypes.STRING,
    // },

    ...BaseModel.rawAttributes,
  },
  {
    tableName: "Auth",
  }
);

module.exports = Auths;
