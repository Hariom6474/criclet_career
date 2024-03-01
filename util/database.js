const Sequelize = require("sequelize");

const sequelize = new Sequelize("cricket_career", "root", "54321", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
