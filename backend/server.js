const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const { notFound, errorHandler } = require('./src/middlewares/error.middleware');

// Route imports
const authRoutes = require('./src/api/v1/routes/auth.routes');
const userRoutes = require('./src/api/v1/routes/user.routes');
const contentRoutes = require('./src/api/v1/routes/content.routes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Body parser for JSON

// API Routes
app.get('/', (req, res) => res.send('Padho and Badho API is running...'));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/content', contentRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));