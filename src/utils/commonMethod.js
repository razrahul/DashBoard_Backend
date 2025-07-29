const Auth = require("../models/auth");
const Role = require("../models/Role");
const User = require("../models/User");
const Plan = require("../models/Plan");
const UserPlan = require("../models/UserPlan");
const Account = require("../models/Account");
const Lead = require("../models/Leads");

const tableSync = async () => {
  try {
    await Auth.sync({ force: false });
    await Role.sync({force: false });
    await User.sync({ force: false});
    await Plan.sync({ force: false });
    await UserPlan.sync({ force: false });
    await Account.sync({ force: false });
    await Lead.sync({ force: false });
    // console.log("table create successfully");

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { tableSync };

