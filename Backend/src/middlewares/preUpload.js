import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'fivestack_files',
        allowed_formats:['jpg','jpeg','png','webp']
    }
})

export const upload = multer({storage});