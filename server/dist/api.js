"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameUpdates$ = void 0;
const Game = __importStar(require("../../models/src/model/yahtzee.game"));
const rxjs_1 = require("rxjs");
const G = __importStar(require("./servermodel"));
const messageSubject = new rxjs_1.Subject();
exports.gameUpdates$ = messageSubject.asObservable();
exports.default = (ws) => {
    function new_game(creator, number_of_players) {
        return G.add(creator, number_of_players);
    }
    function reroll(id, held, player) {
        const game = G.game(id);
        if (!game || player !== game.players[game.playerInTurn])
            throw new Error("Forbidden");
        return G.update(id, (game) => Game.reroll(held, game));
    }
    function register(id, slot, player) {
        const game = G.game(id);
        if (!game || player !== game.players[game.playerInTurn])
            throw new Error("Forbidden");
        return G.update(id, (game) => Game.register(slot, game));
    }
    function games() {
        return G.all_games();
    }
    function pending_games() {
        return G.all_pending_games();
    }
    function join(id, player) {
        return G.join(id, player);
    }
    function broadcast(game) {
        messageSubject.next(game); // Emit the game update through RxJS
        ws.send(JSON.stringify({ type: "send", message: game }));
    }
    return {
        new_game,
        pending_games,
        join,
        games,
        reroll,
        register,
        broadcast,
    };
};
