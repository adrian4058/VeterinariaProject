const { Router } = require("express");
const router = Router();
const { signUp, signIn } = require("../controllers/auth.controllers");


router.post("/signup/", signUp);
router.post("/signin/", signIn);

module.exports = router;
