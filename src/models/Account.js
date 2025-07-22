const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");


const Account = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    memberId: {
      type: DataTypes.STRING,
      allowNull: false,
       references: {
        model: "User", 
        key: "memberId", 
      },
      onDelete: "CASCADE", 
      onUpdate: "CASCADE", 
    },
    accountHolderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IFSCCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
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

// custom auto-increment logic
Account.beforeCreate(async (instance) => {
  if (!instance.id) {
    const max = await Account.max("id") || 0;
    instance.id = max + 1;
  }
});

module.exports = Account;
