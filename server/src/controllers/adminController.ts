import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import AdminModel from '../models/admin'; // Adjust the import path as needed
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import { loginSchema, signupSchema } from '../schema/admin';
import { UnprocessableEntity } from '../exceptions/validation';
import jwt from 'jsonwebtoken';


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
  const result = loginSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!result.success) {
    return next(new UnprocessableEntity(result.error.errors, 'Validation Error'));
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
    process.env.JWT_SECRET_KEY as string, // Make sure to define JWT_SECRET_KEY in your environment variables
    { expiresIn: '1h' } // Set token expiration time (e.g., 1 hour)
  );

  // Send the token in the response
  return res.status(200).json({ message: 'Login successful', token });
};
export const me = async (req: Request, res: Response) => {
  // res.json(req.admin);  // Now `req.admin` will be recognized by TypeScript
};
