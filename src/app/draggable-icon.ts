// * This document was generate by ChatGPT.
// It is a directive that allows an icon to be draggable within the application.

import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[draggableIcon]'
})
export class DraggableIcon {
  private isDragging = false;
  private dragClone: HTMLElement | null = null;
  // private iconSize = 24; // adjust to match your fa-icon size

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Keep original styling intact (don't force absolute anymore!)
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5'); // fade original

    // Create a clone of the icon
    this.dragClone = this.el.nativeElement.cloneNode(true) as HTMLElement;
    this.renderer.setStyle(this.dragClone, 'position', 'absolute');
    this.renderer.setStyle(this.dragClone, 'pointer-events', 'none');
    this.renderer.setStyle(this.dragClone, 'cursor', 'grabbing');
    this.renderer.setStyle(this.dragClone, 'opacity', '1');

    document.body.appendChild(this.dragClone);
    this.moveClone(event);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.dragClone) {
      this.moveClone(event);
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
    // this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');

    if (this.dragClone) {
      this.dragClone.remove();
      this.dragClone = null;
    }
  }

  private moveClone(event: MouseEvent) {
    if (!this.dragClone) return;
    const x = event.pageX;
    const y = event.pageY;
    this.renderer.setStyle(this.dragClone, 'left', `${x}px`);
    this.renderer.setStyle(this.dragClone, 'top', `${y}px`);
  }
}
