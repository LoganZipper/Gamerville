import { GameService } from './../game-service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestGameComponent } from "../test-game/test-game";
import { Subscription } from 'rxjs';
import { Game } from '../enum';
import { io } from 'socket.io-client';
import { Card } from '../card/card';

@Component({
  selector: 'app-main',
  imports: [CommonModule, TestGameComponent],
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


  //Multi

  private context: any;
  private socket: any;

  //    ╭─────────────────╮
  //    │   Constructor   │
  //    ╰─────────────────╯

  ngOnInit() {
    this.socket = io('http://localhost:3000')
  }

  ngAfterViewInit() {
    this.socket.on()
    this.socket.on('cards', (cards: any) => {
      console.log('success')
    })
  }

  // Use this in games
  public sendCard(card: Card) {
    this.socket.emit('card', card)
  }


  // I think server logic should be handled here

  constructor(private gameService: GameService) {
    this.pigeonGamer$ = this.gameService.gamePigeon$.subscribe((gamePigeon) => {
      this.selectedGame = gamePigeon.game;
    });
  }
}
