


const duffle = require('../duffle'); // Adjust path as needed


  const Standard = 'standard';
  const Euchre = 'euchre';
  const Spitzer = 'spitzer';
  const Experimental = 'experimental';


  //    ╭────────────────────╮
  //    │  Card Preferences  │
  //    ╰────────────────────╯


  function selectDeck(deckType) {
    this.selectedDeck = deckType;
  }

  function generateDeck() {
    switch (this.selectedDeck) {
      case Euchre:
        return this.createEuchreDeck();
      case Spitzer:
        return this.createSpitzerDeck();
      case Experimental:
      default:
        return this.createFullDeck();
    }
  }

  //    ╭───────────────────────────╮
  //    │  Card Generation Methods  │
  //    ╰───────────────────────────╯


   /**
     * Creates a standard deck of cards with 52 unique cards.
     * Each card has a suit and a rank.
     * @returns An array of Card objects representing the deck.
     */
    function createFullDeck() {
      const deck = [];

      for (const suit of Suits) {
        for (const rank of Ranks) {
          deck.push(new PlayingCard(suit, rank));
        }
      }
      return deck;
    }


    /**
     * Creates a Euchre deck with 24 unique cards.
     * Each card has a suit and a rank.
     * @returns An array of Card objects representing the Euchre deck.
     */
    function createEuchreDeck() {
      const deck = [];

      for (const suit of Suits) {
        for (const rank of Ranks) {
          deck.push(new PlayingCard(suit, rank));
        }
      }
      return deck;
    }


    /**
     * Creates a Spitzer deck with 32 unique cards.
     * Each card has a suit and a rank.
     * @returns An array of Card objects representing the Spitzer deck.
     */
    function createSpitzerDeck() {
      const deck = [];

      for (const suit of Suits) {
        for (const rank of Ranks) {
          deck.push(new PlayingCard(suit, rank));
        }
      }
      return deck;
    }


//    ╭───────────────────╮
//    │  Private Methods  │
//    ╰───────────────────╯

  /**
   * Shuffles the deck of cards using the Fisher-Yates algorithm.
   * (foreach card -> swap with random card)
   * @param deck The array of Card objects to shuffle.
   */
  function shuffleDeck(deck) {
    deck.forEach((_card, index) => {
      const randomIndex = Math.floor(Math.random() * deck.length);
      [deck[index], deck[randomIndex]] = [deck[randomIndex], deck[index]];
    });
  }


  //    ╭───────────────────────────╮
  //    │  Card Generation Methods  │
  //    ╰───────────────────────────╯

  /**
  |* Deals cards to the player and opponent.
  |* The player receives the first 5 cards, and the opponent receives the next 5 cards.
  |* The remaining cards are left in the common deck.
  |**/
  function dealCards() {
    const hands = [];
    // TODO: Implement sequential shuffling options
    const playerHand = new HandContainer(this.commonDeck.slice(0, 5));
    const oppHand = new HandContainer(this.commonDeck.slice(5, 10));
    hands.push(playerHand, oppHand);
    this.commonDeck = this.commonDeck.slice(10);
    return hands;
  }


  //    ╭────────────────────╮
  //    │  Prepare New Game  │
  //    ╰────────────────────╯

  /**
  |* Generates deck
  |* Shuffles deck
  |* Deals cards
  |**/
  function prepareNewGame() {
    this.commonDeck = this.generateDeck();
    this.shuffleDeck(this.commonDeck);
    return this.dealCards();
  }


module.exports = {
  newGame: prepareNewGame,
  dealCards: dealCards,
  shuffleDeck: shuffleDeck,
}
