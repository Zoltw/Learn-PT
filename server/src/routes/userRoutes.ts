import express from 'express';
import * as userController from '../controllers/userController';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/level/:userId', userController.getUser);
router.get('/:userId', userController.getUser);

export default router;
