import { Router } from 'express';
import  userController  from '../controllers/userController.js';
const router = Router();
router.get('/profile', userController.getProfile);
router.get('/:id', userController.getUserById);

export default router;