import { CommonModule } from '@angular/common';
import { Game } from '../enum';
import { GameService } from './../game-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  public numberOfSlots = 0;

  constructor(private gameService: GameService) {}

  public getNumberOfSlots(): number {
    const navItems = document.getElementsByName('nav-item');
    this.numberOfSlots = navItems.length;
    return this.numberOfSlots;
  }

  public setCurrentGame(game: string): void {
    switch (game) {
      case Game.Home       : return this.gameService.setGame(Game.Home);
      case Game.Cribbage   : return this.gameService.setGame(Game.Cribbage);
      case Game.Euchre     : return this.gameService.setGame(Game.Euchre);
      case Game.Experiment : return this.gameService.setGame(Game.Experiment);
      case Game.MonoDeal   : return this.gameService.setGame(Game.MonoDeal);
    }

  }
}
