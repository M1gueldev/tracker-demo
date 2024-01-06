import {connect} from "./redis.js";
import WebSocket, { WebSocketServer } from 'ws';

export async function initWs() {
    const wss = new WebSocketServer({port: 7071});
    wss.on('connection', ws => {
        let conn = connect().then(x => {
            x.subscribe('loc', (x) => {
                console.log(x)
                ws.send(x)
            }).then()
        })
    })


}