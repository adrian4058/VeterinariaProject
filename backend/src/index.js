const app = require("./app");
const { sequelize } = require("./database/db");

require("./models/Points");
require("./models/Transaction");
require("./models/User");

async function main() {
  try {
    await sequelize.sync({force: true});
    console.log("Db connected");
    app.listen(3007);
    console.log("Server on port 3007");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}

main();
