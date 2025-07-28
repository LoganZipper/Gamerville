import { PigeonDestination, PlayerType } from './../enum';
import { BattleService } from './../battle-service';
import { AnimationStation } from './../animation-station';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PlayingCard, Pigeon, UltraPigeon } from '../satchel';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Card } from "../card/card";

@Component({
  selector: 'app-hand',
  imports: [CommonModule, Card],
  templateUrl: './hand.html',
  styleUrl: './hand.scss'
})
export class Hand {
@Input() playerType: PlayerType = PlayerType.Opponent;
@Input() handInfo: PlayingCard[] = []; // The player's hand of cards


//    ╭───────────────╮
//    │  Data Fields  │
//    ╰───────────────╯

public pigeonMan: Subscription = new Subscription();
public hand: Card[] = []; // The hand of cards to be displayed in the UI

public PlayerType = PlayerType;


//    ╭────────────────╮
//    │  Construction  │
//    ╰────────────────╯

  constructor(
    private animationStation: AnimationStation,
    private battleService: BattleService,
    private cdr: ChangeDetectorRef
    ) {}


  ngOnInit() {
    const subscriptions = [
      // First subscription: Gets the initial hand of cards
      this.battleService.ultraPigeon$.subscribe((pigeon: UltraPigeon) => {
      if (pigeon.destination.toString() == this.playerType) {
        this.hand.push(...pigeon.cards.map(card => {
        const newCard = new Card(this.animationStation);
        newCard.playingCard = card;
        return newCard;
        }));
        this.cdr.detectChanges();
      }
      }),
      // Second subscription: Gets cards returned from battlefield
      this.battleService.carrierPigeon$.subscribe((pigeon: Pigeon) => {
      if (pigeon.destination.toString() == this.playerType) {
        const newCard = new Card(this.animationStation);
        newCard.playingCard = pigeon.card;
        this.hand.push(newCard);
        this.cdr.detectChanges();
      }
      })
    ];

    subscriptions.forEach(sub => this.pigeonMan.add(sub));
  }

  ngOnChanges() {
  this.hand = this.handInfo.map(card => {
    const newCard = new Card(this.animationStation);
    newCard.playingCard = card;
    return newCard;
  });
}


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
    console.log(this.hand)
    this.hand = this.hand.filter(c => c.playingCard.id !== playingCard.id);
    this.handInfo = this.handInfo.filter(c => c.id !== playingCard.id);
  }

}
