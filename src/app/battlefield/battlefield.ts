// battlefield.ts
import { Component } from '@angular/core';
import { PlayingCard } from '../satchel';
import { CommonModule } from '@angular/common';
import { BattleService } from '../battle-service';
import { PigeonDestination } from '../enum';
import { THIS_IS_A_COMMENT } from '../satchel';

@Component({
  selector: 'app-battlefield',
  imports: [CommonModule],
  templateUrl: './battlefield.html',
  styleUrl: './battlefield.scss'
})
export class BattlefieldComponent {

  //    ╭──────────────╮
  //    │  Properties  │
  //    ╰──────────────╯

  cards: PlayingCard[] = [];

  // private sub!: Subscription;
  private pigeonScout: any;

  // Goofy
  THIS_IS_A_COMMENT = THIS_IS_A_COMMENT;

  constructor(private battleService: BattleService) {
  }

  ngOnInit() {
    this.pigeonScout = this.battleService.carrierPigeon$.subscribe((pigeon) => {
      if (pigeon.destination === PigeonDestination.Battlefield) {
        this.addCard(pigeon.card);
      }
    });
  }

  ngOnDestroy() {
    this.pigeonScout.unsubscribe();
  }


  //    ╭────────────────╮
  //    │  Core Methods  │
  //    ╰────────────────╯

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
