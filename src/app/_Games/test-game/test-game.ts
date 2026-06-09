// test-game.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { HandContainer, PlayingCard } from '../../satchel';
import { BattlefieldComponent } from "../../battlefield/battlefield";
import { BattleService } from '../../_Services/battle-service';
import { Subscription } from 'rxjs';
import { DeckService } from '../../_Services/deck-service';
import { AnimationStation } from '../../_Services/animation-station';
import { PlayerType } from '../../enum';
import { Hand } from '../../hand/hand';
import { Scoreboard } from '../../scoreboard/scoreboard';
import { GameService } from '../../_Services/game-service';
import { LobbyService } from '../../_Services/lobby-service';

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
  private animationStation: AnimationStation,
  private lobbyService: LobbyService,
  private gameService: GameService,) {}

  //    ╭────────────────╮
  //    │   Properties   │
  //    ╰────────────────╯
  
  // Battlefield Entities
  @ViewChildren(BattlefieldComponent) battlefields!: QueryList<BattlefieldComponent>;

  // Player Entities
  // @ViewChild('povRef') povHand!: Hand;
  // @ViewChild('oppRef') oppHand!: Hand;
  public povType: PlayerType = PlayerType.POV;
  public oppType: PlayerType = PlayerType.Opponent;
  public povHand!: HandContainer;
  public oppHand!: HandContainer;


  // Game State
  private pigeonKeeper: Subscription | null = null;

  public gameReady: boolean = false;


  //    ╭───────────────────╮
  //    │   Core  Methods   │
  //    ╰───────────────────╯


  ngOnInit() {
    this.battleService.reset$.subscribe(() => this.initializeGame());
    this.gameService.manPigeon$.subscribe((manPigeon) => {
        if(manPigeon.isMan) {
          this.povHand = this.gameService.getPlayerHand(this.lobbyService.getPovID());
      
          this.lobbyService.addOpponent('OPP1');
          this.oppHand = this.gameService.getPlayerHand('OPP1');

          console.log("Pov Hand: ", this.povHand);
          console.log("Opp Hand: ", this.oppHand);

          // this.battleService.sendHandToPlayer(new HandContainer(this.povHand.cards), PigeonDestination.POV)
          // this.battleService.sendHandToPlayer(new HandContainer(this.oppHand.cards), PigeonDestination.Opponent)
          console.log("Sent hands to players via BattleService.");
          this.gameReady = true;
          console.log(this.gameReady);
        }
    });
    this.initializeGame();
  }

  ngOnDestroy() {
    this.battleService.reset$.unsubscribe();
  }

  private initializeGame() {
    this.gameService.initTestGame();
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
