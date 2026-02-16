// routes/DemoRoutes.js
import express from 'express';
import DemoRequest from '../models/DemoRequest.js';
import sendMail from '../utils/SendMail.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, club, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    const demo = await new DemoRequest({ name, email, club, message }).save(); // saves OK
    // ^ this part is already working in your app 

    const adminTo = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

    // send both, and await so we can surface any error in logs
    await Promise.all([
      sendMail({
        to: email,
        subject: 'Your SportBit demo request',
        template: 'demoConfirm',
        context: { name },
      }),
      sendMail({
        to: adminTo,
        subject: `New Demo Request: ${name} (${email})`,
        html: `
          <div style="font-family:Inter,Arial,sans-serif;line-height:1.6">
            <h2>New Demo Request</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Organization:</b> ${club || '-'}</p>
            <p><b>Message:</b> ${message || '-'}</p>
          </div>`,
      }),
    ]);

    res.status(201).json({ message: 'Demo booked successfully.' });
  } catch (err) {
    console.error("Book demo mail error:", err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;
