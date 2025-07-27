import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
public numberOfSlots = 0;

public getNumberOfSlots(): number {
    const navItems = document.getElementsByName('nav-item');
    this.numberOfSlots = navItems.length;
    return this.numberOfSlots;
  }
}
