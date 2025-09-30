import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  //    ╭────────────────╮
  //    │   Properties   │
  //    ╰────────────────╯
 
  private uid: string = '0000'; // Default until set by server
  private opponents: string[] = [];

  
  //    ╭────────────────────╮
  //    │   Public Methods   │
  //    ╰────────────────────╯

  public setPovID(id: string): void {
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
