import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Brain {
  private gamestate: any;
  private gamelist: any;
  private game: any;
  private player: any;

  constructor() {
  }

  public reset(): void {
    this.gamestate = {};
    this.gamelist = [];
    this.game = null;
    this.player = null;
  }


  public resetTestGame(): void {

  }

  
}
