import express from 'express'
import { signupRoute,loginRoute,checkRoute,logoutRoute } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signupRoute);
router.post('/login',loginRoute);
router.post('logout',logoutRoute);
router.get('/check',checkRoute);

export default router