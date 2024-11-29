import QRCode from "qrcode";
import { Client } from "whatsapp-web.js";

const client = new Client();

client.on("qr", (qr) => {
  QRCode.toString(
    qr,
    {
      type: "terminal",
      scale: 1,
      small: true,
    },
    (err, code) => {
      if (err) {
        console.error("Error generating QR code:", err);
      } else {
        console.log(code);
      }
    }
  );
});

client.on("ready", () => {
  console.log("WhatsApp client is ready!");
});

client.initialize();

/**
 * Send a WhatsApp message.
 * @param {string} to - Recipient's phone number in the format "number@c.us".
 * @param {string} message - The message to send.
 */
export const sendWhatsAppMessageService = async (to, message) => {
  try {
    await client.sendMessage(to, message);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error;
  }
};
