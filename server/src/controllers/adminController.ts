import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import AdminModel from '../models/admin'; // Adjust the import path as needed
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { aboutSchema, loginSchema, signupSchema } from '../schema/admin';
import { UnprocessableEntity } from '../exceptions/validation';
import jwt from 'jsonwebtoken';
import { Admin } from '../models';
import AboutModel from '../models/about';
const JWT_SECRET = process.env.JWT_SECRET_KEY || "12sawegg23grr434"; // Fallback to a hardcoded secret if not in env


export const createAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any | Response> => {

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
