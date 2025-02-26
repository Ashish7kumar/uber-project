import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.mongoURI as string);
        console.log("Connection successful");
    } catch (error) {
        console.error("Cannot connect to MongoDB:", error);
    }
};

export default connectToDB;
