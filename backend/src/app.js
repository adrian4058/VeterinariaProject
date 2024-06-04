const express = require("express");
const morgan = require("morgan");
const routes = require("./routes/index.routes");

const app = express();

app.use(morgan("dev"));
app.use("/", routes);

module.exports = app;
