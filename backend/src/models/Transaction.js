const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const User = require("../models/User");

const Transaction = sequelize.define(
  "Transaction",
  {
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
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("add", "subtract"),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
);

Transaction.associate = (models) => {
  Transaction.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  Transaction.belongsTo(models.User, { foreignKey: "adminId", as: "admin" });
};

module.exports = Transaction;
