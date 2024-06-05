const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
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
  dni: {
    type: DataTypes.STRING,
    allowNull: true,
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
