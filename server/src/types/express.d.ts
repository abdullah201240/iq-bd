// src/types/express.d.ts
import { AdminModel } from "../models/admin"; // Adjust this import path based on your project structure

declare global {
  namespace Express {
    interface Request {
      admin?: AdminModel | null; // Optional `admin` property
    }
  }
}
