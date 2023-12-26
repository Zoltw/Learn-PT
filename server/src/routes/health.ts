import express from 'express';
import * as health from '../controllers/healthController';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('', health.getHealth);

export default router;
