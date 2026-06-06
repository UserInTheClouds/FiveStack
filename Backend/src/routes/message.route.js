import express from 'express'
import protectRoute from '../middlewares/protectRoute.js';
import { upload } from '../middlewares/preUpload.js';
import { sendMessage, receiveMessage, getUsersRoute, searchUsername } from '../controllers/message.controller.js';

const router = express.Router();

router.post('/send/:id', protectRoute, upload.single('image'), sendMessage);
router.get('/receive/:id', protectRoute, receiveMessage);

router.get('/users/search', protectRoute, searchUsername);
router.get('/users', protectRoute, getUsersRoute);

export default router
