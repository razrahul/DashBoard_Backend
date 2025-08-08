const User = require("./models/User");
const Role = require("./models/Role");
const Transaction = require("./models/Transaction");
const Plan = require("./models/Plan");
const Account = require("./models/Account");
const UserPlan = require("./models/UserPlan");
const Notification = require("./models/Notification");
const Ticket = require("./models/Ticket");
const Leads = require("./models/Leads");
// const User = require("./user");
// const Plan = require("./plan");

// -------------------- Associations --------------------

// 🔗 User → Role (Many Users belong to One Role)
User.belongsTo(Role, { foreignKey: "roleId",targetKey: "uuId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId", sourceKey: "uuId",  as: "user"  });

// 🔗 User → Account (One User has One Account)
// User.hasOne(Account, { foreignKey: "memberId", sourceKey: "memberId" });
// Account.belongsTo(User, { foreignKey: "memberId", targetKey: "memberId" });
// User → Account (One-to-One)
Account.belongsTo(User, {
  foreignKey: "memberId",     // Account.memberId refers to
  targetKey: "memberId",      // User.memberId
  as: "user"                  // Optional: adds account.getUser()
});

User.hasOne(Account, {
  foreignKey: "memberId",     // Account.memberId refers to
  sourceKey: "memberId",      // User.memberId
  as: "account"               // Optional: adds user.getAccount()
});




// 🔗 User → Transaction (One User has Many Transactions)
User.hasMany(Transaction, { foreignKey: "memberId", sourceKey: "memberId" });
Transaction.belongsTo(User, { foreignKey: "memberId", targetKey: "memberId" });

// 🔗 Transaction → Plan (Many Transactions belong to One Plan)
Transaction.belongsTo(Plan, { foreignKey: "planId" });
Plan.hasMany(Transaction, { foreignKey: "planId" });

// 🔗 Transaction → ApprovedBy & RejectBy (Admin Users who approved/rejected)
Transaction.belongsTo(User, { as: "ApprovedBy", foreignKey: "approvedBy" });
Transaction.belongsTo(User, { as: "RejectedBy", foreignKey: "rejectBy" });

// ✅ UserPlan → User (foreignKey = memberId referencing uuId)
UserPlan.belongsTo(User, {
  foreignKey: "memberId",   // field in UserPlan
  targetKey: "memberId",    // field in User
  as: "user",               // optional alias
});


User.hasMany(UserPlan, {
  foreignKey: "memberId",   // field in UserPlan
  sourceKey: "memberId",    // field in User
  as: "userPlans",          // optional alias
});


// ✅ UserPlan → Plan (foreignKey = planId referencing uuId)
UserPlan.belongsTo(Plan, {
  foreignKey: "planId",     // field in UserPlan
  targetKey: "uuId",        // field in Plan
  as: "plan",               // optional alias
});

Plan.hasMany(UserPlan, {
  foreignKey: "planId",     // field in UserPlan
  sourceKey: "uuId",        // field in Plan
  as: "userPlans",          // optional alias
});


// Notification → User
Notification.belongsTo(User, { foreignKey: "memberId", targetKey: "memberId", as: "user" });
User.hasMany(Notification, { foreignKey: "memberId", sourceKey: "memberId", as: "notifications" });

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
