import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LobbyPigeon } from '../satchel';
import { stat } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  //    ╭────────────────╮
  //    │   Properties   │
  //    ╰────────────────╯
 
  private uid: string = '0000'; // Default until set by server
  private opponents: string[] = [];

  public lobbyPigeon$ = new Subject<string>();

  
  //    ╭────────────────────╮
  //    │   Public Methods   │
  //    ╰────────────────────╯

  public setPovID(id: string): void {
    console.log(`Just now setting uid: ${id}`)
    this.lobbyPigeon$.next(id);
    this.uid = id;
  }

  public getPovID(): string {
    return this.uid;
  }

  public getOpponents(): string[] {
    return this.opponents;
  }

  public addOpponent(opponentID: string): void {
    this.opponents.push(opponentID);
  }

  public removeOpponent(opponentID: string): void {
    this.opponents = this.opponents.filter(id => id !== opponentID);
  }

  //    ╭─────────────────────╮
  //    │   Private Methods   │
  //    ╰─────────────────────╯
}
