import express from 'express';
import { aboutUs, category, createBestProject, createBlog, createClientHandler, createJob, createProject, createStory, deleteAbout, deleteBestProject, deleteBlog, deleteCategory, deleteClient, deleteJob, deleteServices, deleteStory, deleteTeam, deleteTestimonial, deleteWeAchieved, jobApplyById, services, team, testimonial, updateAbout, updateJob, updateServices, updateTeam, updateTestimonial, updateWeAchieved, viewAbout, viewAboutById, viewBestProject, viewBlog, viewCategory, viewCategoryById, viewClient, viewContacts, viewJob, viewProjects, viewServices, viewServicesById, viewStory, viewTeam, viewTeamById, viewTestimonial, viewTestimonialById, viewWeAchieved, viewWeAchievedById, weAchieved } from '../controllers/adminController'; // Adjust the import path as needed
import { errorHandler } from '../error-handler';
import authMiddleware from '../middleware/auth';
import { compressImageMiddlewareSeo, uploadSeo } from '../middleware/uploadSeo';
import { convertToWebP, uploadMul } from '../middleware/uploadMiddleware';

const router = express.Router();

router.post('/about', 
  authMiddleware,  
  uploadSeo.fields([  
    { name: 'homeImage', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]),
  
  errorHandler(aboutUs)  
);
// Route for updating an existing About record by ID
router.put('/about/:id',  uploadSeo.fields([  
    { name: 'homeImage', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]),
  authMiddleware,
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

router.post('/services', 
  authMiddleware,  
  uploadSeo.fields([  
    
    { name: 'logo', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]),
  compressImageMiddlewareSeo,
  errorHandler(services)  
);
// Route for updating an existing About record by ID
router.put('/services/:id',  uploadSeo.fields([  
   
  { name: 'logo', maxCount: 1 },
  { name: 'image', maxCount: 1 }
  ]),
  authMiddleware,
  compressImageMiddlewareSeo,
  errorHandler(updateServices));

// Route for deleting an About record by ID
router.delete('/services/:id', authMiddleware,errorHandler(deleteServices));

// Route for viewing all About records
router.get('/services',authMiddleware, errorHandler(viewServices));

// Route for viewing an About record by ID
router.get('/services/:id',authMiddleware, errorHandler(viewServicesById));

router.get('/contacts',authMiddleware, errorHandler(viewContacts));

router.post('/category', 
  authMiddleware, 
  errorHandler(category)  
);
router.delete('/category/:id', authMiddleware,errorHandler(deleteCategory));

router.get('/category',authMiddleware, errorHandler(viewCategory));
router.get('/category/:id',authMiddleware, errorHandler(viewCategoryById));


router.post('/createProject',authMiddleware, uploadMul,compressImageMiddlewareSeo,errorHandler(createProject));
router.get('/projects',authMiddleware, errorHandler(viewProjects));

router.post('/weAchieved', 
  authMiddleware, 
  uploadSeo.fields([ 
    { name: 'image', maxCount: 1 }
  ]),
  compressImageMiddlewareSeo,
  errorHandler(weAchieved)  
);
router.get('/viewWeAchieved',authMiddleware, errorHandler(viewWeAchieved));

router.get('/viewWeAchieved/:id',authMiddleware, errorHandler(viewWeAchievedById));
router.put('/weAchieved/:id',  uploadSeo.fields([  
   
  { name: 'image', maxCount: 1 }
]),
authMiddleware,
compressImageMiddlewareSeo,
errorHandler(updateWeAchieved));

router.delete('/deleteWeAchieved/:id', authMiddleware,errorHandler(deleteWeAchieved));

router.post('/createClient', 
  authMiddleware, 
  uploadSeo.fields([ 
    { name: 'image', maxCount: 1 }
  ]),
  compressImageMiddlewareSeo,
  errorHandler(createClientHandler)  
);


router.get('/viewClient',authMiddleware, errorHandler(viewClient));


router.delete('/deleteClient/:id', authMiddleware,errorHandler(deleteClient));


router.post('/createBestProject', 
  authMiddleware, 
  uploadSeo.fields([ 
    { name: 'image', maxCount: 1 }
  ]),
  errorHandler(createBestProject)  
);


router.get('/viewBestProject',authMiddleware, errorHandler(viewBestProject));


router.delete('/deleteBestProject/:id', authMiddleware,errorHandler(deleteBestProject));

router.post('/createStory', 
  authMiddleware,
  errorHandler(createStory)  
);


router.get('/viewStory',authMiddleware, errorHandler(viewStory));


router.delete('/deleteStory/:id', authMiddleware,errorHandler(deleteStory));

router.post('/createBlog', 
  authMiddleware, 
  uploadSeo.fields([ 
    { name: 'image', maxCount: 1 }
  ]),
  compressImageMiddlewareSeo,
  errorHandler(createBlog)  
);
router.get('/viewBlog',authMiddleware, errorHandler(viewBlog));
router.delete('/deleteBlog/:id', authMiddleware,errorHandler(deleteBlog));

router.post('/job', 
  authMiddleware,
  errorHandler(createJob)  
);

router.get('/job',authMiddleware, errorHandler(viewJob));

router.delete('/job/:id', authMiddleware,errorHandler(deleteJob));

router.put('/job/:id', 
authMiddleware,
errorHandler(updateJob));

router.get('/jobApply/:id',authMiddleware, errorHandler(jobApplyById));


export default router;
