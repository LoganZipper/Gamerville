
const { prepareNewSimpleGame } = require('./deck.js');
const { HandContainer } = require('../duffle.js');

const IDs = ['TEST'];
const mappedHands = new Map();
var currentPlayerIndex = 0;

newTestGame = function(playerIDs) {
    const casinoDeal = prepareNewSimpleGame(playerIDs);
    IDs.length = 0;
    IDs.push(...playerIDs);
    playerIDs.forEach(id => {
        mappedHands.set(id, casinoDeal.pop() || new HandContainer());
    });
    return mappedHands;
}

resumeTestGame = function(playerIDs) {
    playerIDs.forEach(id => {
        mappedHands.get(id);
    });
    return mappedHands;
}

nextTurn = function() {
    currentPlayerIndex = (currentPlayerIndex + 1) % playerIDs.length;
}

// drawCard - Where drawing card ends current turn
// drawCard = function(playerID) {
//     const playerHand = mappedHands.get(playerID);
//     if (playerHand) {
//         const card = playerHand.drawCard();
//         nextTurn();
//         return card;
//     }
//     return null;
// }


getCurrentPlayer = function(playerIDs) {
    console.log('Current Player Index:', currentPlayerIndex);
    console.log('Player IDs:', playerIDs);
    // return (this.playerIDs && this.playerIDs[currentPlayerIndex]) ? this.playerIDs[currentPlayerIndex] : '0000';
    return (IDs && IDs[currentPlayerIndex]) ? IDs[currentPlayerIndex] : '0000';
    
}

getPlayerExists = function(UID) {
    if(IDs.includes(UID))
        return true
    return false
}


module.exports = {
    newTestGame,
    resumeTestGame,
    // drawCard,
    getCurrentPlayer,
    getPlayerExists
  };