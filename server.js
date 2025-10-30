/**
 * Vibe - GitHub Starred Repository Classifier
 * Web server with GitHub OAuth and API integration
 */

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./src/routes/auth');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'vibe-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

// API Routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Dashboard page (protected)
app.get('/dashboard.html', (req, res) => {
  if (!req.session || !req.session.accessToken) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🎵 Vibe Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
  console.log(`\nGitHub OAuth Configuration:`);
  console.log(`- Client ID: ${process.env.GITHUB_CLIENT_ID ? '✓ Set' : '✗ Not Set'}`);
  console.log(`- Client Secret: ${process.env.GITHUB_CLIENT_SECRET ? '✓ Set' : '✗ Not Set'}`);
  console.log(`\nTo configure GitHub OAuth, create a .env file based on .env.example`);
});
