import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmail = async (email, subject, message) => {
  await transporter.sendMail({
    from: `"DeerBooks" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: subject,
    text: message,
  });
};

export default sendEmail;
