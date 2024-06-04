const { Router } = require("express");
const router = Router();
const { addPoints, subtractPoints } = require("../controllers/points.controllers");

router.get("/addPoints", addPoints);
router.get("/subtractPoints", subtractPoints);

module.exports = router;
