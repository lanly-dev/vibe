/**
 * Utility functions for the Vibe project
 */

/**
 * Capitalizes the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generates a random number between min and max (inclusive)
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} A random number between min and max
 */
function randomInt(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Both min and max must be numbers');
  }
  if (min > max) {
    throw new RangeError('min must be less than or equal to max');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks if a string is a palindrome
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is a palindrome, false otherwise
 */
function isPalindrome(str) {
  if (typeof str !== 'string') {
    return false;
  }
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Debounces a function call
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {Function} The debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Deep clones an object or array
 * @param {*} obj - The object to clone
 * @returns {*} A deep clone of the object
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (obj instanceof Object) {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

module.exports = {
  capitalize,
  randomInt,
  isPalindrome,
  debounce,
  deepClone
};
