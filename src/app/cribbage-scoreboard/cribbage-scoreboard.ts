import { Component } from '@angular/core';

@Component({
  selector: 'app-cribbage-scoreboard',
  imports: [],
  templateUrl: './cribbage-scoreboard.html',
  styleUrl: './cribbage-scoreboard.scss'
})
export class CribbageScoreboard {
  totalDivs = 120;
  divs = Array.from({ length: this.totalDivs }, (_, i) => i + 1);

}
