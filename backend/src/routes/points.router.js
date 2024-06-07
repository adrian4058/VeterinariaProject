const { Router } = require("express");
const router = Router();
const { addPoints, subtractPoints, getPointsByUser } = require("../controllers/points.controllers");
const { authenticateJWT } = require("../middleware/jwt");

router.post("/addPoints/", authenticateJWT, addPoints);
router.post("/subtractPoints", authenticateJWT, subtractPoints);
router.get("/pointsbyuser/:userId", authenticateJWT, getPointsByUser);

module.exports = router;
