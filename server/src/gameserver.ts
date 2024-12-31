import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import create_api, { gameUpdates$ } from "./api";
import { WebSocket } from "ws";
//import { DieValue } from "models/src/model/dice";
//import { LowerSectionKey } from "models/src/model/yahtzee.score";

interface TypedRequest<BodyType> extends Request {
  body: BodyType;
}

function start_server(ws: WebSocket) {
  const api = create_api(ws);
  const gameserver: Express = express();

  gameserver.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
    next();
  });

  gameserver.use(bodyParser.json());

  gameserver.post("/pending-games", async (req: TypedRequest<{ creator: string; number_of_players: number }>, res: Response) => {
    const { creator, number_of_players } = req.body;
    const game = api.new_game(creator, number_of_players);
    res.send(game);
    api.broadcast(game);
  });

  gameserver.get("/games", async (_: Request, res: Response) => {
    const games = api.games();
    res.send(games);
  });

  gameserver.post("/games/:id/actions", async (req: TypedRequest<any>, res: Response) => {
    const id = parseInt(req.params.id);
    try {
      const game = resolveAction(id, req.body);
      res.send(game);
      api.broadcast(game);
    } catch (e: any) {
      if (e.message === "Not Found") res.status(404).send();
      else res.status(403).send();
    }
  });

  function resolveAction(id: number, action: any) {
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
  gameUpdates$.subscribe((game) => {
    console.log("Game updated:", game);
  });

  gameserver.listen(8080, () => console.log("Gameserver listening on 8080"));
}

const ws = new WebSocket("ws://localhost:9090/publish");
ws.onopen = (e) => start_server(e.target);
