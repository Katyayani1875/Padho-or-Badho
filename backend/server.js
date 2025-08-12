import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import { notFound, errorHandler } from './src/middlewares/error.middleware.js';
import { configureCloudinary } from './src/config/cloudinary.js';
import authRoutes from './src/api/v1/routes/auth.routes.js';
import userRoutes from './src/api/v1/routes/user.routes.js';
import contentRoutes from './src/api/v1/routes/content.routes.js';
import progressRoutes from './src/api/v1/routes/progress.routes.js';
import aiRoutes from './src/api/v1/routes/ai.routes.js'; 
import gamificationRoutes from './src/api/v1/routes/gamification.routes.js';

dotenv.config();
connectDB();
configureCloudinary();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('Padho and Badho API is running...'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/progress', progressRoutes);
app.use('/api/v1/ai', aiRoutes); 
app.use('/api/v1/gamification', gamificationRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in development mode on port ${PORT}`));