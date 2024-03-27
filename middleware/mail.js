const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "atiqurrehman01m@gmail.com",
        pass: "wphbxzhyptrcqpuq",
      },
    });

    const mailOptions = {
      from: "admin@gmail.com",
      to: email,
      subject: "My App Email Address confirmation",
      text: `Your OTP is for confirming your email in my App: ${otp}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return info.response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error to be caught and handled elsewhere
  }
};

module.exports = { sendConfirmationEmail };
