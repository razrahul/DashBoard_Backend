
// const Roles =  require("../models/role");
// const Users = require("../models/user");
// const Companys = require("../models/company");
// const Chats = require("../models/chat");
// const Contactc = require("../models/contact");
// const ContactLogs = require("../models/contactLog");
// const Stats = require("../models/stats");

// const tableSync = async () => {
//   try {
//     await Roles.sync({ force: false });
//     await Companys.sync({ force: false }); 
//     await Users.sync({ force: false });
//     await Chats.sync({ force: false });
//     await Contactc.sync({ force: false });
//     await ContactLogs.sync({ force: false });
//     await Stats.sync({ force: false });
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const Auth = require("../models/auth");

const tableSync = async () => {
  try {
    await Auth.sync({ force: false });
    // console.log("table craete sucessfuly");
    

const Roles =  require("../models/role");
const Users = require("../models/user");
const Companys = require("../models/company");
const Chats = require("../models/chat");
const Contactc = require("../models/contact");
const ContactLogs = require("../models/contactLog");
const Stats = require("../models/stats");

const tableSync = async () => {
  try {
    await Roles.sync({ force: false });
    await Companys.sync({ force: false }); 
    await Users.sync({ force: false });
    await Chats.sync({ force: false });
    await Contactc.sync({ force: false });
    await ContactLogs.sync({ force: false });
    await Stats.sync({ force: false });

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { tableSync };

// await Chats.sync({ alter: true }); 

// wait Chats.sync({ force: true });
