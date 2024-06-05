const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const SECRET_KEY = "clavesecreta";

const signUp = async (req, res) => {
  try {
    const { password, email, firstname, lastname, dni, role } = req.body;

    if (typeof password !== "string") {
      return res.status(400).json({ error: "La contraseña debe ser una cadena de caracteres" });
    }
    if (typeof firstname !== "string" || typeof lastname !== "string") {
      return res.status(400).json({ error: "El nombre y el apellido deben ser cadenas de caracteres" });
    }
    if (typeof dni !== "number") {
      return res.status(400).json({ error: "El DNI debe ser un número" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "El email no es válido" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      dni,
      role: role || "user",
    });
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, SECRET_KEY, { expiresIn: "1h" });
    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ error: "El email y la contraseña deben ser cadenas de caracteres" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signUp, signIn };

module.exports = { signUp, signIn };

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado" });
  }
  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token no válido" });
  }
};

module.exports = { signUp, signIn, authenticateJWT };
