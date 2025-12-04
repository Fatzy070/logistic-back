import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import shipmentRoutes from './routes/shipmentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin:'*' ,
    method :[ 'PUT' , 'GET' , 'POST' , 'DELETE' , 'OPTIONS' ] ,
    credentials: true 
}))
connectDB();
app.use('/api' , userRoutes)
app.use('/api', shipmentRoutes)

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})