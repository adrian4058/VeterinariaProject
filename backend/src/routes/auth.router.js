const { Router } = require("express");
const router = Router();
const { signUp, signIn, getAllUsers, signUpForAdmin, getUserById } = require("../controllers/auth.controllers");
const { authenticateJWT } = require("../middleware/jwt");

//registro
router.post("/signup/", signUp);
//registro hecho por el admin
router.get("/signupadmin/", authenticateJWT, signUpForAdmin);
//inicio sesion
router.post("/signin/", signIn);
//obtener usuario por id
router.get("/user/:userId", getUserById);
//obtener todos los usuarios
router.get("/allusers/", authenticateJWT, getAllUsers);

module.exports = router;
