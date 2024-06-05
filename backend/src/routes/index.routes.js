const express = require("express");
const router = express.Router();
const usersRouter = require("./users.router.js");
const pointsRouter = require("./points.router.js");
const transactionsRouter = require("./transactions.router.js");

router.use(express.json());
router.use("/auth", usersRouter);
router.use("/points", pointsRouter);
router.use("/transaction", transactionsRouter);

module.exports = router;
