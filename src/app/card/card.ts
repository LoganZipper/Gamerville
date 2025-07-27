import { Component } from '@angular/core';
import { DeckType } from '../deck-type';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {



  //    ┌───────────────╮
  //    │  Data Fields  │
  //    ╰───────────────┘
  

  public selectedDeck: DeckType = DeckType.Standard; // Default deck type




  //    ╭───────────────────────────╮
  //    │  Card Generation Methods  │
  //    ╰───────────────────────────╯



  //    ┌────────────────────┑
  //    │  Card Preferences  │
  //    ╰────────────────────┘


  public selectDeck(deckType: DeckType): void {
    this.selectedDeck = deckType;
  }


  //    ┌───────────────────────────┑
  //    │  Card Generation Methods  │
  //    ╰───────────────────────────┘


   /**
     * Creates a standard deck of cards with 52 unique cards.
     * Each card has a suit and a rank.
     * @returns An array of Card objects representing the deck.
     */
    private createDeck(): Card[] {
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

}
