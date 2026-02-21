import express from 'express'
import {loginRoute,signupRoute,logoutRoute} from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/login',loginRoute);

router.post('/signup',signupRoute);

router.post('/logout',logoutRoute);

export default router