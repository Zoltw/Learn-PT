import express from 'express';
import * as userController from '../controllers/userController';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/level/:userId', userController.updateUserGoal);
router.post('/words/:userId', userController.updateUserWords);
router.post('/baseLanguage/:userId', userController.updateUserLanguages);
router.get('/statistics/:userId', userController.getAllUserStats);
router.get('/:userId', userController.getUser);
router.delete('/:userId', userController.deleteUser);

export default router;
