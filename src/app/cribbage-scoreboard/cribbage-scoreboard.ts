import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faCaretDown } from '@fortawesome/free-solid-svg-icons';
// import { DraggableIcon } from "../draggable-icon";

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
    e.preventDefault();
  }


  //TODO: Make the drog more foriving. Somehow there needs to be a greater accepted radius.
  //      Or, otherwise make it so the peg snaps to the closest hole.

  onPegDrop(e: any) {
    // if(!e.dataTransfer || !e.target) return;
    e.preventDefault();
    console.log(e)
    console.log(e.target)
    console.log(e.target.classList)
    // if (e.target.classlist.contains('peg-pov')) return;
    const pegNum: number = parseInt(e.target.id.replace('peg-pov-', ''));
    if (isNaN(pegNum)) return;

    // e.target.classList.remove('invisible');
    
    this.removePeg(this.povPegs[1])
    this.addPeg(pegNum);
    // this.povPegs.sort((a, b) => a - b);
    console.log(this.povPegs);
  }


  addPeg(num: number) {
    this.povPegs = [num, ...this.povPegs];
  }

removePeg(num: number) {
  this.povPegs = this.povPegs.filter(n => n !== num);
}
}
