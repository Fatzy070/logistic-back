import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(`mongodb://localhost:27017/Logistic`)
        console.log(`connectDB to ${db.connection.name} successfully 🎉`);
    } catch (error) {
        console.error('Cannot connect to the database:', error);
      process.exit(1);  
    }
}

export default connectDB;