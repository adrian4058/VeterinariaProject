const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
// const Points = require("./Points")

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


// User.hasOne(Points, { foreignKey: "userId" });
// 
// User.hasMany(Transaction, { foreignKey: "userId" });
// User.hasMany(Transaction, { as: "adminTransactions", foreignKey: "adminId" });

module.exports = User;
