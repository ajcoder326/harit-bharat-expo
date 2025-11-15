import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Allow all origins for testing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data directory
const dataDir = path.join(__dirname, 'data');
const registrationsFile = path.join(dataDir, 'registrations.json');
const smtpConfigFile = path.join(dataDir, 'smtp-config.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
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
  recipients: ''
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

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Harit Bharat Expo API Server',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      registrations: 'GET /api/registrations, POST /api/registrations, DELETE /api/registrations/:id',
      smtp: 'GET /api/smtp-config, POST /api/smtp-config, POST /api/smtp-test'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all registrations
app.get('/api/registrations', (req, res) => {
  try {
    const registrations = getRegistrations();
    res.json(registrations);
  } catch (error) {
    console.error('Error getting registrations:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add new registration
app.post('/api/registrations', (req, res) => {
  try {
    console.log('Received registration:', req.body);
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

    console.log('Registration saved successfully:', newRegistration);
    res.json({ success: true, registration: newRegistration });
  } catch (error) {
    console.error('Error saving registration:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete registration
app.delete('/api/registrations/:id', (req, res) => {
  try {
    const { id } = req.params;
    let registrations = getRegistrations();
    const initialLength = registrations.length;
    registrations = registrations.filter((reg) => reg.id !== id);
    
    if (registrations.length === initialLength) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    
    saveRegistrations(registrations);
    res.json({ success: true, message: 'Registration deleted' });
  } catch (error) {
    console.error('Error deleting registration:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get SMTP config
app.get('/api/smtp-config', (req, res) => {
  try {
    const config = getSmtpConfig();
    res.json({
      host: config.host,
      port: config.port,
      secure: config.secure,
      from: config.from,
      recipients: config.recipients || '',
      authConfigured: !!(config.auth.user && config.auth.pass),
    });
  } catch (error) {
    console.error('Error getting SMTP config:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update SMTP config
app.post('/api/smtp-config', (req, res) => {
  try {
    const { host, port, secure, auth, from, recipients } = req.body;

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
      recipients: recipients || ''
    };

    saveSmtpConfig(config);
    res.json({ success: true, config: { host, port, secure, from, recipients } });
  } catch (error) {
    console.error('Error saving SMTP config:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test SMTP connection
app.post('/api/smtp-test', (req, res) => {
  try {
    const config = getSmtpConfig();

    if (!config.auth.user || !config.auth.pass) {
      return res.status(400).json({ error: 'SMTP credentials not configured' });
    }

    if (!config.host || !config.port) {
      return res.status(400).json({ error: 'SMTP host or port missing' });
    }

    res.json({ success: true, message: 'SMTP configuration is valid' });
  } catch (error) {
    console.error('Error testing SMTP:', error);
    res.status(400).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`🌍 Listening on all interfaces (0.0.0.0:${PORT})`);
  console.log('\n📍 API Routes:');
  console.log('  GET  / - API info');
  console.log('  GET  /api/health - Health check');
  console.log('  GET  /api/registrations');
  console.log('  POST /api/registrations');
  console.log('  DELETE /api/registrations/:id');
  console.log('  GET  /api/smtp-config');
  console.log('  POST /api/smtp-config');
  console.log('  POST /api/smtp-test\n');
});
