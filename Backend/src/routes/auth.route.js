import express from 'express'
import {loginRoute,signupRoute,logoutRoute} from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/api/auth/login',loginRoute);

router.post('/api/auth/signup',signupRoute);

router.post('/api/auth/logout',logoutRoute);

export default router