const transporter = require("./emailTransporter");

const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `http://localhost:3007/auth/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Verifica tu cuenta",
    text: `Hola,\n\nPor favor verifica tu cuenta haciendo clic en el siguiente enlace:\n${verificationUrl}\n\nSaludos,\nEl equipo`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de verificación enviado");
  } catch (error) {
    console.error("Error al enviar el correo de verificación:", error);
  }
};

module.exports = sendVerificationEmail;
