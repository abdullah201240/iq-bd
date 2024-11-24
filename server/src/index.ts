import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import db from './config/sequelize'; // Adjust path
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet'; // HTTP header security
import xssClean from 'xss-clean'; // Prevents XSS attacks
import hpp from 'hpp'; // Prevents HTTP Parameter Pollution
import { errorMiddleware } from './middleware/error'; // Adjust path as needed
import cookieParser from 'cookie-parser'; // Import cookie-parser

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '8080', 10); // Ensure port is a number

// Use morgan to log HTTP requests
app.use(morgan('combined')); // You can change the format as per your needs

// Helmet for setting secure HTTP headers
app.use(helmet());

// Enable CORS with specific settings
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Use environment variable or default to localhost
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));



// Protect against XSS attacks
app.use(xssClean());

// Protect against HTTP Parameter Pollution (duplicate query params)
app.use(hpp());
// Cookie Parser Middleware
app.use(cookieParser());

// Sanitize user input (optional, you can use libraries like express-validator for more control)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the routes
app.use('/api', routes);

// Error handling middleware should be the last middleware
app.use(errorMiddleware);

// Serve static files (uploads)
app.use('/upload', express.static('upload'));

// Connect to database
db.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch(err => console.error('Database connection failed:', err));

// Start the server and connect to the database
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
