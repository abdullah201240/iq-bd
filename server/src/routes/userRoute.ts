import express from 'express';
import {  viewAboutById } from '../controllers/userController'; // Adjust the import path as needed
import { errorHandler } from '../error-handler';

const router = express.Router();

// Route for viewing an About record by ID
router.get('/about/:id', errorHandler(viewAboutById));

export default router;
