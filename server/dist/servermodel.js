"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.all_games = all_games;
exports.all_pending_games = all_pending_games;
exports.game = game;
exports.add = add;
exports.join = join;
exports.update = update;
const dice_1 = require("../../models/src/model/dice");
const yahtzee_game_1 = require("../../models/src/model/yahtzee.game");
const random_utils_1 = require("../../models/src/utils/random_utils");
let global_id = 1;
const game0 = {
    id: 0,
    players: ['Alice', 'Bob'],
    playerInTurn: 0,
    roll: [1, 2, 3, 2, 4],
    rolls_left: 2,
    upper_sections: [
        {
            scores: {
                [1]: 3,
                [2]: undefined,
                [3]: undefined,
                [4]: 12,
                [5]: 15,
                [6]: 18
            }
        },
        {
            scores: {
                [1]: 3,
                [2]: undefined,
                [3]: 12,
                [4]: 12,
                [5]: 20,
                [6]: 18
            }
        }
    ],
    lower_sections: [
        {
            scores: {
                'pair': 12,
                'two pairs': 22,
                'three of a kind': 15,
                'four of a kind': 16,
                'full house': 27,
                'small straight': 0,
                'large straight': 20,
                'chance': 26,
                'yahtzee': 0
            }
        },
        {
            scores: {
                'pair': 10,
                'two pairs': 14,
                'three of a kind': 12,
                'four of a kind': 8,
                'full house': 18,
                'small straight': 0,
                'large straight': 0,
                'chance': 22,
                'yahtzee': undefined
            }
        }
    ],
    pending: false,
    roller: (0, dice_1.dice_roller)(random_utils_1.standardRandomizer)
};
const games = [game0];
const pending_games = [];
function all_games() {
    return games;
}
function all_pending_games() {
    return pending_games;
}
function game(id) {
    return games.find(g => g.id === id);
}
function add(creator, number_of_players) {
    const id = global_id++;
    const pending_game = { id, creator, players: [], number_of_players, pending: true };
    pending_games.push(pending_game);
    return join(id, creator);
}
function join(id, player) {
    const index = pending_games.findIndex(g => g.id === id);
    if (index === -1)
        throw new Error('Not found');
    const pending_game = pending_games[index];
    pending_game.players.push(player);
    if (pending_game.players.length === pending_game.number_of_players) {
        const game = (0, yahtzee_game_1.new_yahtzee)({ players: pending_game.players, randomizer: random_utils_1.standardRandomizer });
        pending_games.splice(index, 1);
        games.push(Object.assign(Object.assign({}, game), { id, pending: false }));
        return Object.assign(Object.assign({}, game), { id, pending: false });
    }
    else {
        return pending_game;
    }
}
function update(id, reroll) {
    const index = games.findIndex(g => g.id === id);
    if (index === -1)
        throw new Error('Not found');
    games[index] = Object.assign(Object.assign({}, reroll(games[index])), { id, pending: games[index].pending });
    return games[index];
}
