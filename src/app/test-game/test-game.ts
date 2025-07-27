// test-game.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Card } from '../card';
import { BattlefieldComponent } from "../battlefield/battlefield";
import { BattleService } from '../battle-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-game',
  imports: [CommonModule, BattlefieldComponent],
  templateUrl: './test-game.html',
  styleUrls: ['./test-game.scss']
})
export class TestGameComponent implements OnInit {

constructor(private battleService: BattleService) {}



  // ---- ---- ---- ---- \\
  //      Properties     \\
  // ---- ---- ---- ---- \\

  // Game State
  private sub!: Subscription;

  // Shared Entities
  public commonDeck: Card[] = [];

  // Player Entities
  public playerHand: Card[] = [];
  public playerName: string = 'Player';

  public oppHand: Card[] = [];
  public oppName: string = 'Opponent';


  // Battlefield Entities
  @ViewChildren(BattlefieldComponent) battlefields!: QueryList<BattlefieldComponent>;

  // ---- ---- ---- ---- \\
  //    Core   Methods   \\
  // ---- ---- ---- ---- \\


  ngOnInit() {
    this.sub = this.battleService.reset$.subscribe(() => this.initializeGame());
    this.initializeGame();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public initializeGame() {
    this.commonDeck = this.createDeck();
    this.shuffleDeck(this.commonDeck);
    console.log('Deck created and shuffled');
    this.dealCards();
  }


  // ---- ---- ---- ---- \\
  //   Public  Methods   \\
  // ---- ---- ---- ---- \\


  public selectCard(card: Card): void {
    this.battlefields.get(1)?.addCard(card);
    this.playerHand = this.playerHand.filter(c => c !== card);
    
  }


  // ---- ---- ---- ---- \\
  //  Private   Methods  \\
  // ---- ---- ---- ---- \\


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
   * Shuffles the deck of cards using the Fisher-Yates algorithm.
   * @param deck The array of Card objects to shuffle.
   */
  private shuffleDeck(deck: Card[]): void {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  /**
   * Deals cards to the player and opponent.
   * The player receives the first 5 cards, and the opponent receives the next 5 cards.
   * The remaining cards are left in the common deck.
   */
  private dealCards(): void {
    // TODO: Implement sequential shuffling options
    this.playerHand = this.commonDeck.slice(0, 5);
    this.oppHand = this.commonDeck.slice(5, 10);
    this.commonDeck = this.commonDeck.slice(10);
  }




  // ---- ---- ---- ---- \\
  //  Complicated  Shit  \\
  // ---- ---- ---- ---- \\



  getArcStyle(idx: number, count: number): object {

    if (count <= 1) 
    {
      return {};
    }
    else if (count % 2 === 1 && idx === Math.floor(count / 2)) {
      return {
        '--transform': 'translateY(1.5em)',
        '--rotation': '0deg',
      };
    }

    // ---- \\
    
    const midVal = count % 2 === 0 ? (count - 1)/2 : Math.floor(count / 2);

    const transform = `translateY(${Math.abs(idx - midVal)/1.2 * 3}em)`;
    const rotation = `${((idx - midVal) * 40)/count}deg`

    return {
      '--transform': transform,
      '--rotation': rotation,
    };
  }
}