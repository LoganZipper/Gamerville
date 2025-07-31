import { GameService } from './../game-service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { TestGameComponent } from "../test-game/test-game";
import { Subscription } from 'rxjs';
import { Game } from '../enum';
import { io } from 'socket.io-client';
import { Card } from '../card/card';
import { Cribbage } from "../cribbage/cribbage";

@Component({
  selector: 'app-main',
  imports: [CommonModule, TestGameComponent, Cribbage],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class MainComponent {

  //    ╭────────────────╮
  //    │   Properties   │
  //    ╰────────────────╯

  public pigeonGamer$!: Subscription;

  // public playGameFlag: boolean = true;

  public selectedGame: Game = Game.Home;
  public id: string | undefined; // No default, will be set by server

  //Multi

  private socket: any;



  //    ╭─────────────────╮
  //    │   Constructor   │
  //    ╰─────────────────╯

  // Heavy socket logic
  // Ideally, main basically exists as a gateway to the rest of the app

   constructor (
    private gameService: GameService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.pigeonGamer$ = this.gameService.gamePigeon$.subscribe((gamePigeon) => {
      this.selectedGame = gamePigeon.game;
    });
    // Initialize socket/server connection
    // Assign id and refresh view
    this.socket = io('http://localhost:3000');
    this.socket.on('generate', (id: string) => {
      this.zone.run(() => {
        this.id = id;
        this.cdr.markForCheck();
      });
    });
  }

  // Use this in games
  public sendCard(card: Card) {
    this.socket.emit('card', card)
  }

}
