import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import shipmentRoutes from './routes/shipmentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js'


const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: "*" }
});


app.use((req, res, next) => {
  req.io = io;
  next();
});


io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

 
  socket.on('joinRoom', ({ userId }) => {
    socket.join(userId);
    // console.log(`User ${userId} joined their room`);
    // console.log('Rooms for this socket:', Array.from(socket.rooms));
  });
})


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
app.use('/api', notificationRoutes)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));