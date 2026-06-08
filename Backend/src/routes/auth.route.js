import express from 'express'
import { signupRoute, loginRoute, checkRoute, logoutRoute, verifyRoute, forgotPasswordRoute, resetPasswordRoute, refreshTokenRoute } from '../controllers/auth.controller.js';
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router();

router.post('/signup', signupRoute);
router.post('/login', loginRoute);
router.post('/logout', logoutRoute);
router.get('/check', protectRoute, checkRoute);
router.post('/verifyotp', verifyRoute);
router.post('/forgot-password', forgotPasswordRoute);
router.post('/reset-password', resetPasswordRoute);
router.post('/refresh', refreshTokenRoute);

export default router