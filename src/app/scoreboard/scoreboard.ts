import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  imports: [],
  templateUrl: './scoreboard.html',
  styleUrl: './scoreboard.scss'
})
export class Scoreboard {
  @Input() scores: { [key: string]: number } = {};

  // Logic for swapping scoreboard?
  //    probably can iterate over player count and add.

  // TODO: Preferences for layout later on

  // TODO: Allow manual incrementing of score.
  //        - games will always allow auto-scorekeeping.
  //        - manually incremented games will still auto win.
  //              - will make setting for that as well



//    ╭────────────────╮
//    │  Visual Setup  │
//    ╰────────────────╯


}
