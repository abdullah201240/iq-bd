import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import db from './config/sequelize'; // Adjust path
import dotenv from 'dotenv';
import { errorMiddleware } from './middleware/error'; // Adjust path as needed
dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '8080', 10); // Ensure port is a number

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Use environment variable or default to localhost
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}))
// JSON and URL-encoded form data parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

// Error handling middleware should be the last middleware
app.use(errorMiddleware);


db.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch(err => console.error('Database connection failed:', err));


// Start the server and connect to the database
app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
});
