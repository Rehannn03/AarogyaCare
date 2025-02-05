import cloudinary from 'cloudinary'
import fs from 'fs'          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (filepath) => {
 
  
    if (!filepath) {
      throw new Error("File path is undefined");
    }
  
    try {
      const response = await cloudinary.uploader.upload(filepath, {
        resource_type: "auto",
      });
  
      fs.unlinkSync(filepath); // Clean up temp file
      
      return response;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath); // Safely delete the file even on error
      }
      throw error;
    }
  };
  
  export default uploadOnCloudinary;
  