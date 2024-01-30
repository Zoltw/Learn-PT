import express from 'express';
import * as userController from '../controllers/userController';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/level/:userId', userController.updateUserGoal);
router.put('/words/:userId', userController.updateUserWords);
router.put('/baseLanguage/:userId', userController.updateUserBaseLanguage);
router.put('/goalLanguage/:userId', userController.updateUserGoalLanguage);
router.get('/statistics/:userId', userController.getAllUserStats);
router.get('/:userId', userController.getUser);
router.delete('/:userId', userController.deleteUser);

export default router;

