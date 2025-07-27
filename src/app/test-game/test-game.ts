// test-game.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Card } from '../card';
import { BattlefieldComponent } from "../battlefield/battlefield";
import { BattleService } from '../battle-service';
import { Subscription } from 'rxjs';
import { DeckService } from '../deck-service';

@Component({
  selector: 'app-test-game',
  imports: [CommonModule, BattlefieldComponent],
  templateUrl: './test-game.html',
  styleUrls: ['./test-game.scss']
})
export class TestGameComponent implements OnInit {

constructor(
  private battleService: BattleService,
  private deckService: DeckService ) {}

  // ---- ---- ---- ---- \\
  //      Properties     \\
  // ---- ---- ---- ---- \\

  // Game State
  private sub!: Subscription;
  private pigeonKeeper: Subscription | null = null;

  // Shared Entities
  public commonDeck: Card[] = [];

  // Player Entities
  public povHand: Card[] = [];
  public povName: string = 'Stinky Fuck';

  public oppHand: Card[] = [];
  public oppName: string = 'Opponent';


  // Battlefield Entities
  @ViewChildren(BattlefieldComponent) battlefields!: QueryList<BattlefieldComponent>;

  // ---- ---- ---- ---- \\
  //    Core   Methods   \\
  // ---- ---- ---- ---- \\


  ngOnInit() {
    this.sub = this.battleService.reset$.subscribe(() => this.initializeGame());
    this.pigeonKeeper = this.battleService.carrierPigeon$.subscribe((card: Card) => this.povHand.push(card));
    this.initializeGame();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public initializeGame() {
    this.deckService.prepareNewGame();
  }


//    ╭──────────────────╮
//    │  Public Methods  │
//    ╰──────────────────╯

  // ['♡', '♢', '♧', '♤']


  public selectCard(card: Card): void {
    this.battlefields.get(1)?.addCard(card);
    this.povHand = this.povHand.filter(c => c !== card);
  }

  // Change card styles on hover by setting event listeners
  hoverCard(htmlCard: HTMLElement, card: Card): void {
    // Set background color based on suit
    htmlCard.addEventListener('mouseenter', () => {
      htmlCard.style.setProperty('background-color', this.getSuitHighlight(card));
    })

    // Reset background color on mouse leave
    htmlCard.addEventListener('mouseleave', () => {
      htmlCard.style.setProperty('background-color', 'transparent');
    })
  }


  applyStyles(htmlCard: HTMLElement, card: Card, idx: number, count: number): object {
    // Do the nasty
    this.hoverCard(htmlCard, card)

    return {
      // ...this.getSuitHighlight(card),
      ...this.getArcStyle(idx, count)
    };
  } 


  // TODO: fix this fucking monstrosity
  getSuitHighlight(card: Card): string {
    switch(card.suit) {
      case '♡' :
        return '#9b111f55' 
      case '♢' :
        return '#28c8d455' 
      case '♧' :
        return '#3aa04255' 
      case '♤' :
        return '#392bd655' 
    }

    return '';
  }


  
}