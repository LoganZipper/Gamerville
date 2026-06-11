import { _INIT_, _GAME_DATA_, _INIT_TEST_GAME_, _RESUME_TEST_GAME_, GamePigeon, HandContainer, ManPigeon } from '../satchel';
import { Injectable } from '@angular/core';
import { Game } from '../enum';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { LobbyService } from './lobby-service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  //    ╭────────────────╮
  //    │   Properties   │
  //    ╰────────────────╯

  private socket = io('http://localhost:3000');

  private uid: string = '0000'; // Default until set by server
  private oid: string = 'OPP1'; // Default until set by player
  private playerIDs: string[] = [];
  private playerHands: Map<string, HandContainer> = new Map();

  private currentGame: Game | null = null;
  private isGameOngoing: boolean = false;

  public gamePigeon$ = new Subject<GamePigeon>();
  public manPigeon$ = new Subject<ManPigeon>();


  constructor(private lobbyService: LobbyService) {
    this.socket.on(_GAME_DATA_, (data: any) => {
      data.forEach((entry: { id: string; hand: HandContainer }) => {
        this.playerHands.set(entry.id, entry.hand);
      });
      this.manPigeon$.next(new ManPigeon(true));
    });
      
    }

  //    ╭─────────────────╮
  //    │   BIG Methods   │
  //    ╰─────────────────╯

  public init(UID: string): void {
    this.socket.emit(_INIT_, UID);
  }

  public initTestGame(): void {
    this.lobbyService.lobbyPigeon$.subscribe((isGangweed) => {
      this.isGameOngoing = true;
      this.setGame(Game.Cribbage);

      this.uid = isGangweed;
      this.playerIDs = [this.uid, this.oid];
      this.socket.emit(_INIT_TEST_GAME_, this.playerIDs);
    })
  }

  public resumeTestGame(): void {
    this.isGameOngoing = true;
    this.setGame(Game.Cribbage);

    this.uid = this.lobbyService.getPovID();
    this.playerIDs = [this.uid, this.oid];
    this.socket.emit(_RESUME_TEST_GAME_, this.playerIDs);
  }

  // This method is bad but I'm an idiot
  public gimmeTheFuckingSocket() {
    return this.socket;
  }

  //    ╭────────────────────╮
  //    │   Public Methods   │
  //    ╰────────────────────╯

  public setGame(game: Game): void {
    this.currentGame = Game.Cribbage;
    this.gamePigeon$.next(new GamePigeon(game));
  }

  public setSoloPlayerID(id: string): void {
    this.playerIDs = [id];
    this.uid = id;
  }

  public setPlayerHand(playerID: string, hand: HandContainer): void {
    this.playerHands.set(playerID, hand);
  }

  public setPlayerIDs(ids: string[]): void {
    this.playerIDs = ids;
  }

  public getPovID(): string {
    return this.uid;
  }

  public getOppID(): string {
    return this.oid;
  }

  public getPlayerHand(playerID: string): HandContainer {
    return this.playerHands.get(playerID) ?? new HandContainer();
  }

  public getAllPlayers() {
    return this.playerHands;
  }

   public isItMyTurn(): boolean {
    return true; // Placeholder return value
  }

  public whoseTurnIsIt(): Promise<string> {
    return new Promise((resolve) => {
      this.socket.emit('getCurrentPlayer', this.playerIDs).once('currentPlayer', (currentPlayerID: string) => {
        resolve(currentPlayerID);
      });
    });
  }

  // Used in Header component.
  // That needs to change at some point
  public isGameInProgress(): boolean {
    return this.isGameOngoing;
  }

  public setGameInProgressStatus(status: boolean): void {
    this.isGameOngoing = status;
  }


  //    ╭─────────────────────╮
  //    │   Private Methods   │
  //    ╰─────────────────────╯

  private reset() {
    this.playerHands.clear();
    this.currentGame = null;
    this.isGameOngoing = false;
  }
}
