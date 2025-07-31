const Suits = ['♡', '♢', '♧', '♤'];


module.exports = Suits;






const Ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const EuchreRanks = ['9', '10', 'J', 'Q', 'K', 'A'];
const SpitzerRanks = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];


let playingCardIdCounter = 1;

class PlayingCard {
  suit;
  rank;
  id;

  constructor(suit, rank, id) {
    this.suit = suit;
    this.rank = rank;
    if (id !== undefined) {
      this.id = id;
    } else {
      this.id = playingCardIdCounter++;
    }
  }
}



// //    ╭────────────────╮
// //    │  HAND   CLASS  │
// //    ╰────────────────╯


// export class HandContainer {
// //    ╭───────────────╮
// //    │  Data Fields  │
// //    ╰───────────────╯

//     public cards: PlayingCard[] = []; // The cards in the hand

//     constructor(initialCards: PlayingCard[] = []) {
//         this.cards = initialCards;
//     }

// //    ╭────────────────────╮
// //    │  Hand Management   │
// //    ╰────────────────────╯

//     public addCard(card: PlayingCard): void {
//         this.cards.push(card);
//     }

//     public removeCard(card: PlayingCard): void {
//         this.cards = this.cards.filter(c => c !== card);
//     }
// }


module.exports = {
  Suits: Suits,
  PlayingCard: PlayingCard,
  Ranks: Ranks,
  EuchreRanks: EuchreRanks,
  SpitzerRanks, SpitzerRanks,
}
