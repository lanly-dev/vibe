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
- **shuffle**: Randomly shuffle array elements (Fisher-Yates algorithm)
- **randomChoice**: Pick a random element from an array
- **reverseString**: Reverse a string
- **charFrequency**: Count character occurrences in a string

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/lanly-dev/vibe.git
cd vibe
npm install
```

## Usage

### Command Line

Import the utilities in your code:

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

### Interactive Web Playground 🎮

Want to have fun with the utilities? Start the web server to access the interactive playground:

```bash
npm start
```

Then open your browser to `http://localhost:3000` and enjoy:
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
│   └── utils.js          # Utility functions
├── tests/
│   └── utils.test.js     # Test suite
├── examples/
│   └── usage.js          # Usage examples
├── index.js              # Main entry point
├── package.json          # Project configuration
└── README.md            # Documentation
```

## Fun Ideas to Try 🎉

This project is a playground for experimentation! Here are some fun things you can do:

1. **Play with the Interactive Playground** - Start the web server and try all the interactive features
2. **Add New Utilities** - Create your own helper functions (e.g., `slugify`, `truncate`, `camelCase`)
3. **Create Mini Games** - Use the utilities to build text-based games or puzzles
4. **Extend the UI** - Add more interactive cards to the playground (e.g., cipher encoder, word scrambler)
5. **Build a CLI Tool** - Create a command-line interface using the utilities
6. **Add More Fun Features**:
   - Random quote generator
   - Text-to-ASCII art converter
   - Password strength checker
   - Word game helpers (anagram finder, scrabble scorer)
   - Color palette generator
   - Markdown to HTML converter

## Development

This project was created to explore GitHub Copilot agent capabilities. Feel free to:
- Add new utility functions
- Improve existing implementations
- Expand the test coverage
- Experiment with different features
- Contribute your own fun ideas!

## License

ISC
