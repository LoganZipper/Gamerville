import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { DraggableIcon } from "../draggable-icon";

@Component({
  selector: 'app-cribbage-scoreboard',
  imports: [CommonModule, FontAwesomeModule, DraggableIcon],
  templateUrl: './cribbage-scoreboard.html',
  styleUrl: './cribbage-scoreboard.scss'
})
export class CribbageScoreboard {
  public totalDivs: number = 120;
  public divs: number[] = Array.from({ length: this.totalDivs }, (_, i) => i + 1);
  public povPegs: number[] = [10, -1];
  public oppPegs: number[] = [-1, -1];

  faChevronDown = faChevronDown;
  faCaretDown = faCaretDown;
}
