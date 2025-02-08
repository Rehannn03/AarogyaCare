import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import path from "path";

export const uploadToPinata = async (file) => {
    try {
        if (!file || !file.path) {
            throw new Error("Invalid file provided. Ensure multer is saving files to disk.");
        }


        const fileStream = fs.createReadStream(file.path);


        const formData = new FormData();
        formData.append("file", fileStream, {
            filename: file.originalname,
            contentType: file.mimetype,
        });

        const pinataApiKey = process.env.PINATA_API_KEY;
        const pinataSecretApiKey = process.env.PINATA_SECRET_KEY;

        if (!pinataApiKey || !pinataSecretApiKey) {
            throw new Error("Pinata API keys are missing. Check environment variables.");
        }

        // Upload file to Pinata
        const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            headers: {
                ...formData.getHeaders(),
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey,
            },
        });


    
        fs.unlinkSync(file.path);

        return response.data.IpfsHash;
    } catch (error) {
        throw new Error(`Error uploading file to Pinata: ${error.message}`);
    }
};