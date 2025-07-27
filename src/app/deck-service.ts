import { Injectable } from '@angular/core';
import { DeckType } from './deck-type';
import { Card } from './card';
import { Hand } from './hand';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  //    ╭───────────────╮
  //    │  Data Fields  │
  //    ╰───────────────╯
  

  public selectedDeck: DeckType = DeckType.Standard; // Default deck type
  public commonDeck: Card[] = []; // The deck that is shared among players
  
  
  //    ╭────────────────────╮
  //    │  Card Preferences  │
  //    ╰────────────────────╯


  public selectDeck(deckType: DeckType): void {
    this.selectedDeck = deckType;
  }

  public generateDeck(): Card[] {
    switch (this.selectedDeck) {
      case DeckType.Euchre:
        return this.createEuchreDeck();
      case DeckType.Spitzer:
        return this.createSpitzerDeck();
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
    private createFullDeck(): Card[] {
      const suits = ['♡', '♢', '♧', '♤'];
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      const deck: Card[] = [];
  
      for (const suit of suits) {
        for (const rank of ranks) {
          deck.push({ suit, rank });
        }
      }
      return deck;
    }
  
  
    /**
     * Creates a Euchre deck with 24 unique cards.
     * Each card has a suit and a rank.
     * @returns An array of Card objects representing the Euchre deck.
     */
    private createEuchreDeck(): Card[] {
      const suits = ['♡', '♢', '♧', '♤'];
      const ranks = ['9', '10', 'J', 'Q', 'K', 'A'];
      const deck: Card[] = [];
  
      for (const suit of suits) {
        for (const rank of ranks) {
          deck.push({ suit, rank });
        }
      }
      return deck;
    }
  
  
    /**
     * Creates a Spitzer deck with 32 unique cards.
     * Each card has a suit and a rank.
     * @returns An array of Card objects representing the Spitzer deck.
     */
    private createSpitzerDeck(): Card[] {
      const suits = ['♡', '♢', '♧', '♤'];
      const ranks = ['7' ,'8' ,'9', '10', 'J', 'Q', 'K', 'A'];
      const deck: Card[] = [];
  
      for (const suit of suits) {
        for (const rank of ranks) {
          deck.push({ suit, rank });
        }
      }
      return deck;
    }


//    ╭───────────────────╮
//    │  Private Methods  │
//    ╰───────────────────╯


  /**
   * Shuffles the deck of cards using the Fisher-Yates algorithm.
   * @param deck The array of Card objects to shuffle.
   */
  private shuffleDeck(deck: Card[]): void {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }



  //    ╭───────────────────────────╮
  //    │  Card Generation Methods  │
  //    ╰───────────────────────────╯

  /**
  |* Deals cards to the player and opponent.
  |* The player receives the first 5 cards, and the opponent receives the next 5 cards.
  |* The remaining cards are left in the common deck.
  |**/
  private dealCards(): Hand[] {
    const hands: Hand[] = [];
    // TODO: Implement sequential shuffling options
    const playerHand = new Hand(this.commonDeck.slice(0, 5));
    const oppHand = new Hand(this.commonDeck.slice(5, 10));
    hands.push(playerHand, oppHand);
    this.commonDeck = this.commonDeck.slice(10);
    return hands;
  }


  //    ╭────────────────────╮
  //    │  Prepare New Game  │
  //    ╰────────────────────╯

  public prepareNewGame(): void {
    this.commonDeck = this.generateDeck();
    this.shuffleDeck(this.commonDeck);
    this.dealCards();
  }


}
