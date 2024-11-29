import { sendWhatsAppMessageService } from "./service.js";

/**
 * Controller to send a WhatsApp message.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const sendWhatsAppMessageController = async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res
      .status(400)
      .send({ success: false, error: "Recipient and message are required." });
  }

  try {
    await sendWhatsAppMessageService(`${to}@c.us`, message);
    res
      .status(200)
      .send({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};
