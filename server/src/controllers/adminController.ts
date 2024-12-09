import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import AdminModel from '../models/admin'; // Adjust the import path as needed
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { aboutSchema, blogSchema, categorySchema, jobSchema, loginSchema, projectSchema, servicesSchema, signupSchema, teamSchema, testimonialSchema, weAchievedSchema } from '../schema/admin';
import { UnprocessableEntity } from '../exceptions/validation';
import jwt from 'jsonwebtoken';
import AboutModel from '../models/about';
import TestimonialModel from '../models/testimonial';
import TeamModel from '../models/team';
import ServicesModel from '../models/services';
import ContactsModel from '../models/contact';
import ProjectCategoryModel from '../models/projectCategory';
import Projects from '../models/project';
import ProjectImage from '../models/projectImage';
import ProjectCategory from '../models/projectCategory';
import WeAchieved from '../models/weAchieved';
import Client from '../models/client';
import BestProject from '../models/bestProject';
import Story from '../models/story';
import Blog from '../models/blog';
import Job from '../models/job';
const JWT_SECRET = process.env.JWT_SECRET_KEY || "12sawegg23grr434"; // Fallback to a hardcoded secret if not in env


export const createAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any | Response> => {
console.log(req.body)
  const result = signupSchema.safeParse(req.body); // Zod validation

  if (!result.success) {
    // If validation fails, throw a custom error
    return next(new UnprocessableEntity(result.error.errors, 'Validation Error'));
  }
  const { name, email, password, phone, dob, gender, role } = req.body;
  if (!name || !email || !password || !phone || !dob || !gender || !role) {
    return next(new BadRequestException('All fields are required', ErrorCode.MISSING_FIELDS));
  }

  // Check if admin already exists
  const existingAdmin = await AdminModel.findOne({ where: { email } });
  if (existingAdmin) {
    return next(new BadRequestException('Admin already exists', ErrorCode.ADMIN_ALREADY_EXISTS));
  }
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new admin in the database
  const newAdmin = await AdminModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    dob,
    gender,
    role,
  });

  // Exclude the password from the response
  const { password: _, ...adminResponse } = newAdmin.toJSON();
  return res.status(201).json({ message: 'Admin created successfully', admin: adminResponse });

};


// Delete API
export const deleteAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const deletedCount = await AdminModel.destroy({
    where: { id }, // Delete the record by ID
  });

  if (deletedCount === 0) {
    return next(new BadRequestException('Admin record not found', ErrorCode.ADMIN_RECORD_NOT_FOUND));
   
  }

  return res.status(200).json({ message: 'Admin deleted successfully' });
};
// View API (Fetch all Admin records)
export const viewAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const adminRecords = await AdminModel.findAll();

  if (!adminRecords || adminRecords.length === 0) {
    return next(new BadRequestException('Admin record not found', ErrorCode.ADMIN_RECORD_NOT_FOUND));
  }

  return res.status(200).json({ message: 'Fetched adminRecords records successfully', data: adminRecords });
};
// View by ID API (Fetch a specific Admin record by ID)
export const viewAdminById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const adminRecords = await AdminModel.findByPk(id); // Find the record by primary key

  if (!adminRecords) {
    return next(new BadRequestException(`About record with ID ${id} not found`, ErrorCode.ADMIN_RECORD_NOT_FOUND));
    
  }

  return res.status(200).json({ message: 'Fetched About record successfully', data: adminRecords });
};





export const login = async (req: Request, res: Response, next: NextFunction): Promise<any | Response> => {
  // Zod validation for request body
  const validation = loginSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {

    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }

  const { email, password } = req.body;

  // Check if the required fields are present
  if (!email || !password) {
    return next(new BadRequestException('All fields are required', ErrorCode.MISSING_FIELDS));
  }
  // Find the admin by email
  const admin = await AdminModel.findOne({ where: { email } });

  // If the admin doesn't exist, throw an error
  if (!admin) {
    return next(new BadRequestException('Admin not found', ErrorCode.ADMIN_NOT_FOUND));
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, admin.password);

  // If the password is incorrect, throw an error
  if (!isPasswordValid) {
    return next(new BadRequestException('Incorrect password', ErrorCode.INCORRECT_PASSWORD));
  }

  // Generate JWT token with the admin's id, email, and role
  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    JWT_SECRET as string, // Make sure to define JWT_SECRET_KEY in your environment variables
    { expiresIn: '1h' } // Set token expiration time (e.g., 1 hour)
  );
    // Set the JWT token as a cookie
    res.cookie('token', token, {
      httpOnly: true, // Prevents access via JavaScript
      secure: process.env.NODE_ENV === 'production', // Secure cookie in production only
      sameSite: 'strict', // Corrected to lowercase "strict"
    });
    
  // Send the token in the response
  return res.status(200).json({ message: 'Login successful', token });
};
export const me = async (req: Request, res: Response) => {
  const reqWithAdmin = req as Request & { admin: AdminModel }; // Manually cast the request type
  const { name, email, phone, dob, gender } = reqWithAdmin.admin.dataValues; // Extract only required fields
  res.json({ name, email, phone, dob, gender }); // Return only desired fields
};

// adminController.ts
export const logout = async (req: Request, res: Response): Promise<any> => {
  // You can set the token expiration time to a past time, effectively invalidating it
  res.clearCookie('token');  // If the token is stored as a cookie

  return res.status(200).json({ message: 'Logged out successfully' });
};

export const aboutUs = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const validation = aboutSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }

  // Destructure the data from the validated body
  const { homeTitle, homeDescription, homeVideo, title, description, video } = req.body;


  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // Handle file uploads for images, using req.files (since you're uploading multiple fields)
  const homeImage = files['homeImage'] ? files['homeImage'][0].path : ''; // Check if 'homeImage' exists in req.files
  const image = files['image'] ? files['image'][0].path : ''; // Check if 'image' exists in req.files

  // Create a new "About" record in the database
  const newAbout = await AboutModel(req.app.get('sequelize')).create({
    homeTitle,
    homeDescription,
    homeImage,
    homeVideo,
    title,
    description,
    image,
    video,
  });

  return res.status(201).json({ message: 'About created successfully', admin: newAbout });
};



// Update API
export const updateAbout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters
  const validation = aboutSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }
  
  const aboutRecord = await AboutModel(req.app.get('sequelize')).findByPk(id);

  // If record not found, return error
  if (!aboutRecord) {
    return next(new BadRequestException('About record not found', ErrorCode.ABOUT_RECORD_NOT_FOUND));
  }

  // Destructure the data from the validated body
  const { homeTitle, homeDescription, homeVideo, title, description, video } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // Handle file uploads for images, using req.files (since you're uploading multiple fields)
  const homeImage = files['homeImage'] ? files['homeImage'][0].path : ''; // Check if 'homeImage' exists in req.files
  const image = files['image'] ? files['image'][0].path : ''; // Check if 'image' exists in req.files

  // Update the fields if new values are provided, otherwise keep the existing values
  aboutRecord.homeTitle = homeTitle || aboutRecord.homeTitle;
  aboutRecord.homeDescription = homeDescription || aboutRecord.homeDescription;
  aboutRecord.homeVideo = homeVideo || aboutRecord.homeVideo;
  aboutRecord.title = title || aboutRecord.title;
  aboutRecord.description = description || aboutRecord.description;
  aboutRecord.video = video || aboutRecord.video;
  aboutRecord.homeImage = homeImage || aboutRecord.homeImage;
  aboutRecord.image = image || aboutRecord.image;

  // Save the updated record
  const updatedAbout = await aboutRecord.save();

  return res.status(200).json({ message: 'About updated successfully', admin: updatedAbout });
};


// Delete API
export const deleteAbout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const deletedCount = await AboutModel(req.app.get('sequelize')).destroy({
    where: { id }, // Delete the record by ID
  });

  if (deletedCount === 0) {
    return next(new BadRequestException('About record not found', ErrorCode.ABOUT_RECORD_NOT_FOUND));
   
  }

  return res.status(200).json({ message: 'About deleted successfully' });
};
// View API (Fetch all About records)
export const viewAbout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const aboutRecords = await AboutModel(req.app.get('sequelize')).findAll();

  if (!aboutRecords || aboutRecords.length === 0) {
    return next(new BadRequestException('About record not found', ErrorCode.ABOUT_RECORD_NOT_FOUND));
  }

  return res.status(200).json({ message: 'Fetched About records successfully', data: aboutRecords });
};
// View by ID API (Fetch a specific About record by ID)
export const viewAboutById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const aboutRecord = await AboutModel(req.app.get('sequelize')).findByPk(id); // Find the record by primary key

  if (!aboutRecord) {
    return next(new BadRequestException(`About record with ID ${id} not found`, ErrorCode.ABOUT_RECORD_NOT_FOUND));
    
  }

  return res.status(200).json({ message: 'Fetched About record successfully', data: aboutRecord });
};



export const testimonial
= async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const validation = testimonialSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }

  // Destructure the data from the validated body
  const { title, designation, description} = req.body;


  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files['image'] ? files['image'][0].path : ''; // Check if 'image' exists in req.files

  // Create a new "About" record in the database
  const newTestimonial = await TestimonialModel(req.app.get('sequelize')).create({
    title,
    designation,
    description,
    image,
  });

  return res.status(201).json({ message: 'Testimonial created successfully', admin: newTestimonial });
};


// Update API
export const updateTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters
  const validation = testimonialSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }
  
  const testimonialRecord = await TestimonialModel(req.app.get('sequelize')).findByPk(id);

  // If record not found, return error
  if (!testimonialRecord) {
    return next(new BadRequestException('testimonial record not found', ErrorCode.TESTIMONIAL_RECORD_NOT_FOUND));
  }

  // Destructure the data from the validated body
  const { title, description,designation } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const image = files['image'] ? files['image'][0].path : ''; 
 
  testimonialRecord.title = title || testimonialRecord.title;
  testimonialRecord.description = description || testimonialRecord.description;
  testimonialRecord.designation = designation || testimonialRecord.designation;
  testimonialRecord.image = image || testimonialRecord.image;

  // Save the updated record
  const updatedTestimonial = await testimonialRecord.save();

  return res.status(200).json({ message: 'Testimonial updated successfully', admin: updatedTestimonial });
};



// Delete API
export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const deletedCount = await TestimonialModel(req.app.get('sequelize')).destroy({
    where: { id }, // Delete the record by ID
  });

  if (deletedCount === 0) {
    return next(new BadRequestException('Testimonial record not found', ErrorCode.TESTIMONIAL_RECORD_NOT_FOUND));
   
  }

  return res.status(200).json({ message: 'Testimonial deleted successfully' });
};
// View API (Fetch all About records)
export const viewTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const testimonialRecords = await TestimonialModel(req.app.get('sequelize')).findAll();

  if (!testimonialRecords || testimonialRecords.length === 0) {
    return next(new BadRequestException('Testimonial record not found', ErrorCode.TESTIMONIAL_RECORD_NOT_FOUND));
  }

  return res.status(200).json({ message: 'Fetched Testimonial records successfully', data: testimonialRecords });
};
// View by ID API (Fetch a specific About record by ID)
export const viewTestimonialById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const testimonialRecords = await TestimonialModel(req.app.get('sequelize')).findByPk(id); // Find the record by primary key

  if (!testimonialRecords) {
    return next(new BadRequestException(`Testimonial record with ID ${id} not found`, ErrorCode.TESTIMONIAL_RECORD_NOT_FOUND));
    
  }

  return res.status(200).json({ message: 'Fetched Testimonial record successfully', data: testimonialRecords });
};






export const team
= async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const validation = teamSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }

  // Destructure the data from the validated body
  const { name, designation,email,phone, description} = req.body;


  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files['image'] ? files['image'][0].path : ''; // Check if 'image' exists in req.files

  // Create a new "About" record in the database
  const newTeam = await TeamModel(req.app.get('sequelize')).create({
    name,
    designation,
    email,
    phone,
    description,
    image,
  });

  return res.status(201).json({ message: 'Team created successfully', admin: newTeam });
};


// Update API
export const updateTeam = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters
  const validation = teamSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }
  
  const teamRecord = await TeamModel(req.app.get('sequelize')).findByPk(id);

  // If record not found, return error
  if (!teamRecord) {
    return next(new BadRequestException('testimonial record not found', ErrorCode.TEAM_RECORD_NOT_FOUND));
  }

  // Destructure the data from the validated body
  const { name, description,designation,email,phone } = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const image = files['image'] ? files['image'][0].path : ''; 
 
  teamRecord.name = name || teamRecord.name;
  teamRecord.description = description || teamRecord.description;
  teamRecord.designation = designation || teamRecord.designation;
  teamRecord.image = image || teamRecord.image;
  teamRecord.email = email || teamRecord.email;
  teamRecord.phone = phone || teamRecord.phone;

  // Save the updated record
  const updatedTeam = await teamRecord.save();

  return res.status(200).json({ message: 'Testimonial updated successfully', admin: updatedTeam });
};



// Delete API
export const deleteTeam  = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const deletedCount = await TeamModel(req.app.get('sequelize')).destroy({
    where: { id }, // Delete the record by ID
  });

  if (deletedCount === 0) {
    return next(new BadRequestException('Team record not found', ErrorCode.TEAM_RECORD_NOT_FOUND));
   
  }

  return res.status(200).json({ message: 'Team deleted successfully' });
};
// View API (Fetch all About records)
export const viewTeam  = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const teamRecords = await TeamModel(req.app.get('sequelize')).findAll();

  if (!teamRecords || teamRecords.length === 0) {
    return next(new BadRequestException('Team record not found', ErrorCode.TEAM_RECORD_NOT_FOUND));
  }

  return res.status(200).json({ message: 'Fetched Team records successfully', data: teamRecords });
};
// View by ID API (Fetch a specific About record by ID)
export const viewTeamById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const teamRecords = await TeamModel(req.app.get('sequelize')).findByPk(id); // Find the record by primary key

  if (!teamRecords) {
    return next(new BadRequestException(`Team record with ID ${id} not found`, ErrorCode.TEAM_RECORD_NOT_FOUND));
    
  }

  return res.status(200).json({ message: 'Fetched Team record successfully', data: teamRecords });
};





export const services
= async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const validation = servicesSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }

  // Destructure the data from the validated body
  const { title, subTitle,mainTitle, description} = req.body;


  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const logo = files['logo'] ? files['logo'][0].path : ''; // Check if 'image' exists in req.files
  const image = files['image'] ? files['image'][0].path : ''; 
  // Create a new "About" record in the database
  const newServices = await ServicesModel(req.app.get('sequelize')).create({
    title,
    subTitle,
    mainTitle,
    logo,
    description,
    image,
  });

  return res.status(201).json({ message: 'Services created successfully', admin: newServices });
};


// Update API
export const updateServices = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters
  const validation = servicesSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }
  
  const servicesRecord = await ServicesModel(req.app.get('sequelize')).findByPk(id);

  // If record not found, return error
  if (!servicesRecord) {
    return next(new BadRequestException('testimonial record not found', ErrorCode.SERVICES_RECORD_NOT_FOUND));
  }

  // Destructure the data from the validated body
  const { title,subTitle,mainTitle, description} = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const logo = files['logo'] ? files['logo'][0].path : ''; // Check if 'image' exists in req.files
  const image = files['image'] ? files['image'][0].path : '';

  servicesRecord.title = title || servicesRecord.title;
  servicesRecord.subTitle = subTitle || servicesRecord.subTitle;
  servicesRecord.mainTitle = mainTitle || servicesRecord.mainTitle;
  servicesRecord.image = image || servicesRecord.image;
  servicesRecord.logo = logo || servicesRecord.logo;
  servicesRecord.description = description || servicesRecord.description;

  // Save the updated record
  const updatedServices = await servicesRecord.save();

  return res.status(200).json({ message: 'Services updated successfully', admin: updatedServices });
};



// Delete API
export const deleteServices  = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const deletedCount = await ServicesModel(req.app.get('sequelize')).destroy({
    where: { id }, // Delete the record by ID
  });

  if (deletedCount === 0) {
    return next(new BadRequestException('Services record not found', ErrorCode.SERVICES_RECORD_NOT_FOUND));
   
  }

  return res.status(200).json({ message: 'Services deleted successfully' });
};
// View API (Fetch all About records)
export const viewServices = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const servicesRecords = await ServicesModel(req.app.get('sequelize')).findAll();

  return res.status(200).json({ message: 'Fetched Services records successfully', data: servicesRecords });
};
// View by ID API (Fetch a specific About record by ID)
export const viewServicesById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const servicesRecords = await ServicesModel(req.app.get('sequelize')).findByPk(id); // Find the record by primary key

  if (!servicesRecords) {
    return next(new BadRequestException(`Services record with ID ${id} not found`, ErrorCode.SERVICES_RECORD_NOT_FOUND));
    
  }

  return res.status(200).json({ message: 'Fetched Services record successfully', data: servicesRecords });
};

// View API (Fetch all contacts records)
export const viewContacts = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const contactsRecords = await ContactsModel(req.app.get('sequelize')).findAll();

  if (!contactsRecords || contactsRecords.length === 0) {
    return next(new BadRequestException('Contacts record not found', ErrorCode.CONTACTS_RECORD_NOT_FOUND));
  }

  return res.status(200).json({ message: 'Fetched Contacts records successfully', data: contactsRecords });
};



export const category
= async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const validation = categorySchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }

  // Destructure the data from the validated body
  const { name} = req.body; 
  // Create a new "About" record in the database
  const newCategory = await ProjectCategoryModel.create({
    name
  });

  return res.status(201).json({ message: 'Category created successfully', admin: newCategory });
};

export const deleteCategory  = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const deletedCount = await ProjectCategoryModel.destroy({
    where: { id }, // Delete the record by ID
  });

  if (deletedCount === 0) {
    return next(new BadRequestException('Category record not found', ErrorCode.CATEGORY_RECORD_NOT_FOUND));
   
  }

  return res.status(200).json({ message: 'Category deleted successfully' });
};

// View API (Fetch all About records)
export const viewCategory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const categoryRecords = await ProjectCategoryModel.findAll();

  // if (!categoryRecords || categoryRecords.length === 0) {
  //   return next(new BadRequestException('Services record not found', ErrorCode.CATEGORY_RECORD_NOT_FOUND));
  // }

  return res.status(200).json({ message: 'Fetched category records successfully', data: categoryRecords });
};

// View by ID API (Fetch a specific About record by ID)
export const viewCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const categoryRecords = await ProjectCategoryModel.findByPk(id); // Find the record by primary key

  if (!categoryRecords) {
    return next(new BadRequestException(`category record with ID ${id} not found`, ErrorCode.CATEGORY_RECORD_NOT_FOUND));
    
  }

  return res.status(200).json({ message: 'Fetched category record successfully', data: categoryRecords });
};





export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  console.log("oakau")


    console.log(req.files)
  
    // Validate the incoming request body
    const validation = projectSchema.safeParse(req.body);
    if (!validation.success) {
      return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
    }

    

    const { name, categoryId } = req.body;

    // Ensure `req.files` is either an object or array, and handle accordingly
    const files = req.files;

    if (!files) {
      return next(new Error('No files uploaded'));
    }

    let themeImage = '';
    let additionalFiles: Express.Multer.File[] = [];

    // Check if `files` is an array (for multiple files in one field)
    if (Array.isArray(files)) {
      themeImage = files.length > 0 ? files[0].path : '';  // First image as theme image
      additionalFiles = files.slice(1);  // Rest as additional images
    } else {
      // Check if it's an object (for multiple fields with different file names)
      const themeImageFile = files['themeImage'] as Express.Multer.File[] | undefined;
      const additionalFilesField = files['images'] as Express.Multer.File[] | undefined;

      themeImage = themeImageFile && themeImageFile.length > 0 ? themeImageFile[0].path : '';  // Single theme image
      additionalFiles = additionalFilesField || [];  // Multiple additional images (if any)
    }

    // Create the new project
    const project = await Projects.create({
      name,
      themeImage,
      categoryId,
    });

    // If there are additional images, bulk insert them
    if (additionalFiles.length > 0) {
      const imageRecords = additionalFiles.map((file) => ({
        imageName: file.filename,  // Assuming multer provides the filename
        projectId: project.id,     // Associate images with the project
      }));

      await ProjectImage.bulkCreate(imageRecords);
    }

    // Respond with the created project and a success message
    res.status(201).json({
      message: 'Project created successfully',
      project,
      images: additionalFiles.map((file) => file.filename),
    });
};

export const viewProjects = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // Fetch all projects with associated project images and categories
    const projects = await Projects.findAll({
      include: [
        {
          model: ProjectCategory,
          as: 'category', // Alias for the related category
          attributes: ['name'], // Only include the name from ProjectCategory
        },
        {
          model: ProjectImage,
          as: 'project', // Alias for the related category
          attributes: ['imageName'], // Only include the name from ProjectCategory
        },
        
        
      ],
    });

    // Send the response
    res.status(200).json({
      message: 'Projects retrieved successfully',
      data: projects,  // Use 'data' key to encapsulate the projects data
    });
  } catch (error) {
    // Handle any errors that occur during the query
    console.error(error);
    res.status(500).json({
      message: 'Failed to retrieve projects',
    });
  }
};


export const weAchieved
= async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const validation = weAchievedSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }

  // Destructure the data from the validated body
  const { title, subTitle,date} = req.body;


  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files['image'] ? files['image'][0].path : ''; 
  // Create a new "About" record in the database
  const newWeAchieved = await WeAchieved.create({
    title,
    subTitle,
    date,
    image,
  });

  return res.status(201).json({ message: 'We Achieved created successfully', admin: newWeAchieved });
};

export const viewWeAchieved = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const WeAchievedRecords = await WeAchieved.findAll();
  return res.status(200).json({ message: 'Fetched We Achieved records successfully', data: WeAchievedRecords });
};



// Update API
export const updateWeAchieved = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters
  const validation = weAchievedSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }
  
  const  WeAchievedRecord = await WeAchieved.findByPk(id);

  // If record not found, return error
  if (!WeAchievedRecord) {
    return next(new BadRequestException('testimonial record not found', ErrorCode.WEACHIEVED_RECORD_NOT_FOUND));
  }

  // Destructure the data from the validated body
  const { title,subTitle,date} = req.body;

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files['image'] ? files['image'][0].path : '';

  WeAchievedRecord.title = title || WeAchievedRecord.title;
  WeAchievedRecord.subTitle = subTitle || WeAchievedRecord.subTitle;
  WeAchievedRecord.date = date || WeAchievedRecord.date;
  WeAchievedRecord.image = image || WeAchievedRecord.image;

  // Save the updated record
  const updatedWeAchievedRecord = await WeAchievedRecord.save();

  return res.status(200).json({ message: 'We Achieved Record updated successfully', admin: updatedWeAchievedRecord });
};



// Delete API
export const deleteWeAchieved = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const deletedCount = await WeAchieved.destroy({
    where: { id }, // Delete the record by ID
  });

  if (deletedCount === 0) {
    return next(new BadRequestException('We Achieved Record record not found', ErrorCode.WEACHIEVED_RECORD_NOT_FOUND));
   
  }

  return res.status(200).json({ message: 'We Achieved deleted successfully' });
};

// View by ID API (Fetch a specific About record by ID)
export const viewWeAchievedById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const WeAchievedRecords = await WeAchieved.findByPk(id); // Find the record by primary key

  if (!WeAchievedRecords) {
    return next(new BadRequestException(`We Achieved Records record with ID ${id} not found`, ErrorCode.WEACHIEVED_RECORD_NOT_FOUND));
    
  }

  return res.status(200).json({ message: 'Fetched We Achieved Records record successfully', data: WeAchievedRecords });
};




export const createClientHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const image = files['image'] ? files['image'][0].path : ''; 
    
    // Create a new client record in the database using the Client model
    const newClient = await Client.create({
      image,
    });

    return res.status(201).json({ message: 'Client created successfully', client: newClient });
  
};

export const viewClient = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const viewClientRecords = await Client.findAll();
  return res.status(200).json({ message: 'Fetched  Client records successfully', data: viewClientRecords });
};
// Delete API
export const deleteClient = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const deletedCount = await Client.destroy({
    where: { id }, // Delete the record by ID
  });

  if (deletedCount === 0) {
    return next(new BadRequestException('Client Record record not found', ErrorCode.CLIENT_RECORD_NOT_FOUND));
   
  }

  return res.status(200).json({ message: 'Client deleted successfully' });
};








export const createBestProject = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files['image'] ? files['image'][0].path : ''; 
  
  // Create a new client record in the database using the Client model
  const newClient = await BestProject.create({
    image,
  });

  return res.status(201).json({ message: 'Client created successfully', client: newClient });

};

export const viewBestProject = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
const viewClientRecords = await BestProject.findAll();
return res.status(200).json({ message: 'Fetched  Client records successfully', data: viewClientRecords });
};
// Delete API
export const deleteBestProject = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
const { id } = req.params; // Get the ID of the record from the URL parameters

const deletedCount = await BestProject.destroy({
  where: { id }, // Delete the record by ID
});

if (deletedCount === 0) {
  return next(new BadRequestException('BestProject record not found', ErrorCode.CLIENT_RECORD_NOT_FOUND));
 
}

return res.status(200).json({ message: 'BestProject deleted successfully' });
};





export const createStory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  const {link}= req.body
  
  // Create a new client record in the database using the Client model
  const newLink = await Story.create({
    link,
  });

  return res.status(201).json({ message: 'Link created successfully', client: newLink });

};

export const viewStory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
const viewStoryRecords = await Story.findAll();
return res.status(200).json({ message: 'Fetched  Story records successfully', data: viewStoryRecords });
};
// Delete API
export const deleteStory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
const { id } = req.params; // Get the ID of the record from the URL parameters

const deletedCount = await Story.destroy({
  where: { id }, // Delete the record by ID
});

if (deletedCount === 0) {
  return next(new BadRequestException('Story record not found', ErrorCode.CLIENT_RECORD_NOT_FOUND));
 
}

return res.status(200).json({ message: 'Story deleted successfully' });
};

export const createBlog = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const validation = blogSchema.safeParse(req.body);
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }

 const{title,description} = req.body
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const image = files['image'] ? files['image'][0].path : ''; 
  
  // Create a new client record in the database using the Client model
  const newBlog = await Blog.create({
    image,
    title,
    description
  });

  return res.status(201).json({ message: 'Blog created successfully', client: newBlog });

};

export const viewBlog = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const viewBlogRecords = await Blog.findAll();
  return res.status(200).json({ message: 'Fetched  Blog records successfully', data: viewBlogRecords });
  };
  
  export const deleteBlog = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params; // Get the ID of the record from the URL parameters
    
    const deletedCount = await Blog.destroy({
      where: { id }, // Delete the record by ID
    });
    if (deletedCount === 0) {
      return next(new BadRequestException('Blog record not found', ErrorCode.CLIENT_RECORD_NOT_FOUND));
     
    }
    return res.status(200).json({ message: 'Blog deleted successfully' });
};


export const createJob = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  console.log(req.body)
  const validation = jobSchema.safeParse(req.body);
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }

 const{deadline,position,location,phone,salary,vacancies,keyResponsibilities,skillsExperience,description} = req.body

  
  // Create a new client record in the database using the Client model
  const newJob = await Job.create({
    deadline,
    position,
    location,
    phone,
    salary,
    vacancies,
    keyResponsibilities,
    skillsExperience,
    description,
  })

  return res.status(201).json({ message: 'Job created successfully', client: newJob });

};



