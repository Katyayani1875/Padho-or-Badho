import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'padho-badho',
    allowed_formats: ['jpeg', 'png', 'jpg', 'svg', 'mp4', 'mkv'],
  },
});

export const upload = multer({ storage: storage });