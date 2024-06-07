const app = require("./app");
const { conn: sequelize } = require("./database/db");

async function main() {
  try {
    await sequelize.sync({ force: false }); // force: true elimina y vuelve a crear todas las tablas en cada inicio
    console.log("Db connected");

    app.listen(3007, () => {
      console.log("Server on port 3007");
    });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}

main();
