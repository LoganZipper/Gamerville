// battlefield.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from '../satchel';
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

  cards: Card[] = [];

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

  public addCard(card: Card): void {
    this.cards.push(card);
  }

  public returnCard(card: Card): void {
    this.battleService.sendCardToPlayer(card);
    this.cards = this.cards.filter(c => c !== card);
  }

  public reset(): void {
  this.battleService.resetBattlefield();
   this.cards = [];
  }
}
