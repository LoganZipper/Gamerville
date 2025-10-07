import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { DraggableIcon } from "../draggable-icon";

@Component({
  selector: 'app-cribbage-scoreboard',
  imports: [CommonModule, FontAwesomeModule],
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



  onPegDragStart(e: DragEvent, num: number) {
    // if (!e.dataTransfer) return;
    console.log(e);
    // e.dataTransfer.setData("Text", (e.target as HTMLElement).id);
  }

  onPegDragEnd(e: DragEvent, num: number) {

  }

  onPegDragOver(e: DragEvent) {
    // e.preventDefault();
  }

  onPegDrop(e: any) {
    // if(!e.dataTransfer || !e.target) return;
    console.log(e)
    console.log(e.target)
    console.log(e.target.classList)
    e.target.classList.remove('invisible');
    // e.preventDefault();
  }
}
