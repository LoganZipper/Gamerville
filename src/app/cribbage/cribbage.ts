// test-game.ts

import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Hand } from '../hand/hand';
import { Scoreboard } from '../scoreboard/scoreboard';
import { BattlefieldComponent } from '../battlefield/battlefield';
import { BattleService } from '../battle-service';
import { DeckService } from '../deck-service';
import { AnimationStation } from '../animation-station';
import { Subscription } from 'rxjs';
import { GameState, HandContainer, PlayingCard } from '../satchel';
import { DeckType, Game, PigeonDestination, PlayerType } from '../enum';
import { CribbageScoreboard } from "../cribbage-scoreboard/cribbage-scoreboard";

@Component({
  selector: 'app-cribbage',
  imports: [CommonModule, Hand, Scoreboard, BattlefieldComponent, CribbageScoreboard],
  templateUrl: './cribbage.html',
  styleUrl: './cribbage.scss'
})
export class Cribbage {


///////
//

constructor(
  private battleService: BattleService,
  private deckService: DeckService,
  private animationStation: AnimationStation) {}

  //    ╭────────────────╮
  //    │   Properties   │
  //    ╰────────────────╯

  // Game State
  private fuze$!: Subscription;
  private turn$!: Subscription;
  private pigeonKeeper: Subscription | null = null;

  private gameState!: GameState;

  // Shared Entities
  public commonDeck: PlayingCard[] = [];
  public playerTurn: PlayerType = PlayerType.Opponent; // Ensure controls are locked

  // Player Entities
  @ViewChild('povRef') povHand!: HandContainer;
  @ViewChild('oppRef') oppHand!: HandContainer;

  public povPlayingCards: PlayingCard[] = [];
  public oppPlayingCards: PlayingCard[] = [];


  public povType: PlayerType = PlayerType.POV;
  public oppType: PlayerType = PlayerType.Opponent;

  public fuckThisBullshit: Game = Game.Cribbage;

  // Battlefield Entities
  @ViewChildren(BattlefieldComponent) battlefields!: QueryList<BattlefieldComponent>;



  //    ╭───────────────────╮
  //    │   Core  Methods   │
  //    ╰───────────────────╯


  ngOnInit() {
    // this.
    this.fuze$ = this.battleService.reset$.subscribe(() => this.initializeGame());
     this.initializeGame();
  }

  ngAfterViewInit() {
    // TODO:
    this.turn$ = this.battleService.gamestate$.subscribe((gamestate) => this.gameState = gamestate);
    // this.pigeonKeeper = this.battleService.carrierPigeon$.subscribe((object) => this.povHand.cards.push(object.card));
  }

  ngOnDestroy() {
    this.fuze$.unsubscribe();
  }

  private initializeGame() {
    this.deckService.selectedDeck = DeckType.Standard; //Ensure full deck
    const hands = this.deckService.prepareNewGame();
    // TODO: Backend determines who gets dealt first
    //          - also determined by type of game

    console.log('Hands:', hands);

    this.povHand = hands[0];
    this.oppHand = hands[1];

    this.povPlayingCards = hands[0].cards;
    this.oppPlayingCards = hands[1].cards;

    this.battleService.sendHandToPlayer(hands[0].cards, PigeonDestination.POV)
    this.battleService.sendHandToPlayer(hands[1].cards, PigeonDestination.Opponent)

  }

  private game(): void {
    // wait for opponent if their turn


    // await player action
    // player ends turn | progresses turn step

    // placeholder for auto-score
  }


//    ╭───────────────────╮
//    │  Public  Methods  │
//    ╰───────────────────╯


  applyStyles(htmlCard: HTMLElement, card: PlayingCard, idx: number, count: number): object {
    // Do the nasty
    this.animationStation.applyCardHoverHighlight(htmlCard, card)

    return {
      // ...this.getSuitHighlight(card),
      ...this.animationStation.getHandArcStyleVars(idx, count)
    };
  }
}
