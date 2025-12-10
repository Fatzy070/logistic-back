import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connectDB to ${db.connection.name} successfully 🎉`);
    } catch (error) {
        console.error('Cannot connect to the database:', error);
      process.exit(1);  
    }
}

export default connectDB;