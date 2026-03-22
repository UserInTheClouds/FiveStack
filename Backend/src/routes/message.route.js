import express from 'express'
import protectRoute from '../middlewares/protectRoute.js';
import { sendMessage,receiveMessage,getUsersRoute,searchUsername } from '../controllers/message.controller.js';

const router = express.Router();

router.post('/send/:id',protectRoute,sendMessage);
router.get('/receive/:id',protectRoute,receiveMessage);
router.get('/users',protectRoute,getUsersRoute);
router.get('/users/search',protectRoute,searchUsername);

export default router