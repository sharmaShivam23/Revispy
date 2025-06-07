const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: process.env.MAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    });

    const info = await transporter.sendMail({
      from: `"Welcome to - ECOMMERCE" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    
    return true;
  } catch (error) {
    console.error("Error while sending email:", error.message);
    return false;
  }
};

module.exports = sendEmail;
