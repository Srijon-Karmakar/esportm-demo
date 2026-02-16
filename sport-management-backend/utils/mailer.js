// utils/mailer.js
import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  const host   = process.env.SMTP_HOST;
  const port   = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false") === "true";
  const user   = process.env.SMTP_USER;
  const pass   = (process.env.SMTP_PASS || "").replace(/\s+/g, ""); // strip spaces

  if (!host || !user || !pass) {
    throw new Error("SMTP env vars missing: SMTP_HOST/SMTP_USER/SMTP_PASS");
  }

  transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
  return transporter;
}

export async function verifyMailer() {
  try {
    await getTransporter().verify();
    console.log("✅ SMTP ready:", process.env.SMTP_HOST, process.env.SMTP_PORT, "secure:", String(process.env.SMTP_SECURE));
  } catch (e) {
    console.error("❌ SMTP verify failed:", e.message);
  }
}

export async function sendMail({ to, subject, html, text, from }) {
  const t = getTransporter();
  const mailFrom = from || `"${process.env.BRAND_NAME || "SportBit"}" <${process.env.SMTP_USER}>`;

  return t.sendMail({ from: mailFrom, to, subject, html, text });
}
