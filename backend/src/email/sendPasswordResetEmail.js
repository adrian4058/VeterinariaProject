const transporter = require("./emailTransporter");

const sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Restablecimiento de contraseña",
    text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:3007/auth/reset-password?token=${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendPasswordResetEmail;
