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

  private povID: string | undefined;
  private oppID: string[] | undefined;


  public gamePigeon$ = new Subject<GamePigeon>();

  //    ╭────────────────────╮
  //    │   Public Methods   │
  //    ╰────────────────────╯

  public setGame(game: Game): void {
    this.gamePigeon$.next(new GamePigeon(game));
  }

  public setPovID(id: string): void {
    this.povID = id;
  }
}
