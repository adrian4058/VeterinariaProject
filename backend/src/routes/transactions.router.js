const { Router } = require("express");
const router = Router();
const { getTransactionUserId, deleteTransactionById } = require("../controllers/transactions.controllers");

router.get("/history/:userId", getTransactionUserId);
router.post("/delete/", deleteTransactionById);

module.exports = router;
