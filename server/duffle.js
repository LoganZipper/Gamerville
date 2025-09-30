export const Suits = ['♡', '♢', '♧', '♤'];
export const Ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
export const EuchreRanks = ['9', '10', 'J', 'Q', 'K', 'A'];
export const SpitzerRanks = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];


let playingCardIdCounter = 1;

export class PlayingCard {
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


export class HandContainer {
  cards;

  constructor(initialCards = []) {
    this.cards = initialCards;
  }
}
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
