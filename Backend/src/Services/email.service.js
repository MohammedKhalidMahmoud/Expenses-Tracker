import transporter from '../config/email.config.js';

// Wrap in an async IIFE so we can use await.
export async function sendEmail (){
  const info = await transporter.sendMail({
    from: '"Me" <info@mailtrap.club>', // sender address
    to: "mokakhaled2001@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
  });

  console.log("Message sent:", info.messageId);
}