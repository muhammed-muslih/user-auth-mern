import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config({path:'./backend.env'})
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
  });

  export default cloudinary;