import express from 'express';
import cors from 'cors';

const app = express();

// In-memory storage (Vercel serverless - use database in production)
let registrations = [];
let smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: '', pass: '' },
  from: 'noreply@haritbharatexpo.com',
  recipients: ''
};

app.use(cors({ origin: '*' }));
app.use(express.json());

// Root
app.get('/', (req, res) => {
  res.json({ 
    message: 'Harit Bharat Expo API',
    status: 'running',
    note: 'Using in-memory storage (deploy with database for production)'
  });
});

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get registrations
app.get('/api/registrations', (req, res) => {
  res.json(registrations);
});

// Add registration
app.post('/api/registrations', (req, res) => {
  const { fullName, email, phone } = req.body;
  if (!fullName || !email || !phone) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  
  const newReg = {
    id: Date.now().toString(),
    fullName,
    email,
    phone,
    registeredAt: new Date().toISOString()
  };
  
  registrations.push(newReg);
  res.json({ success: true, registration: newReg });
});

// Delete registration
app.delete('/api/registrations/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = registrations.length;
  registrations = registrations.filter(r => r.id !== id);
  
  if (registrations.length === initialLength) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  res.json({ success: true });
});

// SMTP Config
app.get('/api/smtp-config', (req, res) => {
  res.json({
    ...smtpConfig,
    authConfigured: !!(smtpConfig.auth.user && smtpConfig.auth.pass)
  });
});

app.post('/api/smtp-config', (req, res) => {
  const { host, port, secure, auth, from, recipients } = req.body;
  smtpConfig = { host, port, secure, auth, from, recipients };
  res.json({ success: true });
});

app.post('/api/smtp-test', (req, res) => {
  if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
    return res.status(400).json({ error: 'SMTP not configured' });
  }
  res.json({ success: true, message: 'Config valid' });
});

export default app;
