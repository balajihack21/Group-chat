const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const ArchivedChat = sequelize.define("ArchivedChat", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.TEXT(),
  },
});

module.exports = ArchivedChat;