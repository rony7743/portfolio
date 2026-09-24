const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Transporter configuration for Nodemailer
const emailPass = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: emailPass,
  },
});

// Health check route
app.get('/', (req, res) => {
  res.send('Portfolio Contact Backend is running smoothly.');
});

// Contact endpoint
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please provide all required fields: name, email, subject, and message.' });
  }

  const receiverEmail = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;

  // 1. Email notification to website owner (Mahfuj Alam)
  const ownerMailOptions = {
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: receiverEmail,
    replyTo: email,
    subject: `New Message from ${name}: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #0563bb; border-bottom: 2px solid #0563bb; padding-bottom: 8px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p style="font-size: 12px; color: #777; margin-top: 20px;">
          You can reply directly to this email to respond to ${name}.
        </p>
      </div>
    `,
  };

  // 2. Auto-reply confirmation email to the visitor
  const visitorMailOptions = {
    from: `"Mahfuj Alam" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for contacting me, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #0563bb;">Hello ${name},</h2>
        <p>Thank you for getting in touch! I have successfully received your message regarding <strong>"${subject}"</strong>.</p>
        <p>I will reply to your email as soon as possible.</p>
        <br />
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-weight: bold; color: #333;">Your Message Details:</p>
          <p style="margin: 0; white-space: pre-wrap; color: #555;">${message}</p>
        </div>
        <br />
        <p>Best regards,</p>
        <p style="margin-bottom: 4px;"><strong>Mahfuj Alam</strong></p>
        <p style="margin: 0; color: #666; font-size: 13px;">Full Stack Web Developer</p>
        <p style="margin: 0; color: #666; font-size: 13px;">Email: <a href="mailto:${receiverEmail}">${receiverEmail}</a></p>
      </div>
    `,
  };

  try {
    // Send both emails concurrently
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(visitorMailOptions),
    ]);

    res.status(200).json({
      message: 'Your message has been sent successfully! A confirmation email has also been sent to your inbox.',
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      error: error.message || 'Failed to send message. Please check the email server configuration.',
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
status(200).json({
      message: 'Your message has been sent successfully! A confirmation email has also been sent to your inbox.',
    });

    res.status(200).json({ message: 'Message stored successfully', id: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to store message' });
  } finally {
    await client.close(); 
    console.error('Email sending error:', error);
    res.status(500).json({
      error: 'Failed to send message. Please check the email server configuration.',
    });
  }
});

app.listen(port, () => {
  console.log('Server is running on', port);
  console.log(`Server is running on port ${port}`);
});
