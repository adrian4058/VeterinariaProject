const transporter = require("./emailTransporter");

const sendWelcomeEmail = async (email, firstname) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Bienvenido a nuestra plataforma",
    text: `Hola ${firstname},\n\n¡Gracias por registrarte en nuestra plataforma! Estamos encantados de tenerte con nosotros.\n\nSaludos,\nEl equipo`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de bienvenida enviado");
  } catch (error) {
    console.error("Error al enviar el correo de bienvenida:", error);
  }
};

module.exports = sendWelcomeEmail;
