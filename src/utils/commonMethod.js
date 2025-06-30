const Auth = require("../models/auth");
const Role = require("../models/Role");
const User = require("../models/User");
const Plan = require("../models/Plan");

const tableSync = async () => {
  try {
    await Auth.sync({ force: false });
    await Role.sync({force: false });
    await User.sync({ force: false});
    await Plan.sync({ force: false });
    // console.log("table create successfully");

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { tableSync };

