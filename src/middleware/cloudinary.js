import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

const cloudinaryInstance = cloudinary.v2;
cloudinaryInstance.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinaryInstance,
    allowedFormats: ['jpg', 'png', 'jpeg'],
    params: (req, file) => {
        return {
            folder: 'juno-project',
            public_id: file.fieldname + '-' + Date.now()
        };
    },
});

// Cấu hình multer với các trường
const uploadCloud = multer({ storage }).fields([
    { name: 'image', maxCount: 1 }, // Ảnh chính
    { name: 'productImages', maxCount: 10 }, // Hình ảnh bổ sung
    { name: 'variations[0][image]', maxCount: 1 },
    { name: 'variations[1][image]', maxCount: 1 },
    { name: 'variations[2][image]', maxCount: 1 },
    { name: 'variations[3][image]', maxCount: 1 },
    { name: 'variations[4][image]', maxCount: 1 },
    { name: 'variations[5][image]', maxCount: 1 },
    { name: 'variations[6][image]', maxCount: 1 },
    { name: 'variations[7][image]', maxCount: 1 },
    { name: 'variations[8][image]', maxCount: 1 },
    { name: 'variations[9][image]', maxCount: 1 },
]);


export default uploadCloud;