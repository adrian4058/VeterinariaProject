// Ruta para consultar el historial de transacciones de un usuario
// app.get('/transactions/:userId', async (req, res) => {
//     try {
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