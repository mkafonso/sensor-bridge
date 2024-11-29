import { ReadlineParser, SerialPort } from "serialport";

export function startSerialConnection(SERIAL_PORT, BAUD_RATE) {
  const port = new SerialPort({ path: SERIAL_PORT, baudRate: BAUD_RATE });
  const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

  port.on("open", () => {
    console.log(
      `Serial connection started on ${SERIAL_PORT} with baud rate ${BAUD_RATE}.`
    );
  });

  parser.on("data", (data) => {
    console.log("Serial Data Received:", data);
  });

  port.on("error", (err) => {
    console.error("Error in serial communication:", err);
  });

  return parser;
}
