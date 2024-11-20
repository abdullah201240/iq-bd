import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import jwt from "jsonwebtoken";
import AdminModel from "../models/admin"; // Adjust the path based on your project structure
import { ErrorCode } from "../exceptions/root"; // Adjust path if necessary

const JWT_SECRET = process.env.JWT_SECRET_KEY || "12sawegg23grr434"; // Fallback to a hardcoded secret if not in env

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming token is in format "Bearer <token>"

    if (!token) {
        // Provide the third argument for the errorCode
        return next(new UnauthorizedException('Unauthorized', null, ErrorCode.UNAUTHORIZED));
    }

    try {
        // Verify the token and decode payload
        const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

        if (!payload || !payload.id) {
            // Provide the third argument for the errorCode
            return next(new UnauthorizedException('Unauthorized', null, ErrorCode.UNAUTHORIZED));
        }

        // Find the admin using the decoded ID
        const admin = await AdminModel(req.app.get("sequelize")).findOne({ where: { id: payload.id } });

        if (!admin) {
            // Provide the third argument for the errorCode
            return next(new UnauthorizedException('Admin not found or invalid token', null, ErrorCode.UNAUTHORIZED));
        }
        
        // Attach the admin object to req.admin
        req.admin = admin;

        // Call the next middleware
        next();
    } catch (error: any) {
        // Provide the third argument for the errorCode
        return next(new UnauthorizedException('Unauthorized', null, ErrorCode.UNAUTHORIZED));
    }
};

export default authMiddleware;

