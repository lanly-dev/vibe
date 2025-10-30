/**
 * Authentication routes for GitHub OAuth
 */

const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * Initiate GitHub OAuth flow
 */
router.get('/github', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = process.env.GITHUB_CALLBACK_URL;
  const scope = 'read:user user:email';

  if (!clientId) {
    return res.status(500).json({ error: 'GitHub OAuth not configured' });
  }

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  res.redirect(githubAuthUrl);
});

/**
 * GitHub OAuth callback
 */
router.get('/github/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.redirect('/?error=no_code');
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_CALLBACK_URL
      },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    const { access_token } = tokenResponse.data;

    if (!access_token) {
      return res.redirect('/?error=no_token');
    }

    // Get user info
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${access_token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    // Store in session
    req.session.accessToken = access_token;
    req.session.user = {
      id: userResponse.data.id,
      login: userResponse.data.login,
      name: userResponse.data.name,
      avatarUrl: userResponse.data.avatar_url
    };

    res.redirect('/dashboard.html');
  } catch (error) {
    console.error('GitHub OAuth error:', error.message);
    res.redirect('/?error=auth_failed');
  }
});

/**
 * Logout
 */
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

/**
 * Check authentication status
 */
router.get('/status', (req, res) => {
  if (req.session && req.session.user) {
    res.json({
      authenticated: true,
      user: req.session.user
    });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
