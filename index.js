// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,  // true for 465, false for other ports
  auth: {
    user: 'projectsira7@gmail.com', // your Gmail address
    pass: 'sxer awkj ehuj ptuz', // your app password
  },
});

app.get('/', async(req, res) => {
    res.json({message: "Hello from nodejs server"});
})

// Route to handle welcome email
app.post('/send-welcome-email', async (req, res) => {
  const { email, displayName } = req.body;

  // Nodemailer transporter setup
  
  const mailOptions = {
    from: `"WellNest Team" <'wellnest-noreply@gmail.com'>`,
    to: email,
    subject: 'Welcome to WellNest!',
    text: `Hi ${displayName},\n\nThank you for joining WellNest! We're excited to have you as part of our community.\n\nBest regards,\nThe WellNest Team`,
    html: `<h2>Hi ${displayName},</h2><p>Thank you for joining WellNest! We're excited to have you as part of our community.</p><p>Best regards,<br>The WellNest Team</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Welcome email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send welcome email.' });
  }
});

app.post('/send-registration-confirmation', async (req, res) => {
    const { email, fullName } = req.body;
  
    const mailOptions = {
      from: `"WellNest Team" <'wellnest-noreply@gmail.com'>`,
      to: email,
      subject: 'Workshop Registration Successful!',
      html: `<h2>Hi ${fullName},</h2><p>Your registration for the workshop has been confirmed! We're excited to see you there.</p><p>We will get back to you within the next 2 business days with detailed information outlining the best solution for you workplace.</p><p>Best regards,<br>The WellNest Team</p>`
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Workshop registration confirmation email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send workshop registration confirmation email.' });
    }
  });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
