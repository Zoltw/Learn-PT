import express from "express";
import * as promptController from "../controllers/promptController";

const router = express.Router();

router.post("/chat_prompt", promptController.sendPrompt);

export default router;
