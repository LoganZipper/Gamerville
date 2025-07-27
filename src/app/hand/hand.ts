import { BattleService } from './../battle-service';
import { AnimationStation } from './../animation-station';
import { Component } from '@angular/core';
import { Card } from '../satchel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hand',
  imports: [CommonModule],
  templateUrl: './hand.html',
  styleUrl: './hand.scss'
})
export class Hand {


//    ╭───────────────╮
//    │  Data Fields  │
//    ╰───────────────╯

public hand: Card[] = []; // The player's hand of cards


//    ╭────────────────╮
//    │  Construction  │
//    ╰────────────────╯


  constructor(
    private animationStation: AnimationStation,
    private battleService: BattleService,
    ) {}


//    ╭────────────────╮
//    │  Visual Setup  │
//    ╰────────────────╯

  public applyStyles(htmlCard: HTMLElement, card: Card, idx: number, count: number): object {
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

public selectCard(card: Card): void {

// Service gets the card from the hand
  // and adds it to the battlefield
this.battleService.sendCardToBattlefield(card);


// Current Hand remove card
  this.hand = this.hand.filter(c => c !== card);
}

}
