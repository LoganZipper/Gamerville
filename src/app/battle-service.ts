// battle-service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BattlefieldComponent } from './battlefield/battlefield';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class BattleService {
  public reset$ = new Subject<void>();
  public carrierPigeon$ = new Subject<Card>();


  public resetBattlefield(): void {    
    this.reset$.next();
  }

  public sendCardToPlayer(card: Card): void {
    this.carrierPigeon$.next(card);
  }
  
}
