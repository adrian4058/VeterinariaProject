const { User, Points, Transaction } = require("../database/db");

//simplificar lista de dni

const getTransactionUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const transactions = await Transaction.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTransactionById = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const transaction = await Transaction.findByPk(transactionId);
    if (!transaction) {
      return res.status(404).json({ error: "Transacci|1ón no encontrada" });
    }

    const user = await User.findByPk(transaction.userId, {
      include: [Points],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const pointsAdjustment = transaction.type === "add" ? -transaction.points : transaction.points;

    const userPoints = user.Points[0];
    userPoints.totalPoints += pointsAdjustment;
    await userPoints.save();

    await transaction.destroy();

    res
      .status(200)
      .json({ message: "Transacción eliminada y puntos actualizados", totalPoints: userPoints.totalPoints });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTransactionUserId, deleteTransactionById };
