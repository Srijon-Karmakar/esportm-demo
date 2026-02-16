import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export default async function sendMail({ to, subject, template, context }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  transporter.use(
    'compile',
    hbs({
      viewEngine: { extname: '.hbs', layoutsDir: 'views/', defaultLayout: false },
      viewPath: 'views/', extName: '.hbs',
    })
  );

  await transporter.sendMail({
    from: `"SportBit" <${process.env.SMTP_USER}>`,
    to,
    subject,
    template,
    context, // injected into .hbs
  });
}
