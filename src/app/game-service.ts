import { GamePigeon } from './satchel';
import { Injectable } from '@angular/core';
import { Game } from './enum';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  //    ╭────────────────╮
  //    │   Properties   │
  //    ╰────────────────╯

  public gamePigeon$ = new Subject<GamePigeon>();

  //    ╭────────────────────╮
  //    │   Public Methods   │
  //    ╰────────────────────╯

  public setGame(game: Game): void {
    this.gamePigeon$.next(new GamePigeon(game));
  }
}
