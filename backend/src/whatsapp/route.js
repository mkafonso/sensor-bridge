import { Router } from "express";

import { sendWhatsAppMessageController } from "./controller.js";

const whatsappRoutes = Router();

whatsappRoutes.post("/send-message", sendWhatsAppMessageController);

export { whatsappRoutes };
