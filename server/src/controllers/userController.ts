import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';
import AboutModel from '../models/about';
import TestimonialModel from '../models/testimonial';
import TeamModel from '../models/team';
import ServicesModel from '../models/services';
import { title } from 'process';
import { contactsSchema } from '../schema/admin';
import { UnprocessableEntity } from '../exceptions/validation';
import ContactsModel from '../models/contact';
import ProjectImage from '../models/projectImage';
import WeAchieved from '../models/weAchieved';
import Client from '../models/client';
import BestProject from '../models/bestProject';
import Story from '../models/story';
import Blog from '../models/blog';
import Job from '../models/job';
import { applySchema } from '../schema/user';
import ApplyList from '../models/applyList';
import { Op } from 'sequelize';

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

export const viewServices = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const servicesRecords = await ServicesModel(req.app.get('sequelize')).findAll();

 
    // Map through the records and extract the necessary fields (if needed)
    const teams = servicesRecords.map((record) => ({
      id: record.id,
      title: record.title,
      subTitle: record.subTitle,
      mainTitle: record.mainTitle,
      description: record.description,
      image: record.image,
      logo: record.logo,
    }));

    // Send the response with the teams
    res.json(teams);
};

export const viewServicesByid = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { id } = req.params; // Get the ID of the record from the URL parameters

  const servicesRecord = await ServicesModel(req.app.get('sequelize')).findByPk(id); // Find the record by primary key

  if (!servicesRecord) {
    return next(new BadRequestException(`Services record with ID ${id} not found`, ErrorCode.SERVICES_RECORD_NOT_FOUND));
    
  }

    // Map through the records and extract the necessary fields (if needed)
    const team = {
      title: servicesRecord.title,
      subTitle: servicesRecord.subTitle,
      mainTitle: servicesRecord.mainTitle,
      description: servicesRecord.description,
      image: servicesRecord.image,
      logo: servicesRecord.logo,
    };
    // Send the response with the teams
    res.json(team);
};

export const contacts
= async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const validation = contactsSchema.safeParse(req.body);

  // If validation fails, throw a custom error
  if (!validation.success) {
    return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
  }

  // Destructure the data from the validated body
  const { name, email,phone,subject, description} = req.body;

  const newContacts= await ContactsModel(req.app.get('sequelize')).create({
    name,
    email,
    phone,
    subject,
    description,
  });

  return res.status(201).json({ message: 'Contacts created successfully', user: newContacts });
};

export const viewAllProjectImage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const projectImages = await ProjectImage.findAll({
      attributes: ['id', 'imageName'] // Only include the 'id' and 'imageName' fields
    });
    
    return res.status(200).json({
      message: 'Project Images records fetched successfully',
      data: projectImages
    });
  } catch (error) {
    next(error); // Ensure to handle any errors that occur during the DB query
  }
};


export const viewWeAchieved = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const WeAchievedRecords = await WeAchieved.findAll({

    attributes: ['id', 'title','subTitle','date','image']
  });

  

  return res.status(200).json({ message: 'Fetched We Achieved records successfully', data: WeAchievedRecords });
};

export const viewClient = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const viewClientRecords = await Client.findAll({

    attributes: ['id','image']
  });
  return res.status(200).json({ message: 'Fetched  Client records successfully', data: viewClientRecords });
};

export const viewBestProject = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const viewClientRecords = await BestProject.findAll({

    attributes: ['id','image']
  });
  return res.status(200).json({ message: 'Fetched  Best Project records successfully', data: viewClientRecords });
};


export const viewStory = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const viewStoryRecords = await Story.findAll({
    attributes: ['id','link']
  });
  return res.status(200).json({ message: 'Fetched  Story records successfully', data: viewStoryRecords });
  };
  
  export const viewBlog = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const viewBlogRecords = await Blog.findAll({
      attributes: ['id','title','description','image']
    });
    return res.status(200).json({ message: 'Fetched  Blog records successfully', data: viewBlogRecords });
    };

    export const viewBlogByid = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const { id } = req.params; // Get the ID of the record from the URL parameters
    
      const blogRecord = await Blog.findByPk(id); // Find the record by primary key
    
      if (!blogRecord) {
        return next(new BadRequestException(`blog Record record with ID ${id} not found`, ErrorCode.SERVICES_RECORD_NOT_FOUND));
        
      }
    
        // Map through the records and extract the necessary fields (if needed)
        const blog = {
          title: blogRecord.title,
         
          description: blogRecord.description,
          image: blogRecord.image,
        };
        // Send the response with the teams
        res.json(blog);
    };
    
    export const viewJob = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const viewJobRecords = await Job.findAll({
        order: [['createdAt', 'DESC']], // Assuming 'createdAt' is the field for creation date
      });  return res.status(200).json({ message: 'Fetched  Job records successfully', data: viewJobRecords });
      };

      export const viewJobByid = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const { id } = req.params;
        const viewJobRecord = await Job.findByPk(id);
        if (!viewJobRecord) {
          return next(new BadRequestException(`blog Record record with ID ${id} not found`, ErrorCode.JOB_RECORD_NOT_FOUND));
        }
        return res.status(200).json({
          message: "Fetched job record successfully",
          data: viewJobRecord,
        });
        };

        export const applyJob = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
          const validation = applySchema.safeParse(req.body);
          if (!validation.success) {
            return next(new UnprocessableEntity(validation.error.errors, 'Validation Error'));
          }
        
         const{name,email,phone,address,education,experience,salary,choosePosition,portfolio,jobId} = req.body
         if (!req.file) {
          return res.status(400).json({ message: 'File is required' });
        }
        
        const existingApplication = await ApplyList.findOne({
          where: {
            jobId,
            [Op.or]: [
              { email },
              { phone },
            ],
          },
        });
        if (existingApplication) {
          return res.status(409).json({ message: 'You have already applied for this job using the same email or phone.' });
        }
          
          // Create a new client record in the database using the Client model
          const newApply = await ApplyList.create({
            resume: req.file.filename,
            name,email,phone,address,education,experience,salary,choosePosition,portfolio,jobId,status: 'Submitted'
            
          });
        
          return res.status(201).json({ message: 'Apply created successfully', client: newApply });
        
        }; 