import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"; // Import dotenv

dotenv.config(); // Load environment variables

const app = express();

// CORS configuration using FRONTEND_URL from .env
const allowedOrigin = process.env.FRONTEND_URL;
app.use(cors({
    origin: allowedOrigin,
    credentials: true, // Allow cookies and other credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import reviewRouter from './routes/review.routes.js';

// Routes declarations
app.use('/api/v1/users', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/review', reviewRouter);

export { app };
