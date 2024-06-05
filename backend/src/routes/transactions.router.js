const { Router } = require("express");
const router = Router();
const { getTransactionUserId } = require("../controllers/transactions.controllers");

router.get("/history/:userId", getTransactionUserId);

module.exports = router;
