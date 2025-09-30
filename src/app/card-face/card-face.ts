import { Component, Input } from '@angular/core';
import { GenericCard, PlayingCard } from '../satchel';

@Component({
  selector: 'app-card-face',
  imports: [],
  templateUrl: './card-face.html',
  styleUrl: './card-face.scss'
})
export class CardFace {

  @Input() gameCard!: PlayingCard;


}
