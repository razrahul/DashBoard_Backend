const Auth = require("../models/auth");

const tableSync = async () => {
  try {
    await Auth.sync({ force: false });
    // console.log("table craete sucessfuly");
    
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { tableSync };

