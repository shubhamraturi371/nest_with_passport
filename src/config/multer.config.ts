import { diskStorage } from 'multer';
import * as path from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      // Check if the file type is allowed
      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const fileExt = path.extname(file.originalname).toLowerCase();

      if (allowedExtensions.includes(fileExt)) {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
      } else {
        // Reject files with disallowed extensions
        callback(null, null);
      }
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, callback) => {
    // Check file type using MIME type
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true); // Accept the file
    } else {
      callback(null, false); // Reject the file
    }
  },
};
