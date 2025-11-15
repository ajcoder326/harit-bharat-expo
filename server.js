import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Data files
const registrationsFile = path.join(__dirname, 'data', 'registrations.json');
const smtpConfigFile = path.join(__dirname, 'data', 'smtp-config.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Default SMTP config
const defaultSmtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: '',
    pass: '',
  },
  from: 'noreply@haritbharatexpo.com',
};

// Initialize files if they don't exist
if (!fs.existsSync(registrationsFile)) {
  fs.writeFileSync(registrationsFile, JSON.stringify([], null, 2));
}

if (!fs.existsSync(smtpConfigFile)) {
  fs.writeFileSync(smtpConfigFile, JSON.stringify(defaultSmtpConfig, null, 2));
}

// Helper functions
const getRegistrations = () => {
  try {
    const data = fs.readFileSync(registrationsFile, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveRegistrations = (registrations) => {
  fs.writeFileSync(registrationsFile, JSON.stringify(registrations, null, 2));
};

const getSmtpConfig = () => {
  try {
    const data = fs.readFileSync(smtpConfigFile, 'utf8');
    return JSON.parse(data);
  } catch {
    return defaultSmtpConfig;
  }
};

const saveSmtpConfig = (config) => {
  fs.writeFileSync(smtpConfigFile, JSON.stringify(config, null, 2));
};

// Routes

// Get all registrations
app.get('/api/registrations', (req, res) => {
  const registrations = getRegistrations();
  res.json(registrations);
});

// Add new registration
app.post('/api/registrations', async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const registrations = getRegistrations();
    const newRegistration = {
      id: Date.now().toString(),
      fullName,
      email,
      phone,
      registeredAt: new Date().toISOString(),
    };

    registrations.push(newRegistration);
    saveRegistrations(registrations);

    // Send confirmation email
    const smtpConfig = getSmtpConfig();
    if (smtpConfig.auth.user && smtpConfig.auth.pass) {
      try {
        const transporter = nodemailer.createTransport(smtpConfig);
        await transporter.sendMail({
          from: smtpConfig.from,
          to: email,
          subject: 'Registration Confirmed - Harit Bharat Expo',
          html: `
            <h2>Thank you for registering!</h2>
            <p>Hello ${fullName},</p>
            <p>Your registration for Harit Bharat Expo has been confirmed.</p>
            <p><strong>Event Details:</strong></p>
            <ul>
              <li>Dates: November 21-23, 2024</li>
              <li>Venue: Jodhpur, Rajasthan</li>
              <li>Expected Visitors: 35,000+</li>
            </ul>
            <p>We look forward to seeing you at the expo!</p>
            <p>Best regards,<br>Harit Bharat Expo Team</p>
          `,
        });
      } catch (emailError) {
        console.log('Email sending failed:', emailError.message);
      }
    }

    res.json({ success: true, registration: newRegistration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete registration
app.delete('/api/registrations/:id', (req, res) => {
  try {
    const { id } = req.params;
    let registrations = getRegistrations();
    registrations = registrations.filter((reg) => reg.id !== id);
    saveRegistrations(registrations);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get SMTP config
app.get('/api/smtp-config', (req, res) => {
  const config = getSmtpConfig();
  // Don't send the password to client for security
  res.json({
    host: config.host,
    port: config.port,
    secure: config.secure,
    from: config.from,
    authConfigured: !!(config.auth.user && config.auth.pass),
  });
});

// Update SMTP config
app.post('/api/smtp-config', (req, res) => {
  try {
    const { host, port, secure, auth, from } = req.body;

    if (!host || !port || !auth?.user || !auth?.pass) {
      return res.status(400).json({ error: 'Missing required SMTP fields' });
    }

    const config = {
      host,
      port: parseInt(port),
      secure: !!secure,
      auth: {
        user: auth.user,
        pass: auth.pass,
      },
      from: from || 'noreply@haritbharatexpo.com',
    };

    saveSmtpConfig(config);
    res.json({ success: true, config: { host, port, secure, from } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test SMTP connection
app.post('/api/smtp-test', async (req, res) => {
  try {
    const config = getSmtpConfig();
    const transporter = nodemailer.createTransport(config);
    await transporter.verify();
    res.json({ success: true, message: 'SMTP connection successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
