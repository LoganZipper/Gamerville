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
  public id!: number;

  //Multi

  private socket: any;

  //    ╭─────────────────╮
  //    │   Constructor   │
  //    ╰─────────────────╯

  ngOnInit() {
    this.socket = io('http://localhost:3000')
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit')
    this.socket.on('generate', (id: number) => {
      console.log('my id:', id)
      this.id = id;
    });
  }

   constructor(private gameService: GameService) {
    this.pigeonGamer$ = this.gameService.gamePigeon$.subscribe((gamePigeon) => {
      this.selectedGame = gamePigeon.game;
    });

    console.log('Saved id?');
    console.log(this.id);
  }

  // Use this in games
  public sendCard(card: Card) {
    this.socket.emit('card', card)
  }

  public getID() {
    return this.id || '0000';
  }
}
