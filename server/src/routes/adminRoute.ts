import express from 'express';
import { aboutUs, deleteAbout, deleteTeam, deleteTestimonial, team, testimonial, updateAbout, updateTeam, updateTestimonial, viewAbout, viewAboutById, viewTeam, viewTeamById, viewTestimonial, viewTestimonialById } from '../controllers/adminController'; // Adjust the import path as needed
import { errorHandler } from '../error-handler';
import authMiddleware from '../middleware/auth';
import { compressImageMiddlewareSeo, uploadSeo } from '../middleware/uploadSeo';

const router = express.Router();

router.post('/about', 
  authMiddleware,  
  uploadSeo.fields([  
    { name: 'homeImage', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]),
  compressImageMiddlewareSeo,
  errorHandler(aboutUs)  
);
// Route for updating an existing About record by ID
router.put('/about/:id',  uploadSeo.fields([  
    { name: 'homeImage', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]),
  authMiddleware,
  compressImageMiddlewareSeo,
  errorHandler(updateAbout));

// Route for deleting an About record by ID
router.delete('/about/:id', authMiddleware,errorHandler(deleteAbout));

// Route for viewing all About records
router.get('/about',authMiddleware, errorHandler(viewAbout));

// Route for viewing an About record by ID
router.get('/about/:id',authMiddleware, errorHandler(viewAboutById));




router.post('/testimonial', 
  authMiddleware,  
  uploadSeo.fields([  
    
    { name: 'image', maxCount: 1 }
  ]),
  compressImageMiddlewareSeo,
  errorHandler(testimonial)  
);
// Route for updating an existing About record by ID
router.put('/testimonial/:id',  uploadSeo.fields([  
   
    { name: 'image', maxCount: 1 }
  ]),
  authMiddleware,
  compressImageMiddlewareSeo,
  errorHandler(updateTestimonial));

// Route for deleting an About record by ID
router.delete('/testimonial/:id', authMiddleware,errorHandler(deleteTestimonial));

// Route for viewing all About records
router.get('/testimonial',authMiddleware, errorHandler(viewTestimonial));

// Route for viewing an About record by ID
router.get('/testimonial/:id',authMiddleware, errorHandler(viewTestimonialById));





router.post('/team', 
  authMiddleware,  
  uploadSeo.fields([  
    
    { name: 'image', maxCount: 1 }
  ]),
  compressImageMiddlewareSeo,
  errorHandler(team)  
);
// Route for updating an existing About record by ID
router.put('/team/:id',  uploadSeo.fields([  
   
    { name: 'image', maxCount: 1 }
  ]),
  authMiddleware,
  compressImageMiddlewareSeo,
  errorHandler(updateTeam));

// Route for deleting an About record by ID
router.delete('/team/:id', authMiddleware,errorHandler(deleteTeam));

// Route for viewing all About records
router.get('/team',authMiddleware, errorHandler(viewTeam));

// Route for viewing an About record by ID
router.get('/team/:id',authMiddleware, errorHandler(viewTeamById));







export default router;
