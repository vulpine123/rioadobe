import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'data.json');

// Ensure data file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ contacts: [], newsletters: [], surveys: [] }));
}

// API Endpoints
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  data.contacts.push({ name, email, message, date: new Date().toISOString() });
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true, message: 'Contact form submitted successfully!' });
});

app.post('/api/survey', (req, res) => {
  const surveyData = req.body;
  if (!surveyData.name || !surveyData.email) {
    return res.status(400).json({ error: 'Name and email are required for the survey.' });
  }
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  if (!data.surveys) data.surveys = [];
  data.surveys.push({ ...surveyData, date: new Date().toISOString() });
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true, message: 'Survey submitted successfully!' });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  if (data.newsletters.includes(email)) return res.status(400).json({ error: 'Email already subscribed.' });
  data.newsletters.push(email);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  res.json({ success: true, message: 'Subscribed to newsletter!' });
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || 'rio-admin';
  const adminPass = process.env.ADMIN_PASSWORD || '!9934fdjBFJGEfhjdh..49884h';
  if (username === adminUser && password === adminPass) {
    res.json({ success: true, token: 'mock-token' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/admin/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
