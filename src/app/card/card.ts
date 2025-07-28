import { AnimationStation } from './../animation-station';
import { Component, Input } from '@angular/core';
import { DeckType } from '../enum';
import { CommonModule } from '@angular/common';
import { PlayingCard } from '../satchel';
import { CardFace } from "../card-face/card-face";

@Component({
  selector: 'app-card',
  imports: [CommonModule, CardFace],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input() card!: Card;
  @Input() playingCard!: PlayingCard;
  // @Input() styles: object = {};
  // @Input() position: object = {};
  @Input() positionInfo!: { i: number, c: number };
  @Input() isPlayer: boolean = false;

  //    ╭───────────────╮
  //    │  Data Fields  │
  //    ╰───────────────╯



  //    ╭────────────────╮
  //    │  Construction  │
  //    ╰────────────────╯


  constructor(private animationStation: AnimationStation) {
  }



//    ╭───────────────────╮
//    │  Event Listeners  │
//    ╰───────────────────╯


  //    ╭────────────────╮
  //    │  Visual Setup  │
  //    ╰────────────────╯

  public applyStyles(htmlCard: HTMLElement, card: PlayingCard, idx: number, count: number): object {
    if(!this.isPlayer) return {};

    // Do the nasty
    this.animationStation.applyCardHoverHighlight(htmlCard, card)

    return {
      // ...this.getSuitHighlight(card),
      ...this.animationStation.getHandArcStyleVars(idx, count)
    };
  }


}
