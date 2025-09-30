import { _GAME_DATA_, _INIT_TEST_GAME_, GamePigeon, HandContainer, ManPigeon } from '../satchel';
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
  private playerIDs: string[] = [];
  private playerHands: Map<string, HandContainer> = new Map();

  private currentGame: Game | null = null;
  private gameInProgress: boolean = false;

  public gamePigeon$ = new Subject<GamePigeon>();
  public manPigeon$ = new Subject<ManPigeon>();


  constructor(private lobbyService: LobbyService) {
    this.uid = this.lobbyService.getPovID();

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

  public initTestGame(): void {
    this.currentGame = Game.Cribbage;
    this.gameInProgress = true;
    this.gamePigeon$.next(new GamePigeon(Game.Cribbage));
    this.playerIDs = [this.uid, 'OPP1'];
    this.socket.emit(_INIT_TEST_GAME_, this.playerIDs);
  }

  // This method is bad but I'm an idiot
  public gimmeTheFuckingSocket() {
    return this.socket;
  }

  //    ╭────────────────────╮
  //    │   Public Methods   │
  //    ╰────────────────────╯

  public setGame(game: Game): void {
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

  public getPlayerHand(playerID: string): HandContainer {
    console.log(`Getting hand for player ${playerID}:`, this.playerHands.get(playerID));
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


  //    ╭─────────────────────╮
  //    │   Private Methods   │
  //    ╰─────────────────────╯

  private reset() {
    this.playerHands.clear();
    this.currentGame = null;
    this.gameInProgress = false;
  }
}
