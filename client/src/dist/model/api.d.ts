import { DieValue } from '../../models/dist/src/model/dice';
import { LowerSectionKey } from '../../models/dist/src/model/yahtzee.score';
export declare function fetchGames(): Promise<any[]>;
export declare function fetchPendingGames(): Promise<any[]>;
export declare function joinGame(gameId: number, player: string): Promise<any>;
export declare function createNewGame(numberOfPlayers: number, creator: string): Promise<any>;
export declare function rerollDice(gameId: number, held: number[], player: string): Promise<any>;
export declare function registerScore(gameId: number, slot: DieValue | LowerSectionKey, player: string): Promise<any>;
