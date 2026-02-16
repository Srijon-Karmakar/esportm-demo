import express from "express";
import ContactRequest from "../models/BookDemo.model.js";
import sendMail from "../utils/SendMail.js";       


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, club = "", message = "" } = req.body || {};
    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ ok: false, error: "Name and email required." });
    }

    const contact = await ContactRequest.create({
      name: name.trim(),
      email: email.trim(),
      club: club.trim(),
      message: message.trim(),
    });



    // formal+image 
    sendMail({
      to: contact.email,
      subject: "Your request has been received",
      html: `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#333;padding:20px;">
      <div style="text-align:center;">
        <img src="/Images/Logo/logo-black.png" alt="Senevon Logo" width="120" style="margin-bottom:20px;" />
      </div>
      <h3 style="margin-bottom:12px;">Hello ${contact.name},</h3>
      <p style="font-size:16px;color:#555;">
        Thank you for reaching out to <b>SportBit</b>. We have received your request and our team will review it shortly. 
        A member of our team will get back to you as soon as possible.
      </p>
      <p style="font-size:15px;color:#555;">
        If you require immediate assistance, you may reply to this email directly.
      </p>
      <hr style="margin:24px 0;border:0;border-top:1px solid #eee;" />
      <p style="font-size:14px;color:#777;">This is an automated confirmation. Please do not reply unless necessary.</p>
      <p style="margin-top:24px;">Best regards,</p>
      <p><b>The Sportbit Team</b></p>
    </div>
  `,
    });



    // EMAIL to admin (fire-and-forget)
    const adminTo = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (adminTo) {
      sendMail({
        to: adminTo,
        subject: "New Contact Request",
        text: `Name: ${contact.name}\nEmail: ${contact.email}\nClub: ${contact.whatsapp}\nMessage: ${contact.message}`,
      }).catch(e => console.error("admin mail error:", e?.message));
    }

    // WHATSAPP to client 
    if (contact.whatsapp) {
      
      const e164 = contact.whatsapp.startsWith("+")
        ? contact.whatsapp
        : `+91${contact.whatsapp}`;

      sendWhatsApp({
        to: e164,
        body: `Hi ${contact.name}, thanks for contacting Senevon! We’ll reach out soon.\n— Senevon Team`,
      }).catch(e => console.error("client WA error:", e?.message));
    }

    // WHATSAPP to admin (optional)
    if (process.env.WHATSAPP_ADMIN) {
      sendWhatsApp({
        to: process.env.WHATSAPP_ADMIN,
        body: `New contact:\nName: ${contact.name}\nEmail: ${contact.email}\nWhatsApp: ${contact.whatsapp || "-"}\nMessage: ${contact.message || "-"}`,
      }).catch(e => console.error("admin WA error:", e?.message));
    }

    return res.status(201).json({ ok: true, id: contact._id });
  } catch (err) {
    console.error("Contact error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

export default router;








