const { Router } = require("express");
const router = Router();
const { signUp, signIn } = require("../controllers/auth.controllers");


router.get("/signUp/", signUp);
router.get("/signIn/", signIn);

module.exports = router;
