import { Component, Input } from '@angular/core';
import { PlayingCard } from '../satchel';

@Component({
  selector: 'app-card-face',
  imports: [],
  templateUrl: './card-face.html',
  styleUrl: './card-face.scss'
})
export class CardFace {

  @Input() playingCard!: PlayingCard;
  // @Input() isPlayer: boolean = false;

}
