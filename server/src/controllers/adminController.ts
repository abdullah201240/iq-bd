import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import AdminModel from '../models/admin'; // Adjust the import path as needed
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { aboutSchema, loginSchema, servicesSchema, signupSchema, teamSchema, testimonialSchema } from '../schema/admin';
import { UnprocessableEntity } from '../exceptions/validation';
import jwt from 'jsonwebtoken';
import { Admin } from '../models';
import AboutModel from '../models/about';
import TestimonialModel from '../models/testimonial';
import TeamModel from '../models/team';
import ServicesModel from '../models/services';
import ContactsModel from '../models/contact';
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
  const existingAdmin = await AdminModel(req.app.get('sequelize')).findOne({ where: { email } });
  if (existingAdmin) {
    return next(new BadRequestException('Admin already exists', ErrorCode.ADMIN_ALREADY_EXISTS));
  }
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new admin in the database
  const newAdmin = await AdminModel(req.app.get('sequelize')).create({
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

  const deletedCount = await AdminModel(req.app.get('sequelize')).destroy({
    where: { id }, // Delete the record by ID
  });

  if (deletedCount === 0) {
    return next(new BadRequestException('Admin record not found', ErrorCode.ADMIN_RECORD_NOT_FOUND));
   
  }

  return res.status(200).json({ message: 'Admin deleted successfully' });
};
// View API (Fetch all Admin records)
export const viewAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const adminRecords = await AdminModel(req.app.get('sequelize')).findAll();

  if (!adminRecords || adminRecords.length === 0) {
    return next(new BadRequestException('Admin record not found', ErrorCode.ADMIN_RECORD_NOT_FOUND));
  }

  return res.status(200).json({ message: 'Fetched adminRecords records successfully', data: adminRecords });
};
// View by ID API (Fetch a specific Admin record by ID)
export const viewAdminById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const adminRecords = await AdminModel(req.app.get('sequelize')).findByPk(id); // Find the record by primary key

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
  const admin = await AdminModel(req.app.get('sequelize')).findOne({ where: { email } });

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
  const reqWithAdmin = req as Request & { admin: Admin }; // Manually cast the request type
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

  if (!servicesRecords || servicesRecords.length === 0) {
    return next(new BadRequestException('Services record not found', ErrorCode.SERVICES_RECORD_NOT_FOUND));
  }

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