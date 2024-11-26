import express from 'express';
import {  viewAboutById, viewTeam, viewTestimonial } from '../controllers/userController'; // Adjust the import path as needed
import { errorHandler } from '../error-handler';

const router = express.Router();

// Route for viewing an About record by ID
router.get('/about/:id', errorHandler(viewAboutById));
router.get('/testimonial', errorHandler(viewTestimonial));
router.get('/team', errorHandler(viewTeam));


export default router;
