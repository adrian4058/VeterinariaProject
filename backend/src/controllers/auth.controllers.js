const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Points, Transaction } = require("../database/db");
const sendVerificationEmail = require("../email/sendVerificationEmail");
const sendWelcomeEmail = require("../email/sendWelcomeEmail");
const sendPasswordResetEmail = require("../email/sendPasswordResetEmail");

const SECRET_KEY = "clavesecreta";
const RESET_PASSWORD_KEY = "otraClaveSecreta";

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.verified = true;
    await user.save();

    await sendWelcomeEmail(user.email, user.firstname);

    res.status(200).json({ message: "Cuenta verificada con éxito" });
  } catch (error) {
    res.status(400).json({ error: "Token inválido o expirado" });
  }
};

const sendPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const token = jwt.sign({ id: user.id }, RESET_PASSWORD_KEY, { expiresIn: "1h" });

    await sendPasswordResetEmail(email, token);

    res.status(200).json({ message: "Correo de restablecimiento de contraseña enviado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { newPassword } = req.body;

    if (typeof newPassword !== "string") {
      return res.status(400).json({ error: "La nueva contraseña debe ser una cadena de caracteres" });
    }

    const decoded = jwt.verify(token, RESET_PASSWORD_KEY);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Contraseña restablecida con éxito" });
  } catch (error) {
    res.status(400).json({ error: "Token inválido o expirado" });
  }
};

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

    await Points.create({
      userId: newUser.id,
    });

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, SECRET_KEY, { expiresIn: "1h" });

    await sendVerificationEmail(email, token);

    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signUpForAdmin = async (req, res) => {
  try {
    const { email, firstname, lastname, dni, role } = req.body;

    const requestingUser = await User.findByPk(req.user.id);
    if (!requestingUser || requestingUser.role !== "admin") {
      return res.status(403).json({ error: "Solo los administradores pueden registrar nuevos usuarios" });
    }

    if (typeof firstname !== "string" || typeof lastname !== "string") {
      return res.status(400).json({ error: "El nombre y el apellido deben ser cadenas de caracteres" });
    }
    if (typeof dni !== "number") {
      return res.status(400).json({ error: "El DNI debe ser un número" });
    }

    let newUserEmail = email;
    if (newUserEmail && typeof newUserEmail !== "string") {
      return res.status(400).json({ error: "El email debe ser una cadena de caracteres" });
    }
    if (!newUserEmail) {
      newUserEmail = dni.toString();
    }

    const hashedPassword = await bcrypt.hash(dni.toString(), 10);

    const newUser = await User.create({
      email: newUserEmail,
      password: hashedPassword,
      firstname,
      lastname,
      dni,
      role: role || "user",
      verified: true,
    });

    await Points.create({
      userId: newUser.id,
    });

    if (email) {
      await sendWelcomeEmail(email, firstname);
    }

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

const getAllUsers = async (req, res) => {
  try {
    const requestingUser = await User.findByPk(req.user.id);
    if (!requestingUser || requestingUser.role !== "admin") {
      return res.status(403).json({ error: "Solo los administradores pueden acceder a esta información" });
    }

    const nonAdminUsers = await User.findAll({
      where: { role: "user" },
      include: [
        {
          model: Points,
          attributes: ["totalPoints"],
        },
        {
          model: Transaction,
          as: "UserTransactions",
          attributes: ["id", "points", "type", "description"],
        },
      ],
    });

    res.status(200).json(nonAdminUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Points,
          attributes: ["totalPoints"],
        },
        {
          model: Transaction,
          as: "UserTransactions",
          attributes: ["id", "points", "type", "description"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//hay que hacer una ruta para que el usuario pueda establecer su mail si fue registrado por un admin

module.exports = {
  signUp,
  signIn,
  getAllUsers,
  signUpForAdmin,
  getUserById,
  verifyEmail,
  sendPasswordReset,
  resetPassword,
};
