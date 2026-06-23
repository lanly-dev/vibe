# Vibe Setup Guide 🎵

This guide will help you set up and run the Vibe application locally.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- A GitHub account

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/lanly-dev/vibe.git
cd vibe
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a GitHub OAuth Application

To use Vibe, you need to create a GitHub OAuth application:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"** (or **"OAuth Apps"** → **"New OAuth App"**)
3. Fill in the application details:
   - **Application name**: `Vibe` (or any name you prefer)
   - **Homepage URL**: `http://localhost:3000`
   - **Application description**: Optional, e.g., "Organize GitHub starred repositories"
   - **Authorization callback URL**: `http://localhost:3000/auth/github/callback`
4. Click **"Register application"**
5. You'll see your **Client ID** on the next page
6. Click **"Generate a new client secret"** to create a **Client Secret**
7. **Important**: Copy both the Client ID and Client Secret - you'll need them in the next step

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit the `.env` file with your favorite text editor and add your GitHub OAuth credentials:

```env
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
SESSION_SECRET=your_random_session_secret_here
PORT=3000
NODE_ENV=development
```

**Important**: 
- Replace `your_github_client_id_here` with your actual GitHub Client ID
- Replace `your_github_client_secret_here` with your actual GitHub Client Secret
- For `SESSION_SECRET`, use a random string (e.g., run `openssl rand -base64 32` in your terminal)

### 5. Start the Application

```bash
npm start
```

You should see output like:

```
🎵 Vibe Server is running on port 3000
Visit http://localhost:3000 to view the application

GitHub OAuth Configuration:
- Client ID: ✓ Set
- Client Secret: ✓ Set

To configure GitHub OAuth, create a .env file based on .env.example
```

### 6. Use the Application

1. Open your browser and navigate to `http://localhost:3000`
2. Click **"Sign in with GitHub"**
3. Authorize the application when prompted by GitHub
4. You'll be redirected to the dashboard where you can see your starred repositories organized by topics, languages, and keywords!

## Features

### Dashboard

The dashboard provides several views of your starred repositories:

- **By Topics**: Groups repositories by their GitHub topics
- **By Languages**: Groups repositories by programming language
- **By Keywords**: Groups repositories by keywords found in their descriptions
- **All Repositories**: Shows all your starred repositories in one view

### Export Data

You can export your starred repositories data in two formats:

- **JSON**: Complete data including all metadata
- **CSV**: Spreadsheet-friendly format

Click the **Export JSON** or **Export CSV** buttons in the navbar to download your data.


## Running Tests

To run the test suite:

```bash
npm test
```

For test coverage:

```bash
npm run test:coverage
```

## Troubleshooting

### "Client ID: ✗ Not Set" or "Client Secret: ✗ Not Set"

This means your `.env` file is not properly configured. Make sure:
1. The `.env` file exists in the project root
2. The environment variables are correctly named (no typos)
3. The values don't have extra spaces or quotes

### Authentication Error

If you get an authentication error:
1. Verify your GitHub OAuth callback URL matches exactly: `http://localhost:3000/auth/github/callback`
2. Make sure your Client ID and Client Secret are correct
3. Check that your GitHub OAuth app is not suspended

### Port Already in Use

If port 3000 is already in use, you can change it in the `.env` file:

```env
PORT=3001
```

Remember to update your GitHub OAuth callback URL to match the new port!

### No Starred Repositories

If you don't have any starred repositories, the dashboard will show empty states. Star some repositories on GitHub first!

## Development

### Project Structure

```
vibe/
├── src/
│   ├── services/         # Business logic and API integrations
│   ├── routes/           # Express route handlers
│   ├── middleware/       # Express middleware
│   └── utils.js          # Utility functions
├── public/               # Static frontend files
├── tests/                # Test files
├── server.js             # Express server configuration
└── index.js              # Utility library entry point
```

### API Endpoints

- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/github/callback` - OAuth callback
- `POST /auth/logout` - Logout
- `GET /auth/status` - Check auth status
- `GET /api/starred` - Get all starred repos
- `GET /api/starred/classified` - Get classified repos
- `GET /api/export?format=json|csv` - Export data

## Security Notes

- Never commit your `.env` file to version control
- Keep your GitHub Client Secret secure
- The session secret should be a strong random string in production
- Use HTTPS in production environments

## Deploying to Render

The app is hosted on [Render](https://render.com) (e.g. `https://vibe-pasm.onrender.com`). Render auto-deploys from the `main` branch.

### 1. Create the Web Service (first time only)

1. Go to the [Render Dashboard](https://dashboard.render.com) → **New** → **Web Service**
2. Connect this GitHub repository
3. Configure the service:
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Branch**: `main`
4. Click **Create Web Service**. Render assigns a URL like `https://<your-app>.onrender.com`.

### 2. Create a GitHub OAuth App for Production

> **Note:** GitHub has **no API/CLI to create OAuth Apps** — you must use the web UI.

1. Go to [GitHub Developer Settings → OAuth Apps → New OAuth App](https://github.com/settings/applications/new)
2. Fill in the details (replace the URL with your Render URL):
   - **Application name**: `Vibe`
   - **Homepage URL**: `https://vibe-pasm.onrender.com`
   - **Authorization callback URL**: `https://vibe-pasm.onrender.com/auth/github/callback`
3. Click **Register application**
4. Copy the **Client ID**
5. Click **Generate a new client secret** and copy the **Client Secret**

### 3. Configure Environment Variables on Render

In your Render service → **Environment**, add:

| Key | Value |
| --- | --- |
| `GITHUB_CLIENT_ID` | your OAuth app Client ID |
| `GITHUB_CLIENT_SECRET` | your OAuth app Client Secret |
| `GITHUB_CALLBACK_URL` | `https://vibe-pasm.onrender.com/auth/github/callback` |
| `SESSION_SECRET` | a long random string (e.g. `openssl rand -base64 32`) |
| `NODE_ENV` | `production` |

> `PORT` is provided automatically by Render — do not set it manually.

### 4. Deploy

Save the environment variables and trigger a **Manual Deploy** (or push to `main` to auto-deploy). Once live, open your Render URL and click **Sign in with GitHub**.

> **OAuth App vs GitHub App:** This project uses an **OAuth App** (`client_id` + `client_secret` web flow), which is different from a **GitHub App**. Use the OAuth App steps above.

### Local + Production Together

To keep developing locally while production is live, either:
- Create a **second OAuth App** with `http://localhost:3000/...` URLs, or
- Add `http://localhost:3000/auth/github/callback` as an additional callback URL on the same OAuth App.

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment variables
2. Use a proper session store (not in-memory)
3. Enable HTTPS
4. Update your GitHub OAuth callback URL to your production domain
5. Use a strong session secret

## Support

If you encounter any issues:

1. Check this setup guide thoroughly
2. Review the [README.md](README.md) for additional information
3. Check the GitHub issues for similar problems
4. Create a new issue if your problem is unique

## License

ISC
