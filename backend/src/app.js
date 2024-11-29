import express, { json } from "express";

import { whatsappRoutes } from "./whatsapp/route.js";
// import { startSerialConnection } from "./serial/index.js";
// import { createWebSocketServer } from "./websocket/index.js";

const HTTP_PORT = 3003;
const WS_PORT = 4001;
const BAUD_RATE = 9600;
const SERIAL_PORT = "/dev/tty.usbmodem1101";
const app = express();

app.use(json());

// init serial connection
// const serialParser = startSerialConnection(SERIAL_PORT, BAUD_RATE);

// websocket server
// createWebSocketServer(WS_PORT, serialParser);

app.use("/api", whatsappRoutes);

app.listen(HTTP_PORT, () => console.log("Server running on port ", HTTP_PORT));
