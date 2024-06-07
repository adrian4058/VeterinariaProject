require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//   }
// );

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
  // port: DB_PORT,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "../models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "../models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Points, Transaction } = sequelize.models;

User.hasMany(Points, { foreignKey: "userId" });
Points.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Transaction, { as: "UserTransactions", foreignKey: "userId" });
User.hasMany(Transaction, { as: "AdminTransactions", foreignKey: "adminId" });
Transaction.belongsTo(User, { as: "User", foreignKey: "userId" });
Transaction.belongsTo(User, { as: "Admin", foreignKey: "adminId" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op,
};
