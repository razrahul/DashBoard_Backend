const { Sequelize } = require("sequelize");
const config = require("./database")[process.env.NODE_ENV || "development"];

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: "mysql",
  logging: config.log, 
});

module.exports = sequelize;
