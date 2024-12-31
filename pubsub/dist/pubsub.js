"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const webSocketServer = new ws_1.WebSocketServer({ port: 9090, path: '/publish' });
const clients = new Set();
const send = (message) => {
    for (let ws of clients)
        if (ws.readyState === ws_1.WebSocket.OPEN)
            ws.send(JSON.stringify(message));
};
const close = (ws) => {
    if (ws.readyState === ws_1.WebSocket.OPEN)
        ws.close();
    clients.delete(ws);
};
webSocketServer.on('connection', (ws, req) => {
    ws.on('message', message => {
        try {
            const command = JSON.parse(message.toString());
            switch (command.type) {
                case 'subscribe':
                    clients.add(ws);
                    break;
                case 'unsubscribe':
                    clients.delete(ws);
                    break;
                case 'send':
                    send(command.message);
                    break;
                case 'close':
                    close(ws);
                    break;
                default:
                    console.error(`Incorrect message: '${message}' from ${req.socket.remoteAddress} (${req.socket.remoteFamily})`);
            }
        }
        catch (e) {
            console.error(e);
        }
    });
    ws.on('close', () => close(ws));
});
console.log('Pub/Sub server listening on 9090');
