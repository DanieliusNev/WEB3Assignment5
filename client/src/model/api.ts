import { DieValue } from '../../../models/dist/src/model/dice';
import { LowerSectionKey } from '../../../models/dist/src/model/yahtzee.score';

const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

async function post(url: string, body: {} = {}): Promise<any> {
  const response: Response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// Fetch ongoing games
export async function fetchGames(): Promise<any[]> {
  const response = await fetch('http://localhost:8080/games', { headers });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// Fetch pending games
export async function fetchPendingGames(): Promise<any[]> {
  const response = await fetch('http://localhost:8080/pending-games', { headers });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// Join a pending game
export async function joinGame(gameId: number, player: string): Promise<any> {
  return post(`http://localhost:8080/pending-games/${gameId}/players`, { player });
}

// Create a new game
export async function createNewGame(
  numberOfPlayers: number,
  creator: string
): Promise<any> {
  return post('http://localhost:8080/pending-games', {
    number_of_players: numberOfPlayers,
    creator,
  });
}

// Perform an action in a game
async function performAction(gameId: number, action: any): Promise<any> {
  return post(`http://localhost:8080/games/${gameId}/actions`, action);
}

// Reroll dice
export async function rerollDice(gameId: number, held: number[], player: string) {
  return performAction(gameId, { type: 'reroll', held, player });
}

// Register a score
export async function registerScore(
  gameId: number,
  slot: DieValue | LowerSectionKey,
  player: string
) {
  return performAction(gameId, { type: 'register', slot, player });
}
