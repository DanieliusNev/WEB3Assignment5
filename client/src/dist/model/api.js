var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
function post(url, body = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return yield response.json();
    });
}
// Fetch ongoing games
export function fetchGames() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/games', { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return yield response.json();
    });
}
// Fetch pending games
export function fetchPendingGames() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:8080/pending-games', { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return yield response.json();
    });
}
// Join a pending game
export function joinGame(gameId, player) {
    return __awaiter(this, void 0, void 0, function* () {
        return post(`http://localhost:8080/pending-games/${gameId}/players`, { player });
    });
}
// Create a new game
export function createNewGame(numberOfPlayers, creator) {
    return __awaiter(this, void 0, void 0, function* () {
        return post('http://localhost:8080/pending-games', {
            number_of_players: numberOfPlayers,
            creator,
        });
    });
}
// Perform an action in a game
function performAction(gameId, action) {
    return __awaiter(this, void 0, void 0, function* () {
        return post(`http://localhost:8080/games/${gameId}/actions`, action);
    });
}
// Reroll dice
export function rerollDice(gameId, held, player) {
    return __awaiter(this, void 0, void 0, function* () {
        return performAction(gameId, { type: 'reroll', held, player });
    });
}
// Register a score
export function registerScore(gameId, slot, player) {
    return __awaiter(this, void 0, void 0, function* () {
        return performAction(gameId, { type: 'register', slot, player });
    });
}
