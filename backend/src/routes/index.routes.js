const express = require("express");
const router = express.Router();
const usersRouter = require("./users.router.js");
const pointsRouter = require("./points.router.js");

router.use("/auth", usersRouter);
router.use("/points", pointsRouter);

module.exports = router;
