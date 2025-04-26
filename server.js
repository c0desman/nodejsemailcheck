require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5550;

// Create transporter object
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: true, // true for SSL
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Endpoint to send email
app.get('/send-email', async (req, res) => {
    try {
        const mailOptions = {
            from: `"Halal Food Orders" <${process.env.SMTP_USER}>`,
            to: process.env.TO_EMAIL,
            subject: 'Test Email from Node.js (async/await)',
            text: 'Hello Taufiq, this is a test email sent from a Node.js backend using async/await!',
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent successfully:', info.response);
        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});