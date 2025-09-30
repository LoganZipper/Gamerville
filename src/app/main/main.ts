import { GameService } from '../_Services/game-service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestGameComponent } from "../_Games/test-game/test-game";
import { Subscription } from 'rxjs';
import { Game } from '../enum';
import { Cribbage } from "../_Games/cribbage/cribbage";
import { _GENERATE_ } from '../satchel';

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

  public selectedGame: Game = Game.Home;

  //    ╭─────────────────╮
  //    │   Constructor   │
  //    ╰─────────────────╯

   constructor (
    private gameService: GameService,
  ) {
    this.pigeonGamer$ = this.gameService.gamePigeon$.subscribe((gamePigeon) => {
      this.selectedGame = gamePigeon.game;
    });
  
  }
}
