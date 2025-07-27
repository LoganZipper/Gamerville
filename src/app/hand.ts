import { Card } from "./card";

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
