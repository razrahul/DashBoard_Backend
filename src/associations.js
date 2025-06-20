const User = require("./user");
const Role = require("./role");
const Transaction = require("./transaction");
const Plan = require("./plan");
const Account = require("./account");
const UserPlan = require("./userPlan");
const Notification = require("./notification");
const Ticket = require("./ticket");
const Leads = require("./leads");
const User = require("./user");
const Plan = require("./plan");

// -------------------- Associations --------------------

// 🔗 User → Role (Many Users belong to One Role)
User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });

// 🔗 User → Account (One User has One Account)
User.hasOne(Account, { foreignKey: "memberId", sourceKey: "memberId" });
Account.belongsTo(User, { foreignKey: "memberId", targetKey: "memberId" });

// 🔗 User → Transaction (One User has Many Transactions)
User.hasMany(Transaction, { foreignKey: "memberId", sourceKey: "memberId" });
Transaction.belongsTo(User, { foreignKey: "memberId", targetKey: "memberId" });

// 🔗 Transaction → Plan (Many Transactions belong to One Plan)
Transaction.belongsTo(Plan, { foreignKey: "planId" });
Plan.hasMany(Transaction, { foreignKey: "planId" });

// 🔗 Transaction → ApprovedBy & RejectBy (Admin Users who approved/rejected)
Transaction.belongsTo(User, { as: "ApprovedBy", foreignKey: "approvedBy" });
Transaction.belongsTo(User, { as: "RejectedBy", foreignKey: "rejectBy" });

// UserPlan → User & Plan
UserPlan.belongsTo(User, { foreignKey: "memberId", targetKey: "memberId" });
User.hasMany(UserPlan, { foreignKey: "memberId", sourceKey: "memberId" });

UserPlan.belongsTo(Plan, { foreignKey: "planId" });
Plan.hasMany(UserPlan, { foreignKey: "planId" });

// Notification → User
Notification.belongsTo(User, { foreignKey: "memberId", targetKey: "memberId" });
User.hasMany(Notification, { foreignKey: "memberId", sourceKey: "memberId" });

// Ticket → AssignedToUser (User)
Ticket.belongsTo(User, { as: "AssignedToUser", foreignKey: "assignedToUser" });
User.hasMany(Ticket, { as: "AssignedTickets", foreignKey: "assignedToUser" });
module.exports = {
  User,
  Role,
  Transaction,
  Plan,
  Account,
  UserPlan,
  Notification,
  Ticket,
  Leads,
};
