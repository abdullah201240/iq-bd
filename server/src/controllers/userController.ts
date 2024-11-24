import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import AboutModel from '../models/about';

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
