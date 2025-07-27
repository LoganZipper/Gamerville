// test-game.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Card } from '../satchel';
import { Card as POV_Card } from '../card/card';
import { BattlefieldComponent } from "../battlefield/battlefield";
import { BattleService } from '../battle-service';
import { Subscription } from 'rxjs';
import { DeckService } from '../deck-service';
import { AnimationStation } from '../animation-station';
import { PigeonDestination } from '../enum';
import { Hand } from '../hand/hand';

@Component({
  selector: 'app-test-game',
  imports: [CommonModule, BattlefieldComponent, POV_Card, Hand],
  templateUrl: './test-game.html',
  styleUrls: ['./test-game.scss']
})
export class TestGameComponent implements OnInit {

constructor(
  private battleService: BattleService,
  private deckService: DeckService,
  private animationStation: AnimationStation ) {}

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
    this.pigeonKeeper = this.battleService.carrierPigeon$.subscribe((object) => this.povHand.push(object.card));
    this.initializeGame();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public initializeGame() {
    const hands = this.deckService.prepareNewGame();
    // TODO: Backend determines who gets dealt first
    //          - also determined by type of game
    this.povHand = hands[0].cards; // delete later and all related
    this.oppHand = hands[1].cards; // delete later and all related

    this.battleService.sendHandToPlayer(this.povHand, PigeonDestination.Player)
    this.battleService.sendHandToPlayer(this.oppHand, PigeonDestination.Opponent)
  }


//    ╭──────────────────╮
//    │  Public Methods  │
//    ╰──────────────────╯

  // ['♡', '♢', '♧', '♤']


  public selectCard(card: Card): void {
    this.battlefields.get(1)?.addCard(card);
    this.povHand = this.povHand.filter(c => c !== card);
  }

  applyStyles(htmlCard: HTMLElement, card: Card, idx: number, count: number): object {
    // Do the nasty
    this.animationStation.applyCardHoverHighlight(htmlCard, card)

    return {
      // ...this.getSuitHighlight(card),
      ...this.animationStation.getHandArcStyleVars(idx, count)
    };
  }
}
