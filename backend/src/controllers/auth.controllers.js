//despues va a ser un post de los dos
const signUp = async (req, res) => {
  res.send("Ruta registro usuarios");
//   try {
//     const { username, password, email } = req.body;
//     const newUser = await User.create({ username, password, email });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
};

const signIn = async (req, res) => {
  res.send("Ruta inicio seción usuarios");
};

module.exports = { signUp, signIn };
