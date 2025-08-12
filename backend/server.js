import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import { notFound, errorHandler } from './src/middlewares/error.middleware.js';
import { configureCloudinary } from './src/config/cloudinary.js';

// --- Route Imports ---
import authRoutes from './src/api/v1/routes/auth.routes.js';
import userRoutes from './src/api/v1/routes/user.routes.js';
import contentRoutes from './src/api/v1/routes/content.routes.js';
import progressRoutes from './src/api/v1/routes/progress.routes.js';
import aiRoutes from './src/api/v1/routes/ai.routes.js'; // Ensure this path is correct

// --- Initializations ---
dotenv.config();
connectDB();
configureCloudinary();

const app = express();

// --- Middlewares ---
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Route Registration ---
app.get('/', (req, res) => res.send('Padho and Badho API is running...'));

// The base path is defined here
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('/api/v1/progress', progressRoutes);
app.use('/api/v1/ai', aiRoutes); // This tells Express to use ai.routes.js for any path starting with /api/v1/ai

// --- Error Handling Middlewares (must be last) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in development mode on port ${PORT}`));