import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import sharp from 'sharp';

const uploadDir = 'upload/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req: Request, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/avif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// This is your multer setup for single file uploads
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 4, // 4 MB file size limit
    },
});

// Image compression function with dynamic quality to target 20-25KB
const compressImage = async (filePath: string) => {
    const compressedPath = filePath.replace(path.extname(filePath), '.webp');
    const targetSize = 25 * 1024; // 25 KB target
    const maxWidth = 800; // Limit width to optimize processing time

    // Set initial quality to 70% to minimize compression iterations
    let quality = 30;

    // Read image metadata to determine resizing
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize only if the width exceeds maxWidth (to reduce processing time)
    if (metadata.width && metadata.width > maxWidth) {
        image.resize(maxWidth);
    }

    let compressedBuffer = await image.webp({ quality }).toBuffer();

    // If the compressed size is still above the target, reduce quality in steps
    while (compressedBuffer.length > targetSize && quality > 50) {
        quality -= 10;
        compressedBuffer = await image.webp({ quality }).toBuffer();
    }

    // Save the compressed image to disk
    await sharp(compressedBuffer).toFile(compressedPath);

    // Return the path to the compressed WebP image
    return compressedPath;
};

// Middleware to compress the image after upload
const compressImageMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        const filePath = path.join(uploadDir, req.file.filename);
        try {
            const compressedPath = await compressImage(filePath);
            fs.unlinkSync(filePath); // Remove the original uncompressed file
            req.file.path = compressedPath; // Update file path to the compressed image
            req.file.filename = path.basename(compressedPath);
        } catch (error) {
            console.error('Image compression failed:', error);
            return res.status(500).send({ error: 'Image compression failed' });
        }
    }
    next();
};

export { upload, compressImageMiddleware };
