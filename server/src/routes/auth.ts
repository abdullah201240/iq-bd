import express from 'express';
import { createAdmin, me } from '../controllers/adminController'; // Adjust the import path as needed
import { errorHandler } from '../error-handler';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// Route to create a new admin
router.post('/createAdmin', errorHandler(createAdmin));
router.post('/login', errorHandler(createAdmin));

router.get('/me',[authMiddleware],errorHandler(me));

export default router;
