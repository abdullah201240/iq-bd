import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import AboutModel from '../models/about';
import TestimonialModel from '../models/testimonial';
import TeamModel from '../models/team';

// View by ID API (Fetch a specific About record by ID)
export const viewAboutById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const aboutRecord = await AboutModel(req.app.get('sequelize')).findByPk(id); // Find the record by primary key

  if (!aboutRecord) {
    return next(new BadRequestException(`About record with ID ${id} not found`, ErrorCode.ABOUT_RECORD_NOT_FOUND));
    
  }
  const { homeTitle, homeDescription, homeImage, homeVideo, title,description,image,video } = aboutRecord 

  res.json({ homeTitle, homeDescription, homeImage, homeVideo, title,description,image,video });
 
};

export const viewTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const testimonialRecords = await TestimonialModel(req.app.get('sequelize')).findAll();

  if (!testimonialRecords || testimonialRecords.length === 0) {
    return next(new BadRequestException('Testimonial record not found', ErrorCode.TESTIMONIAL_RECORD_NOT_FOUND));
  }
    // Map through the records and extract the necessary fields (if needed)
    const testimonials = testimonialRecords.map((record) => ({
      title: record.title,
      description: record.description,
      image: record.image,
      designation: record.designation,
    }));

    // Send the response with the testimonials
    res.json(testimonials);
};

export const viewTeam = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const teamRecords = await TeamModel(req.app.get('sequelize')).findAll();

  if (!teamRecords || teamRecords.length === 0) {
    return next(new BadRequestException('Testimonial record not found', ErrorCode.TESTIMONIAL_RECORD_NOT_FOUND));
  }
    // Map through the records and extract the necessary fields (if needed)
    const teams = teamRecords.map((record) => ({
      name: record.name,
      email: record.email,
      phone: record.phone,
      description: record.description,
      image: record.image,
      designation: record.designation,
    }));

    // Send the response with the teams
    res.json(teams);
};