/**
 * Example usage of the Vibe utility functions
 */

const { capitalize, randomInt, isPalindrome, debounce, deepClone, shuffle, randomChoice, reverseString, charFrequency } = require('../index');

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

// Example 6: Shuffle arrays
console.log('\n=== Shuffle Example ===');
const cards = ['♠A', '♥K', '♦Q', '♣J', '♠10'];
console.log('Original:', cards);
console.log('Shuffled:', shuffle(cards));
console.log('Original unchanged:', cards);

// Example 7: Random choice from array
console.log('\n=== Random Choice Example ===');
const fruits = ['🍎 Apple', '🍌 Banana', '🍊 Orange', '🍇 Grapes', '🍓 Strawberry'];
console.log('Random fruit:', randomChoice(fruits));
console.log('Another random fruit:', randomChoice(fruits));

// Example 8: Reverse strings
console.log('\n=== Reverse String Example ===');
console.log('Original: "hello"');
console.log('Reversed:', reverseString('hello'));
console.log('Original: "GitHub Copilot"');
console.log('Reversed:', reverseString('GitHub Copilot'));

// Example 9: Character frequency
console.log('\n=== Character Frequency Example ===');
const text = 'hello world';
console.log('Text:', text);
console.log('Character frequency:', charFrequency(text));
