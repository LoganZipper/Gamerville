import { AnimationStation } from '../_Services/animation-station';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayingCard as GenericCard } from '../satchel';
import { CardFace } from "../card-face/card-face";

@Component({
  selector: 'app-card',
  imports: [CommonModule, CardFace],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {


  //    ╭───────────────╮
  //    │  Data Fields  │
  //    ╰───────────────╯

  @Input() uiCard!: Card;
  @Input() gameCard!: GenericCard;

  @Input() positionInfo!: { i: number, c: number };
  @Input() isPlayer: boolean = false;



  //    ╭────────────────╮
  //    │  Construction  │
  //    ╰────────────────╯

  constructor(private animationStation: AnimationStation) {
  }


  //    ╭────────────────╮
  //    │  Visual Setup  │
  //    ╰────────────────╯


  public applyStyles(htmlCard: HTMLElement, card: GenericCard, idx: number, count: number): object {
    if(!this.isPlayer) return {};

    // Do the nasty
    this.animationStation.applyCardHoverHighlight(htmlCard, card)

    return {
      // ...this.getSuitHighlight(card),
      ...this.animationStation.getHandArcStyleVars(idx, count)
    };
  }
}
