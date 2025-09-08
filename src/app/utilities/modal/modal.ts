import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  @Input() isOpen: boolean = false;
  @Input() content: string = "Test";

  close() {
    this.isOpen = false;
  }
}
