import {initUdp} from "./udp-server.js";
import {initWs} from "./ws-server.js";
import {argv} from "node:process"

if (argv[2] === "ws") {
    initWs()
} else {
    initUdp();
}