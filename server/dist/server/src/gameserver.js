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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const api_1 = __importStar(require("./api"));
const ws_1 = require("ws");
function start_server(ws) {
    const api = (0, api_1.default)(ws);
    const gameserver = (0, express_1.default)();
    gameserver.use((_, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
        next();
    });
    gameserver.use(body_parser_1.default.json());
    gameserver.post("/pending-games", async (req, res) => {
        const { creator, number_of_players } = req.body;
        const game = api.new_game(creator, number_of_players);
        res.send(game);
        api.broadcast(game);
    });
    gameserver.get("/games", async (_, res) => {
        const games = api.games();
        res.send(games);
    });
    gameserver.post("/games/:id/actions", async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const game = resolveAction(id, req.body);
            res.send(game);
            api.broadcast(game);
        }
        catch (e) {
            if (e.message === "Not Found")
                res.status(404).send();
            else
                res.status(403).send();
        }
    });
    function resolveAction(id, action) {
        switch (action.type) {
            case "reroll":
                return api.reroll(id, action.held, action.player);
            case "register":
                return api.register(id, action.slot, action.player);
            default:
                throw new Error("Invalid action");
        }
    }
    // Log RxJS game updates for debugging
    api_1.gameUpdates$.subscribe((game) => {
        console.log("Game updated:", game);
    });
    gameserver.listen(8080, () => console.log("Gameserver listening on 8080"));
}
const ws = new ws_1.WebSocket("ws://localhost:9090/publish");
ws.onopen = (e) => start_server(e.target);
