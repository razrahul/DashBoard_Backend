const Auth = require("../models/auth");
const Role = require("../models/Role");
const User = require("../models/User");

const tableSync = async () => {
  try {
    await Auth.sync({ force: false });
    await Role.sync({force: false });
    await User.sync({ force: false});
    // console.log("table create successfully");

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { tableSync };

