import { Component } from '@angular/core';
import { DeckType } from '../enum';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {

  suit!: string;
  rank!: string;

}
