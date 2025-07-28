// Stephen's Bag of Holding
//   ft. a deck of many things

import { Input } from '@angular/core';

import { Card } from "./card/card";
import { PigeonDestination } from "./enum";


//    ╭───────────────╮
//    │   Constants   │
//    ╰───────────────╯

export const Suits = ['♡', '♢', '♧', '♤'];
export const Ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
export const EuchreRanks = ['9', '10', 'J', 'Q', 'K', 'A'];
export const SpitzerRanks = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];




//    ╭──────────────────╮
//    │   CARD   CLASS   │
//    ╰──────────────────╯


let playingCardIdCounter = 1;

export class PlayingCard {
  suit!: string;
  rank!: string;
  id: number;

  constructor(suit: string, rank: string);
  constructor(suit: string, rank: string, id: number);
  constructor(suit: string, rank: string, id?: number) {
    this.suit = suit;
    this.rank = rank;
    if (id !== undefined) {
      this.id = id;
    } else {
      this.id = playingCardIdCounter++;
    }
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

    constructor(card: PlayingCard, destination: PigeonDestination) {
        this.card = card;
        this.destination = destination;
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
