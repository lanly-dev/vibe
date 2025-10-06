/**
 * Example usage of the Vibe utility functions
 */

const { capitalize, randomInt, isPalindrome, debounce, deepClone } = require('../index');

// Example 1: Capitalize strings
console.log('=== Capitalize Examples ===');
console.log(capitalize('hello world')); // "Hello world"
console.log(capitalize('github copilot')); // "Github copilot"

// Example 2: Generate random integers
console.log('\n=== Random Integer Examples ===');
console.log('Random number between 1 and 10:', randomInt(1, 10));
console.log('Random number between 1 and 100:', randomInt(1, 100));

// Example 3: Check palindromes
console.log('\n=== Palindrome Examples ===');
console.log('Is "racecar" a palindrome?', isPalindrome('racecar')); // true
console.log('Is "hello" a palindrome?', isPalindrome('hello')); // false
console.log('Is "A man a plan a canal Panama" a palindrome?', 
  isPalindrome('A man a plan a canal Panama')); // true

// Example 4: Debounce function calls
console.log('\n=== Debounce Example ===');
let counter = 0;
const incrementCounter = () => {
  counter++;
  console.log('Counter:', counter);
};
const debouncedIncrement = debounce(incrementCounter, 1000);

console.log('Calling debounced function 5 times rapidly...');
debouncedIncrement();
debouncedIncrement();
debouncedIncrement();
debouncedIncrement();
debouncedIncrement();
console.log('Counter will only increment once after 1 second');

// Example 5: Deep clone objects
console.log('\n=== Deep Clone Example ===');
const original = {
  name: 'Vibe Project',
  stats: {
    stars: 100,
    forks: 20
  },
  tags: ['nodejs', 'copilot', 'demo']
};

const cloned = deepClone(original);
cloned.stats.stars = 200;
cloned.tags.push('utility');

console.log('Original stats.stars:', original.stats.stars); // 100
console.log('Cloned stats.stars:', cloned.stats.stars); // 200
console.log('Original tags:', original.tags); // ['nodejs', 'copilot', 'demo']
console.log('Cloned tags:', cloned.tags); // ['nodejs', 'copilot', 'demo', 'utility']
