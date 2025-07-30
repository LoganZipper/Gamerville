const ID_LENGTH = 4;
const generatedIDs = [];

function generateID() {
  cleanThatShitUp();

  let generatedID = '0001';
  while(!(generatedID in generatedIDs))
  {
    generatedID = generateRandom(ID_LENGTH);
  }
  if(!(generatedID in generatedIDs))
    generatedIDs.push(generatedID)
  return generatedID;
}

function generateRandom(length) {
  let result = '';
  while (result.length < length) {
    // Base 36 includes 0-9 and a-z, providing alphanumeric characters
    result += Math.random().toString(36).slice(2);
  }
  // Trim the string to the desired length if it exceeds it
  return result.slice(0, length);
}

function cleanThatShitUp() {
  if(generatedIDs.length > 100)
    generatedIDs.shift();
}

module.exports = {
  generateID: generateID
}
