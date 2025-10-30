# Vibe 🎵

A web application that helps you organize and discover patterns in your GitHub starred repositories using AI-powered classification.

## Overview

Vibe is a full-stack Node.js application that provides:
- **GitHub OAuth Authentication** - Secure login with your GitHub account
- **Repository Classification** - Automatic grouping by topics, languages, and keywords
- **Interactive Dashboard** - Beautiful UI to browse and explore your starred repos
- **Data Export** - Export your classified repositories as JSON or CSV
- **Utility Library** - Collection of helpful JavaScript utility functions

## Features

### GitHub Repository Management
- 🔐 **Secure Authentication** - OAuth integration with GitHub
- 📊 **Smart Classification** - Automatically group repositories by:
  - Topics (tags assigned to repositories)
  - Programming languages
  - Keywords in descriptions
- 🎯 **Interactive Dashboard** - Browse your starred repos in a beautiful interface
- 📤 **Export Functionality** - Download your data as JSON or CSV
- 🔍 **Statistics Overview** - See totals for repos, topics, languages, and keywords

### Utility Library

The included utility library provides:
- **capitalize**: Capitalize the first letter of a string
- **randomInt**: Generate random integers within a range
- **isPalindrome**: Check if a string is a palindrome
- **debounce**: Debounce function calls to limit execution frequency
- **deepClone**: Create deep copies of objects and arrays
- **shuffle**: Randomly shuffle array elements (Fisher-Yates algorithm)
- **randomChoice**: Pick a random element from an array
- **reverseString**: Reverse a string
- **charFrequency**: Count character occurrences in a string

## Installation

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/lanly-dev/vibe.git
cd vibe
npm install
```

2. Set up GitHub OAuth:

   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in the application details:
     - **Application name**: Vibe (or your preferred name)
     - **Homepage URL**: `http://localhost:3000`
     - **Authorization callback URL**: `http://localhost:3000/auth/github/callback`
   - Click "Register application"
   - Copy your Client ID and Client Secret

3. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

4. Edit the `.env` file with your GitHub OAuth credentials:

```env
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
SESSION_SECRET=your_random_session_secret_here
PORT=3000
NODE_ENV=development
```

5. Start the application:

```bash
npm start
```

6. Open your browser to `http://localhost:3000`

## Usage

### Web Application

1. **Sign In**: Click "Sign in with GitHub" on the home page
2. **Authorize**: Grant Vibe access to view your starred repositories
3. **Explore**: Browse your repositories organized by topics, languages, and keywords
4. **Export**: Download your data in JSON or CSV format

### Utility Library

Import the utilities in your Node.js code:

```javascript
const { capitalize, randomInt, isPalindrome, debounce, deepClone, shuffle, randomChoice, reverseString, charFrequency } = require('./index');

// Capitalize a string
console.log(capitalize('hello world')); // "Hello world"

// Generate a random number
console.log(randomInt(1, 10)); // Random number between 1 and 10

// Check for palindrome
console.log(isPalindrome('racecar')); // true

// Shuffle an array
console.log(shuffle([1, 2, 3, 4, 5])); // [3, 1, 5, 2, 4] (random order)

// Pick a random element
console.log(randomChoice(['apple', 'banana', 'orange'])); // Random fruit

// Reverse a string
console.log(reverseString('hello')); // "olleh"

// Count character frequency
console.log(charFrequency('hello')); // { h: 1, e: 1, l: 2, o: 1 }
```

See `examples/usage.js` for more detailed examples:

```bash
node examples/usage.js
```

### Interactive Playground 🎮

Want to try the utility functions? Visit the playground at `/playground.html`:

- ✨ Text Capitalizer
- 🎲 Lucky Number Generator with statistics
- 🔄 Palindrome Detective
- 😂 Random Programming Joke Generator
- 🌧️ Emoji Rain animation
- 📊 Text Analyzer with word count, character frequency, and more!

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

## Project Structure

```
vibe/
├── src/
│   ├── utils.js              # Utility functions
│   ├── services/
│   │   └── githubService.js  # GitHub API integration
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   └── api.js            # API routes
│   └── middleware/
│       └── auth.js           # Authentication middleware
├── public/
│   ├── dashboard.html        # Main dashboard UI
│   └── playground.html       # Utility playground
├── tests/
│   └── utils.test.js         # Test suite
├── examples/
│   └── usage.js              # Usage examples
├── server.js                 # Express server
├── index.js                  # Utility library entry point
├── package.json              # Project configuration
├── .env.example              # Environment variables template
└── README.md                 # Documentation
```

## API Endpoints

### Authentication
- `GET /auth/github` - Initiate GitHub OAuth flow
- `GET /auth/github/callback` - OAuth callback handler
- `POST /auth/logout` - Logout user
- `GET /auth/status` - Check authentication status

### Repository Management
- `GET /api/starred` - Get all starred repositories
- `GET /api/starred/classified` - Get classified repositories
- `GET /api/export?format=json|csv` - Export repository data

## Future Enhancements 🚀

Ideas for extending Vibe:

1. **Manual Grouping** - Allow users to create custom groups and manually organize repositories
2. **Search & Filter** - Add search functionality and advanced filtering options
3. **Analytics** - Show trends in your starring patterns over time
4. **Recommendations** - Suggest similar repositories based on your interests
5. **Sharing** - Generate shareable links to your organized repository collections
6. **Tags & Notes** - Add personal tags and notes to repositories
7. **GitHub Actions Integration** - Automatically update classifications when you star new repos
8. **Advanced Classification** - Use ML/AI for more intelligent grouping
9. **Multi-User Support** - Compare starred repos with friends or team members
10. **Mobile App** - Create a mobile version for on-the-go access

## Development

This project was created to explore GitHub Copilot agent capabilities. Feel free to:
- Add new utility functions
- Improve existing implementations
- Expand the test coverage
- Experiment with different features
- Contribute your own fun ideas!

## License

ISC