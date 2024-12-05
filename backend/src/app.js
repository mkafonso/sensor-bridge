import express, { json } from "express";
import WebSocket from "ws";
// import { whatsappRoutes } from "./whatsapp/route.js";
import { startSerialConnection } from "./serial/index.js";

const app = express();
app.use(json());

const HTTP_PORT = 3003;
const WS_PORT = 4001;
const BAUD_RATE = 9600;

const SERIAL_PORT_TEMPERATURA = "/dev/tty.usbmodem11101";
const SERIAL_PORT_WEIGHT = "/dev/tty.usbmodem11201";

const wss = new WebSocket.Server({ port: WS_PORT });

wss.on("connection", (ws) => {
  console.log("Cliente WebSocket conectado");

  const sendDataToClient = (data) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  };

  const serialParser = startSerialConnection(
    [SERIAL_PORT_TEMPERATURA, SERIAL_PORT_WEIGHT],
    BAUD_RATE,
    sendDataToClient
  );

  ws.on("close", () => {
    console.log("Conexão WebSocket fechada");
  });

  ws.on("error", (err) => {
    console.error("Erro no WebSocket:", err);
  });
});

// app.use("/api", whatsappRoutes);

app.listen(HTTP_PORT, () => {
  console.log("Servidor HTTP rodando na porta", HTTP_PORT);
});
