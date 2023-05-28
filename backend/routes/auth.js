import express from 'express';
import { login, register, googleregister } from '../controllers/authController.js';

const router = express.Router();

router.post('/register',register);
router.post('/googleregister',googleregister);
router.post('/login',login);

export default router;