import { Card } from "./card/card";
import { PigeonDestination } from "./enum";


//    ╭──────────────────╮
//    │   CARD   CLASS   │
//    ╰──────────────────╯


export class PlayingCard {
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
    card!: PlayingCard;
    destination!: PigeonDestination;

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
