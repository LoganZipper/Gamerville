import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Game } from '../enum';
import { GameService } from '../_Services/game-service';
import { ChangeDetectorRef, Component, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { _GENERATE_ } from '../satchel';
import { LobbyService } from '../_Services/lobby-service';
import { DEFAULT_USER } from '../satchel';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  public id: string = DEFAULT_USER; // No default, will be set by server
  public numberOfSlots = 0;

  constructor(private gameService: GameService,
    private lobbyService: LobbyService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = sessionStorage.getItem('UID') ?? DEFAULT_USER;
    this.gameService.init(this.id)

    this.gameService.gimmeTheFuckingSocket().on(_GENERATE_, (id: string) => {
      this.zone.run(() => {
        this.gameService.setGameInProgressStatus(this.id == id);
        this.id = id;
        sessionStorage.setItem('UID', id);
        this.gameService.setSoloPlayerID(id);
        this.lobbyService.setPovID(id);
        this.cdr.markForCheck();
      });
    });
  }

  ngAfterViewInit() {
    
  }

  public getNumberOfSlots(): number {
    const navItems = document.getElementsByName('nav-item');
    this.numberOfSlots = navItems.length;
    return this.numberOfSlots;
  }

  public setCurrentGame(game: string): void {
    window.location.href = `/${game}`;
    switch (game) {
      case Game.Home       : return this.gameService.setGame(Game.Home);
      case Game.Cribbage   : return this.gameService.setGame(Game.Cribbage);
      case Game.Euchre     : return this.gameService.setGame(Game.Euchre);
      case Game.Experiment : return this.gameService.setGame(Game.Experiment);
      case Game.MonoDeal   : return this.gameService.setGame(Game.MonoDeal);
    }  
  }

  private isUserInititialized(): boolean {
    this.id = sessionStorage.getItem('UID') ?? DEFAULT_USER;
    console.log(`Session returned ID is: ${this.id}`)
    return this.id !== DEFAULT_USER;
  }
}
