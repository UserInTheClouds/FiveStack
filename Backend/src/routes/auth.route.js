import express from 'express'
import { signupRoute,loginRoute,checkRoute,logoutRoute,verifyRoute } from '../controllers/auth.controller.js';
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router();

router.post('/signup',signupRoute);
router.post('/login',loginRoute);
router.post('/logout',logoutRoute);
router.get('/check',protectRoute,checkRoute);
router.post('/verifyotp',verifyRoute);

export default router