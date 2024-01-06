import net from 'node:net';
import {connect} from "./redis.js";

export async function initUdp() {
    const conn = await connect()
    const server = net.createServer((s) => {
        console.log('Client Connected')
        s.on('end', () => {
            console.log("Client disconnected")
        })
        s.on('data', (msg => {
            console.log(`server got: ${msg} from ${s.address().address}:${s.address().port}`);
            conn.sendCommand(['PUBLISH', 'loc', msg.toString()])
                .then((x) => {
                    console.log("Redis Ans: ", JSON.stringify(x));
                    s.write(Buffer.from(JSON.stringify(x)))
                })
        }))
    });


    server.on('error', (err) => {
        console.error(`server error:\n${err.stack}`);
        server.close();
    });


    server.listen(8088, () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });
}
