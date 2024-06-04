const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("basededatosveterinaria", "postgres", "&Ju4nm42019", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = {
  sequelize,
};
