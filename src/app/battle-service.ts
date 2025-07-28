// battle-service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayingCard, Pigeon, UltraPigeon } from './satchel';
import { PigeonDestination } from './enum';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  public reset$ = new Subject<void>();
  public carrierPigeon$ = new Subject<Pigeon>();
  public ultraPigeon$ = new Subject<UltraPigeon>();


  public resetBattlefield(): void {
    this.reset$.next();
  }

  public sendCardToPlayer(card: PlayingCard): void {
    this.carrierPigeon$.next({ card, destination: PigeonDestination.POV });
  }

  public sendCardToBattlefield(card: PlayingCard, id?: number): void {
    this.carrierPigeon$.next({ card, id, destination: PigeonDestination.Battlefield });
  }

  public sendHandToPlayer(cards: PlayingCard[], destination: PigeonDestination): void {
    this.ultraPigeon$.next({ cards, destination });
  }
}
