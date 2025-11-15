import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

app.use(cors({ origin: '*' }));
app.use(express.json());

// Root
app.get('/', (req, res) => {
  res.json({ 
    message: 'Harit Bharat Expo API',
    status: 'running',
    database: 'Supabase PostgreSQL'
  });
});

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('registered_at', { ascending: false });
    
    if (error) throw error;
    res.json(data || []);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add registration
app.post('/api/registrations', async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;
    if (!fullName || !email || !phone) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    
    const { data, error } = await supabase
      .from('registrations')
      .insert([{ 
        full_name: fullName, 
        email, 
        phone,
        registered_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    res.json({ success: true, registration: data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete registration
app.delete('/api/registrations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// SMTP Config - Get
app.get('/api/smtp-config', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('smtp_config')
      .select('*')
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    
    const config = data || {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      from: 'noreply@haritbharatexpo.com',
      recipients: ''
    };
    
    res.json({
      ...config,
      authConfigured: !!(data?.auth_user && data?.auth_pass)
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// SMTP Config - Update
app.post('/api/smtp-config', async (req, res) => {
  try {
    const { host, port, secure, auth, from, recipients } = req.body;
    
    const { error } = await supabase
      .from('smtp_config')
      .upsert({
        id: 1,
        host,
        port,
        secure,
        auth_user: auth.user,
        auth_pass: auth.pass,
        from,
        recipients
      });
    
    if (error) throw error;
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// SMTP Test
app.post('/api/smtp-test', async (req, res) => {
  try {
    const { data } = await supabase
      .from('smtp_config')
      .select('auth_user, auth_pass')
      .single();
    
    if (!data?.auth_user || !data?.auth_pass) {
      return res.status(400).json({ error: 'SMTP not configured' });
    }
    
    res.json({ success: true, message: 'Config valid' });
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default app;
