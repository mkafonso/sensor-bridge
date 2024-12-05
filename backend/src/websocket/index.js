import WebSocket, { WebSocketServer } from "ws";

export const createWebSocketServer = (port, serialParser) => {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ message: "connected -> ws" }));

    if (serialParser && typeof serialParser.on === "function") {
      serialParser.on("data", (data) => {
        try {
          const [temperature, presence] = data
            .split(",")
            .map((value, index) =>
              index === 0 ? parseFloat(value) : value.trim() === "true"
            );

          const formattedData = { temperature, presence };
          sendDataToClient(formattedData);
        } catch (error) {
          console.error("error processing serial data:", err);
        }

        // try {
        //   const jsonData = parseSerialData(data);
        //   ws.send(JSON.stringify(jsonData));
        // } catch (err) {
        //   console.error("error processing serial data:", err);
        // }
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
