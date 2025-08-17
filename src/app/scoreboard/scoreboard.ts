import { Component, Input } from '@angular/core';
import { Game } from '../enum';
import { CribbageScoreboard } from "../cribbage-scoreboard/cribbage-scoreboard";

@Component({
  selector: 'app-scoreboard',
  imports: [CribbageScoreboard],
  templateUrl: './scoreboard.html',
  styleUrl: './scoreboard.scss'
})
export class Scoreboard {
  // @Input() scores: { [key: string]: number } = {};
  @Input() game: Game = Game.Home; // Default game type

  // Logic for swapping scoreboard?
  //    probably can iterate over player count and add.


  // TODO: Allow manual incrementing of score.
  //        - games will always allow auto-scorekeeping.
  //        - manually incremented games will still auto win.
  //              - will make setting for that as well





//    ╭────────────────╮
//    │  Visual Setup  │
//    ╰────────────────╯



}
