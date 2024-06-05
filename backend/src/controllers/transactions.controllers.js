const getTransactionUserId = async (req, res) => {
  res.send("Obtener historial transaccion por usuario");
  // try {
  //       const { userId } = req.params;
  //       const transactions = await Transaction.findAll({
  //         where: { userId },
  //         order: [['createdAt', 'DESC']],
  //       });

  //       res.status(200).json(transactions);
  //     } catch (error) {
  //       res.status(400).json({ error: error.message });
  //     }
  //   });
};

module.exports = { getTransactionUserId };
