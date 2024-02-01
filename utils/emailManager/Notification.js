import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config()
const nodeMailerkey = process.env.nodeMailerkey;

 const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: nodeMailerkey,
    },
});
export const sendNotification=async(email,html,subject)=>{
    const mailOptions = {
        from: `DevAi <spidy12k@gmail.com>`,
        to: email, // Recipient email address
        subject,
        html
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
}