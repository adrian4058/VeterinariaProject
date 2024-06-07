const { User, Points, Transaction } = require("../database/db");

const addPoints = async (req, res) => {
  try {
    const { adminId, userId, points, description } = req.body;
    const admin = await User.findOne({ where: { id: adminId } });

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "No autorizado" });
    }

    const transaction = await Transaction.create({
      userId,
      adminId,
      points,
      type: "add",
      description,
    });

    const userPoints = await Points.findOne({ where: { userId } });

    if (!userPoints) {
      return res.status(404).json({ error: "Puntos de usuario no encontrados" });
    }

    userPoints.totalPoints += points;
    await userPoints.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const subtractPoints = async (req, res) => {
  try {
    const { adminId, userId, points, description } = req.body;
    const admin = await User.findByPk(adminId);

    if (admin.role !== "admin") {
      return res.status(403).json({ error: "No autorizado" });
    }

    const userPoints = await Points.findOne({ where: { userId } });

    if (!userPoints) {
      return res.status(404).json({ error: "El usuario no tiene puntos registrados" });
    }

    if (userPoints.totalPoints < points) {
      return res.status(400).json({ error: "El usuario no tiene suficientes puntos para restar" });
    }

    userPoints.totalPoints -= points;
    await userPoints.save();

    const transaction = await Transaction.create({
      userId,
      adminId,
      points,
      type: "subtract",
      description,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPointsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPoints = await Points.findOne({ where: { userId } });

    if (!userPoints) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(userPoints);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addPoints, subtractPoints, getPointsByUser };
