import { ReadlineParser, SerialPort } from "serialport";

export function startSerialConnection(
  SERIAL_PORTS,
  BAUD_RATE,
  sendDataToClient
) {
  SERIAL_PORTS.forEach((portPath, index) => {
    const port = new SerialPort({ path: portPath, baudRate: BAUD_RATE });
    const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

    port.on("open", () => {
      console.log(
        `Serial connection started on ${portPath} with baud rate ${BAUD_RATE}.`
      );
    });

    parser.on("data", (data) => {
      console.log(`Dados recebidos de ${portPath}:`, data);

      let formattedData;
      if (index === 0) {
        formattedData = {temperature: data};
      } else if (index === 1) {
        formattedData = { weight: data };
      }

      sendDataToClient(formattedData);
    });

    port.on("error", (err) => {
      console.error("Error in serial communication:", err);
    });
  });
}
