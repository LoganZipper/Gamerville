import { Injectable } from '@angular/core';
import { DeckType } from './enum';
import { PlayingCard, HandContainer, Suits, Ranks } from './satchel';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  //    ╭───────────────╮
  //    │  Data Fields  │
  //    ╰───────────────╯


  public selectedDeck: DeckType = DeckType.Standard; // Default deck type
  public commonDeck: PlayingCard[] = []; // The deck that is shared among players


  //    ╭────────────────────╮
  //    │  Card Preferences  │
  //    ╰────────────────────╯


  public selectDeck(deckType: DeckType): void {
    this.selectedDeck = deckType;
  }

  public generateDeck(): PlayingCard[] {
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
    private createFullDeck(): PlayingCard[] {
      const deck: PlayingCard[] = [];

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
    private createEuchreDeck(): PlayingCard[] {
      const deck: PlayingCard[] = [];

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
    private createSpitzerDeck(): PlayingCard[] {
      const deck: PlayingCard[] = [];

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
   * @param deck The array of Card objects to shuffle.
   */
  private shuffleDeck(deck: PlayingCard[]): void {
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
  private dealCards(): HandContainer[] {
    const hands: HandContainer[] = [];
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

  public prepareNewGame(): HandContainer[] {
    this.commonDeck = this.generateDeck();
    this.shuffleDeck(this.commonDeck);
    return this.dealCards();
  }


}
