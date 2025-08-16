// Stephen's Bag of Holding
//   ft. a deck of many things

import { Game, PigeonDestination } from "./enum";


//    ╭───────────────╮
//    │   Constants   │
//    ╰───────────────╯

export const Suits = ['♡', '♢', '♧', '♤'];


export const Ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
export const StandardScoresAceHigh = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]; // Extra 11 for Ace high
export const StandardScoresAceLow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]; // Ace low only

export const EuchreRanks = ['9', '10', 'J', 'Q', 'K', 'A'];
export const EuchreScores = [1, 2, 3, 4, 5, 6]; // Corresponding to EuchreRanks
export const EuchreTrumpScores = [1, 2, 6, 3, 4, 5]; // Corresponding to EuchreRanks
//TODO: In game, J^ get +11 to value when trump is declared
//               Jv get +10 to value when trump is declared

export const SpitzerRanks = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];





export const THIS_IS_A_COMMENT = false;




//    ╭──────────────────╮
//    │   CARD   CLASS   │
//    ╰──────────────────╯


let playingCardIdCounter = 1;

export class PlayingCard {
  suit!: string;
  rank!: string;
  id: number;
  value!: number; // Drives game-specific logic

  constructor(suit: string, rank: string);
  constructor(suit: string, rank: string, id: number);
  constructor(suit: string, rank: string, value?: number, id?: number) {
    this.suit = suit;
    this.rank = rank;
    this.value = value !== undefined ? value : this.getDefaultValue(rank);
    if (id !== undefined) {
      this.id = id;
    } else {
      this.id = playingCardIdCounter++;
    }
  }

  private getDefaultValue(rank: string): number {
    const rankIndex = Ranks.indexOf(rank);
    return rankIndex !== -1 ? rankIndex + 2 : 0;
  }
}



//    ╭──────────────────╮
//    │  PIGEON   CLASS  │
//    ╰──────────────────╯



export class Pigeon {
//    ╭───────────────╮
//    │  Data Fields  │
//    ╰───────────────╯
    card!: PlayingCard;
    destination!: PigeonDestination;
    id?: number; // Optional ID for card tracking

    constructor(card: PlayingCard, destination: PigeonDestination, id?: number) {
        this.card = card;
        this.destination = destination;
        this.id = id;
    }
}

export class UltraPigeon {
//    ╭───────────────╮
//    │  Data Fields  │
//    ╰───────────────╯
    cards!: PlayingCard[];
    destination!: PigeonDestination;

    constructor(cards: PlayingCard[], destination: PigeonDestination) {
        this.cards = cards;
        this.destination = destination;
    }
}

export class GamePigeon {
//    ╭───────────────╮
//    │  Data Fields  │
//    ╰───────────────╯
    game!: Game;

    constructor(game: Game) {
        this.game = game;
    }
}



//    ╭────────────────╮
//    │  HAND   CLASS  │
//    ╰────────────────╯


export class HandContainer {
//    ╭───────────────╮
//    │  Data Fields  │
//    ╰───────────────╯

    public cards: PlayingCard[] = []; // The cards in the hand

    constructor(initialCards: PlayingCard[] = []) {
        this.cards = initialCards;
    }

//    ╭────────────────────╮
//    │  Hand Management   │
//    ╰────────────────────╯

    public addCard(card: PlayingCard): void {
        this.cards.push(card);
    }

    public removeCard(card: PlayingCard): void {
        this.cards = this.cards.filter(c => c !== card);
    }
}
