const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const Points = require("../models/Points");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
    allowNull: false,
  },
});

User.associate = (models) => {
  User.hasMany(models.Transaction, { foreignKey: "userId", as: "userTransactions" });
  User.hasMany(models.Transaction, { foreignKey: "adminId", as: "adminTransactions" });
  User.hasOne(models.Points, { foreignKey: "userId", as: "points" });
};
module.exports = User;
