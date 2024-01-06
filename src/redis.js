import { createClient } from 'redis';

export async function connect() {

const client = createClient({
    socket: {
        tls: false,
    },
    url: "redis://localhost:6379"
});

client.on('error', err => console.log('Redis Client Error', err));

return client.connect().then((x) => {
    console.log("Connection Successful");
    return x;
});
}
