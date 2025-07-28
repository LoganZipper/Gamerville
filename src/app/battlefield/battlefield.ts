// battlefield.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayingCard } from '../satchel';
import { CommonModule } from '@angular/common';
import { BattleService } from '../battle-service';

@Component({
  selector: 'app-battlefield',
  imports: [CommonModule],
  templateUrl: './battlefield.html',
  styleUrl: './battlefield.scss'
})
export class BattlefieldComponent {
  // ---- ---- ---- ---- \\
  //      Properties     \\
  // ---- ---- ---- ---- \\

  cards: PlayingCard[] = [];

  // private sub!: Subscription;

  constructor(private battleService: BattleService) {
  }

  // ngOnInit() {
  // }
  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

  // ---- ---- ---- ---- \\
  //    Core   Methods   \\
  // ---- ---- ---- ---- \\

  public addCard(card: PlayingCard): void {
    this.cards.push(card);
  }

  public returnCard(card: PlayingCard): void {
    this.battleService.sendCardToPlayer(card);
    this.cards = this.cards.filter(c => c !== card);
  }

  public reset(): void {
  this.battleService.resetBattlefield();
   this.cards = [];
  }
}
