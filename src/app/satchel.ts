import { PigeonDestination } from "./enum";


//    ╭──────────────────╮
//    │   CARD   CLASS   │
//    ╰──────────────────╯


export class Card {
    suit!: string;
    rank!: string;
}



//    ╭──────────────────╮
//    │  PIGEON   CLASS  │
//    ╰──────────────────╯



export class Pigeon {
//    ╭───────────────╮
//    │  Data Fields  │
//    ╰───────────────╯
    card!: Card;
    destination!: PigeonDestination;

    constructor(card: Card, destination: PigeonDestination) {
        this.card = card;
        this.destination = destination;
    }
}



//    ╭────────────────╮
//    │  HAND   CLASS  │
//    ╰────────────────╯


export class Hand {
//    ╭───────────────╮
//    │  Data Fields  │
//    ╰───────────────╯

    public cards: Card[] = []; // The cards in the hand

    constructor(initialCards: Card[] = []) {
        this.cards = initialCards;
    }

//    ╭────────────────────╮
//    │  Hand Management   │
//    ╰────────────────────╯

    public addCard(card: Card): void {
        this.cards.push(card);
    }

    public removeCard(card: Card): void {
        this.cards = this.cards.filter(c => c !== card);
    }
}
