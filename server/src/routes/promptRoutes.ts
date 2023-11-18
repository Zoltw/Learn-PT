import express from 'express';
import * as promptController from '../controllers/promptController';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/prompt', promptController.sendPrompt);

export default router;
