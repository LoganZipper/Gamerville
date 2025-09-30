import { PlayerType } from './../enum';
import { BattleService } from '../_Services/battle-service';
import { AnimationStation } from '../_Services/animation-station';
import { ChangeDetectorRef, Component, input, Input } from '@angular/core';
import { PlayingCard, Pigeon, UltraPigeon, HandContainer } from '../satchel';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Card } from "../card/card";

@Component({
  selector: 'app-hand',
  imports: [CommonModule, Card],
  templateUrl: './hand.html',
  styleUrl: './hand.scss'
})
export class Hand {
@Input() playerType: PlayerType = PlayerType.Opponent;
@Input() gameHand!: HandContainer;


//    ╭───────────────╮
//    │  Data Fields  │
//    ╰───────────────╯

public pigeonMan: Subscription = new Subscription();
public ui_hand: Card[] = []; // The hand of cards to be displayed in the UI

public PlayerType = PlayerType;


//    ╭────────────────╮
//    │  Construction  │
//    ╰────────────────╯

  constructor(
    private animationStation: AnimationStation,
    private battleService: BattleService,
    ) {
      
    }


  ngOnInit() {
    console.log("Hand component initialized for player type: ", this.playerType);
    const subscriptions = [
      // First subscription: Gets the initial hand of cards
      this.battleService.ultraPigeon$.subscribe((pigeon: UltraPigeon) => {
      if (pigeon.destination.toString() == this.playerType) {
        this.ui_hand.push(...pigeon.cards.map(card => {
        const newCard = new Card(this.animationStation);
        newCard.gameCard = card;
        return newCard;
        }));
        console.log("Hand after receiving UltraPigeon: ", this.ui_hand);
      }
      }),
      // Second subscription: Gets cards returned from battlefield
      this.battleService.carrierPigeon$.subscribe((pigeon: Pigeon) => {
      if (pigeon.destination.toString() == this.playerType) {
        const newCard = new Card(this.animationStation);
        newCard.gameCard = pigeon.card;
        this.ui_hand.push(newCard);
      }
      })
    ];

    subscriptions.forEach(sub => this.pigeonMan.add(sub));
  }

//   ngOnChanges() {
//   if (this.gameHand) {
//     this.ui_hand = this.gameHand.cards.map(card => {
//       const newCard = new Card(this.animationStation);
//       newCard.gameCard = card;
//       return newCard;
//     });
//   }
// }


//    ╭────────────────╮
//    │  Visual Setup  │
//    ╰────────────────╯

  public applyStyles(htmlCard: HTMLElement, card: PlayingCard, idx: number, count: number): object {
  // Do the nasty
    this.animationStation.applyCardHoverHighlight(htmlCard, card)

    return {
      // ...this.getSuitHighlight(card),
      ...this.animationStation.getHandArcStyleVars(idx, count)
    };
  }


//    ╭───────────────────╮
//    │  Event Listeners  │
//    ╰───────────────────╯

  public selectCard(playingCard: PlayingCard): void {
    // Service gets the card from the hand
    //   and adds it to the battlefield
    this.battleService.sendCardToBattlefield(playingCard);


    // Current Hand remove card
    // TODO: Use a service to remove the card from the hand
    this.ui_hand = this.ui_hand.filter(c => c.gameCard.id !== playingCard.id);
  }

}
