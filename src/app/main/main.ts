import { Component } from '@angular/core';
import { TestGameComponent } from "../test-game/test-game";

@Component({
  selector: 'app-main',
  imports: [TestGameComponent],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class MainComponent {
  // Main component logic can be added here if needed
  // Currently, it serves as a container for the TestGameComponent

}
