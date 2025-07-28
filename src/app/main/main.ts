import { GameService } from './../game-service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestGameComponent } from "../test-game/test-game";
import { Subscription } from 'rxjs';
import { Game } from '../enum';

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


  //    ╭─────────────────╮
  //    │   Constructor   │
  //    ╰─────────────────╯


  constructor(private gameService: GameService) {
    this.pigeonGamer$ = this.gameService.gamePigeon$.subscribe((gamePigeon) => {
      this.selectedGame = gamePigeon.game;
    });
  }
}
