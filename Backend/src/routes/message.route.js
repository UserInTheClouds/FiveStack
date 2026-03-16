import express from 'express'
import protectRoute from '../middlewares/protectRoute.js';
import { sendMessage,receiveMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.post('/send/:id',protectRoute,sendMessage);
router.get('/receive/:id',protectRoute,receiveMessage);

export default router