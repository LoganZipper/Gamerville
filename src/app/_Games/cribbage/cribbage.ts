// test-game.ts

import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Hand } from '../../hand/hand';
import { BattlefieldComponent } from '../../battlefield/battlefield';
import { BattleService } from '../../_Services/battle-service';
import { DeckService } from '../../_Services/deck-service';
import { AnimationStation } from '../../_Services/animation-station';
import { Subscription } from 'rxjs';
import { GameState, HandContainer, PlayingCard } from '../../satchel';
import { DeckType, Game, PigeonDestination, PlayerType } from '../../enum';
import { CribbageScoreboard } from "../../cribbage-scoreboard/cribbage-scoreboard";
import { Submit } from "../../utilities/submit/submit";
import { Modal } from '../../utilities/modal/modal';
import { GameService } from '../../_Services/game-service';

@Component({
  selector: 'app-cribbage',
  imports: [CommonModule, Hand, BattlefieldComponent, CribbageScoreboard, Modal],
  templateUrl: './cribbage.html',
  styleUrl: './cribbage.scss'
})
export class Cribbage {


///////
//

constructor(
  private battleService: BattleService,
  private deckService: DeckService,
  private animationStation: AnimationStation,
  private gameService: GameService) {

  }

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

  // Modal Testing Variables
  public isOpen: boolean = false;
  public modalContent: string = "Testing content features";
  public whoTheFckIAm: string = "POV";


  // Battlefield Entities
  @ViewChildren(BattlefieldComponent) battlefields!: QueryList<BattlefieldComponent>;

  // Button
  @ViewChildren(Submit) submit!: Submit;


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
    // this.deckService.selectedDeck = DeckType.Standard; //Ensure full deck
    // const hands = this.deckService.prepareNewGame();
    // TODO: Backend determines who gets dealt first
    //          - also determined by type of game
    this.gameService.initTestGame();

    this.povHand = this.gameService.getPlayerHand((this.gameService.getPovID()));
    this.oppHand = this.gameService.getPlayerHand('OPP1');

    this.povPlayingCards = this.povHand.cards;
    this.oppPlayingCards = this.oppHand.cards;

    this.battleService.sendHandToPlayer(new HandContainer(this.povHand.cards), PigeonDestination.POV)
    this.battleService.sendHandToPlayer(new HandContainer(this.oppHand.cards), PigeonDestination.Opponent)

    this.isOpen = true;

    this.game();
  }

  private game(): void {
    this.gameService.whoseTurnIsIt().then((id) => {
      this.whoTheFckIAm = id;
      console.log(this.whoTheFckIAm);
      // wait for opponent if their turn
    });
  }


  public isSubmittable(): string {
    return this.battlefields.get(0)?.cards.length == 2 ? "" : ""
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
