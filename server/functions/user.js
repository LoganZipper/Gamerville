
// server/functions/user.js

// This module handles user-related functions, such as generating unique IDs.

const ID_LENGTH = 4;
const generatedIDs = new Set(); // unique userID storage

// '0000' is off limits for admin testing
generatedIDs.add('0000')


/**
 * Generates a unique user ID.
 * @returns {string} A unique user ID.
 */
function generateID() {
  cleanThatShitUp();

  let generatedID = '0001';
  while(generatedIDs.has(generatedID))
    generatedID = generateRandom(ID_LENGTH);

  generatedIDs.add(generatedID)
  return generatedID;
}


/**
 * Generates a random string of a specified length.
 * @param {number} length - The length of the random string to generate.
 * @returns {string} A random string of the specified length.
 */
function generateRandom(length) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
}


/**
 * Cleans up the generated IDs set if it exceeds a certain size.
 * This prevents memory overflow by limiting the number of stored IDs.
 * Gonna have to experiment with the laptop for this one.
 * @returns {void}
 */
function cleanThatShitUp() {[]
  if(generatedIDs.length > 100)
    generatedIDs.shift();
}

module.exports = {
  generateID: generateID
}
