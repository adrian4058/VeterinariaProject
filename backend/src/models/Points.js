const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const User = require("./Users");

const Points = sequelize.define("Points", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  totalPoints: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});



module.exports = Points;
