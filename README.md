# Vibe 🎵

A demonstration project showcasing GitHub Copilot agent capabilities. This repository serves as a playground for experimenting with AI-assisted development.

## Overview

Vibe is a Node.js utility library that provides common helper functions, demonstrating how GitHub Copilot agents can:
- Initialize and structure projects
- Write clean, well-documented code
- Create comprehensive test suites
- Set up development workflows

## Features

The library includes the following utilities:

- **capitalize**: Capitalize the first letter of a string
- **randomInt**: Generate random integers within a range
- **isPalindrome**: Check if a string is a palindrome
- **debounce**: Debounce function calls to limit execution frequency
- **deepClone**: Create deep copies of objects and arrays

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/lanly-dev/vibe.git
cd vibe
npm install
```

## Usage

Import the utilities in your code:

```javascript
const { capitalize, randomInt, isPalindrome, debounce, deepClone } = require('./index');

// Capitalize a string
console.log(capitalize('hello world')); // "Hello world"

// Generate a random number
console.log(randomInt(1, 10)); // Random number between 1 and 10

// Check for palindrome
console.log(isPalindrome('racecar')); // true

// Deep clone an object
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
```

See `examples/usage.js` for more detailed examples:

```bash
node examples/usage.js
```

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
│   └── utils.js          # Utility functions
├── tests/
│   └── utils.test.js     # Test suite
├── examples/
│   └── usage.js          # Usage examples
├── index.js              # Main entry point
├── package.json          # Project configuration
└── README.md            # Documentation
```

## Development

This project was created to explore GitHub Copilot agent capabilities. Feel free to:
- Add new utility functions
- Improve existing implementations
- Expand the test coverage
- Experiment with different features

## License

ISC
