import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const uri = process.env.ATLAS_URI;

mongoose.set('strictQuery', false);
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established succesfully');
});

app.use(express.json());
app.use(cors());
app.use('/admin', adminRoutes);
app.use(userRoutes);

app.listen(process.env.SERVER_PORT || 5000);
