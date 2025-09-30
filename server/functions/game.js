
const { prepareNewSimpleGame } = require('./deck.js');
const { HandContainer } = require('../duffle.js');

const IDs = ['TEST'];
var currentPlayerIndex = 0;

newTestGame = function(playerIDs) {
    const casinoDeal = prepareNewSimpleGame();
    const mappedHands = new Map();
    IDs.length = 0;
    IDs.push(...playerIDs);
    console.log('AAAHHH', IDs);
    playerIDs.forEach(id => {
        mappedHands.set(id, casinoDeal.pop() || new HandContainer());
    });
    console.log('Mapped Hands:', mappedHands);
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


getCurrentPlayer = function() {
    console.log('Current Player Index:', currentPlayerIndex);
    console.log('Player IDs:', IDs);
    return (this.playerIDs && this.playerIDs[currentPlayerIndex]) ? this.playerIDs[currentPlayerIndex] : '0000';
}


module.exports = {
    newTestGame,
    // drawCard,
    getCurrentPlayer
  };