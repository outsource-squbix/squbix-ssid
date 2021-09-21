//Utility function for sending an email to the user after registering successfully
const nodemailer = require("nodemailer");

async function sendMail(recipient, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "appcheck.kyc@gmail.com",
      pass: process.env.MAILER_PASSWORD,
    },
  });

  await transporter.sendMail(
    {
      from: "appcheck.kyc@gmail.com",
      to: recipient,
      subject: "Registered Successfully",
      text: message,
    },
    (error, response) => {
      if (error) console.log(error);
      else console.log("Mail sent, ", response);
    }
  );
}

module.exports = sendMail;
