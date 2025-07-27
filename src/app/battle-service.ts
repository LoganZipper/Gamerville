// battle-service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BattlefieldComponent } from './battlefield/battlefield';
import { Card } from './satchel';
import { PigeonDestination } from './enum';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  public reset$ = new Subject<void>();
  public carrierPigeon$ = new Subject<{ card: Card; destination: PigeonDestination }>();
  public ultraPigeon$ = new Subject<{ cards: Card[]; destination: PigeonDestination }>();


  public resetBattlefield(): void {
    this.reset$.next();
  }

  public sendCardToPlayer(card: Card): void {
    this.carrierPigeon$.next({ card, destination: PigeonDestination.Player });
  }

  public sendCardToBattlefield(card: Card): void {
    this.carrierPigeon$.next({ card, destination: PigeonDestination.Player });
  }

  public sendHandToPlayer(cards: Card[], destination: PigeonDestination): void {
    this.ultraPigeon$.next({ cards, destination });
  }

}
