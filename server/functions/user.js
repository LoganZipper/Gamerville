const ID_LENGTH = 4;
const generatedIDs = new Set();

generatedIDs.add('0000')

function generateID() {
  cleanThatShitUp();

  let generatedID = '0001';
  while(generatedIDs.has(generatedID))
  {
    generatedID = generateRandom(ID_LENGTH);
  }
  generatedIDs.add(generatedID)
  return generatedID;
}

function generateRandom(length) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
}

function cleanThatShitUp() {[]
  if(generatedIDs.length > 100)
    generatedIDs.shift();
}

module.exports = {
  generateID: generateID
}
