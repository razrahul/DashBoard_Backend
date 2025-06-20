const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnect");
const BaseModel = require("./baseModel");

const Transaction = sequelize.define(
  "Transaction",
  {
    memberId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    transactionAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approvedBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    rejectBy: {
      type: DataTypes.BIGINT,
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

module.exports = Transaction;


// associateModels bhi define kar skte hai . ek alag file me


// const User = require("./user");
// const Role = require("./role");
// const Transaction = require("./transaction");
// const Plan = require("./plan");
// const Account = require("./account");

// // -------------------- Associations --------------------

// // 🔗 User → Role (Many Users belong to One Role)
// User.belongsTo(Role, { foreignKey: "roleId" });
// Role.hasMany(User, { foreignKey: "roleId" });

// // 🔗 User → Account (One User has One Account)
// User.hasOne(Account, { foreignKey: "memberId", sourceKey: "memberId" });
// Account.belongsTo(User, { foreignKey: "memberId", targetKey: "memberId" });

// // 🔗 User → Transaction (One User has Many Transactions)
// User.hasMany(Transaction, { foreignKey: "memberId", sourceKey: "memberId" });
// Transaction.belongsTo(User, { foreignKey: "memberId", targetKey: "memberId" });

// // 🔗 Transaction → Plan (Many Transactions belong to One Plan)
// Transaction.belongsTo(Plan, { foreignKey: "planId" });
// Plan.hasMany(Transaction, { foreignKey: "planId" });

// // 🔗 Transaction → ApprovedBy & RejectBy (Admin Users who approved/rejected)
// Transaction.belongsTo(User, { as: "ApprovedBy", foreignKey: "approvedBy" });
// Transaction.belongsTo(User, { as: "RejectedBy", foreignKey: "rejectBy" });

// module.exports = {
//   User,
//   Role,
//   Transaction,
//   Plan,
//   Account,
// };
