// controllers/bookDemo.controller.js
import validator from "validator";
import BookDemo from "../models/BookDemo.model.js";
import { sendMail } from "../utils/mailer.js";

const brand = process.env.BRAND_NAME || "SportBit";
const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

function safe(str = "") {
  return String(str).trim();
}

function clientEmailTemplate({ name }) {
  return `
  <div style="font-family:Inter,Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
    <h2>Thanks for booking a demo with ${brand} 🎉</h2>
    <p>Hi ${name || "there"},</p>
    <p>We’ve received your demo request. Our team will reach out shortly to schedule a convenient time.</p>
    <p>Meanwhile, feel free to reply to this email with any specific goals or questions.</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <p style="font-size:12px;color:#666">This is an automated confirmation from ${brand}.</p>
  </div>`;
}

function adminEmailTemplate({ name, email, organization, message }) {
  return `
  <div style="font-family:Inter,Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
    <h2>New Demo Request</h2>
    <p><b>Name:</b> ${safe(name)}</p>
    <p><b>Email:</b> ${safe(email)}</p>
    <p><b>Organization:</b> ${safe(organization) || "-"}</p>
    <p><b>Message:</b><br/>${safe(message) || "-"}</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <p style="font-size:12px;color:#666">Open the CRM/DB to manage this lead.</p>
  </div>`;
}

export async function createBookDemo(req, res) {
  try {
    const { name, email, organization, message } = req.body || {};
    const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip;
    const ua = req.headers["user-agent"];
    const referrer = req.headers["referer"] || req.headers["referrer"];

    // Basic validation
    if (!name || !validator.isLength(name, { min: 2, max: 120 })) {
      return res.status(400).json({ message: "Please enter a valid name." });
    }
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email." });
    }
    if (organization && !validator.isLength(organization, { max: 200 })) {
      return res.status(400).json({ message: "Organization is too long." });
    }
    if (message && !validator.isLength(message, { max: 2000 })) {
      return res.status(400).json({ message: "Message is too long." });
    }

    // Save to DB
    const doc = await BookDemo.create({
      name: safe(name),
      email: email.toLowerCase().trim(),
      organization: safe(organization),
      message: safe(message),
      meta: { ip, ua, referrer },
    });

    // Send emails (fire sequentially to surface any errors)
    await sendMail({
      to: doc.email,
      subject: `We've received your demo request — ${brand}`,
      html: clientEmailTemplate({ name: doc.name }),
    });

    await sendMail({
      to: adminEmail,
      subject: `New Demo Request: ${doc.name} (${doc.email})`,
      html: adminEmailTemplate({
        name: doc.name,
        email: doc.email,
        organization: doc.organization,
        message: doc.message,
      }),
    });

    return res.status(201).json({
      message: "Demo request received! A confirmation email has been sent.",
      id: doc._id,
    });
  } catch (err) {
    console.error("BookDemo error:", err);
    return res
      .status(500)
      .json({ message: "Something went wrong while booking your demo." });
  }
}
