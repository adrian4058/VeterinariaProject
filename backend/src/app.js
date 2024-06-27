const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); // Importar el paquete cors
const routes = require("./routes/index.routes");

const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://example.com'];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes sin origen (por ejemplo, solicitudes desde Postman o curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'El origen ' + origin + ' no está permitido por la política de CORS';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(morgan("dev"));
app.use("/", routes);

module.exports = app;

