const addPoints = async (req, res) => {
  res.send("Ruta para agregar puntos");
  // try {
  //     const { adminId, userId, points, description } = req.body;
  //     const admin = await User.findByPk(adminId);

  //     if (admin.role !== 'admin') {
  //       return res.status(403).json({ error: 'No autorizado' });
  //     }

  //     const transaction = await Transaction.create({
  //       userId,
  //       adminId,
  //       points,
  //       type: 'add',
  //       description,
  //     });

  //     const userPoints = await Points.findOne({ where: { userId } });
  //     userPoints.totalPoints += points;
  //     await userPoints.save();

  //     res.status(201).json(transaction);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
};

const subtractPoints = async (req, res) => {
  res.send("Ruta para quitar puntos");
  //   try {
  //     const { adminId, userId, points, description } = req.body;
  //     const admin = await User.findByPk(adminId);

  //     if (admin.role !== 'admin') {
  //       return res.status(403).json({ error: 'No autorizado' });
  //     }

  //     const transaction = await Transaction.create({
  //       userId,
  //       adminId,
  //       points,
  //       type: 'subtract',
  //       description,
  //     });

  //     const userPoints = await Points.findOne({ where: { userId } });
  //     userPoints.totalPoints -= points;
  //     await userPoints.save();

  //     res.status(201).json(transaction);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
};

// Ruta para consultar los puntos de un usuario///////////
//   app.get('/points/:userId', async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const userPoints = await Points.findOne({ where: { userId } });

//       if (!userPoints) {
//         return res.status(404).json({ error: 'Usuario no encontrado' });
//       }

//       res.status(200).json(userPoints);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   });

module.exports = { addPoints, subtractPoints };
