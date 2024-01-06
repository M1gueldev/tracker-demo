import dgram from 'node:dgram';
import {connect} from "./redis.js";

export async function initUdp() {
    const server = dgram.createSocket('udp4');

    let conn = await connect()

    server.on('error', (err) => {
        console.error(`server error:\n${err.stack}`);
        server.close();
    });

    server.on('message',async (msg, rinfo) => {
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        await conn.sendCommand(['PUBLISH', 'loc', JSON.stringify(msg)]).then((x) => {console.log("REdis Ans: ", JSON.stringify(x)); return x})
    });

    server.on('listening', () => {
        const address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });

    server.bind(41234);
}
