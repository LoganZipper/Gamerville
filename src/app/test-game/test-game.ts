// test-game.ts
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HandContainer, PlayingCard } from '../satchel';
import { Card } from '../card/card';
import { BattlefieldComponent } from "../battlefield/battlefield";
import { BattleService } from '../battle-service';
import { Subscription } from 'rxjs';
import { DeckService } from '../deck-service';
import { AnimationStation } from '../animation-station';
import { PigeonDestination, PlayerType } from '../enum';
import { Hand } from '../hand/hand';

@Component({
  selector: 'app-test-game',
  imports: [CommonModule, BattlefieldComponent, Hand],
  templateUrl: './test-game.html',
  styleUrls: ['./test-game.scss']
})
export class TestGameComponent implements OnInit {

constructor(
  private battleService: BattleService,
  private deckService: DeckService,
  private animationStation: AnimationStation) {}

  //    ╭────────────────╮
  //    │   Properties   │
  //    ╰────────────────╯

  // Game State
  private fuze$!: Subscription;
  private pigeonKeeper: Subscription | null = null;

  // Shared Entities
  public commonDeck: PlayingCard[] = [];

  // Player Entities
  @ViewChild('povRef') povHand!: HandContainer;
  @ViewChild('oppRef') oppHand!: HandContainer;

  public povPlayingCards: PlayingCard[] = [];
  public oppPlayingCards: PlayingCard[] = [];


  public povType: PlayerType = PlayerType.POV;
  public oppType: PlayerType = PlayerType.Opponent;


  // Battlefield Entities
  @ViewChildren(BattlefieldComponent) battlefields!: QueryList<BattlefieldComponent>;



  //    ╭────────────────────╮
  //    │    Core  Methods   │
  //    ╰────────────────────╯


  ngOnInit() {
    this.fuze$ = this.battleService.reset$.subscribe(() => this.initializeGame());
     this.initializeGame();
  }

  ngAfterViewInit() {

    // this.pigeonKeeper = this.battleService.carrierPigeon$.subscribe((object) => this.povHand.cards.push(object.card));
  }

  ngOnDestroy() {
    this.fuze$.unsubscribe();
  }

  private initializeGame() {
    const hands = this.deckService.prepareNewGame();
    // TODO: Backend determines who gets dealt first
    //          - also determined by type of game

    this.povHand = hands[0];
    this.oppHand = hands[1];

    this.povPlayingCards = hands[0].cards;
    this.oppPlayingCards = hands[1].cards;

    this.battleService.sendHandToPlayer(hands[0].cards, PigeonDestination.POV)
    this.battleService.sendHandToPlayer(hands[1].cards, PigeonDestination.Opponent)
  }


//    ╭──────────────────╮
//    │  Public Methods  │
//    ╰──────────────────╯


  applyStyles(htmlCard: HTMLElement, card: PlayingCard, idx: number, count: number): object {
    // Do the nasty
    this.animationStation.applyCardHoverHighlight(htmlCard, card)

    return {
      // ...this.getSuitHighlight(card),
      ...this.animationStation.getHandArcStyleVars(idx, count)
    };
  }

  // public getPlayerType(): string {
  //   return this.battleService.carrierPigeon$.getValue().destination === PigeonDestination.POV ? 'POV' : 'Opponent';
  // }
}
