import WebSocket, { WebSocketServer } from "ws";

export const createWebSocketServer = (port, serialParser) => {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ message: "connected -> ws" }));

    if (serialParser && typeof serialParser.on === "function") {
      serialParser.on("data", (data) => {
        try {
          const jsonData = parseSerialData(data);
          ws.send(JSON.stringify(jsonData));
        } catch (err) {
          console.error("error processing serial data:", err);
        }
      });
    } else {
      console.error(
        "serialParser is not defined or does not have an 'on' method"
      );
    }

    ws.on("close", () => {
      console.log("connection closed -> ws");
    });
  });

  console.log(`WebSocket server running on port: ${port}`);
};

const parseSerialData = (data) => {
  return { temperature: data };
};